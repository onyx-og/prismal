const ts = require('typescript');
const fs = require('fs');
const path = require('path');

// Setup paths
const reactDir = path.resolve(__dirname, '../../react');
const tsconfigPath = path.resolve(reactDir, 'tsconfig.json');

console.log('Generating component properties maps from TypeScript definitions...');

try {
  // Read tsconfig.json
  const parsed = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
  if (parsed.error) {
    console.error('Error reading tsconfig.json:', parsed.error.messageText);
    process.exit(1);
  }

  const parsedCmd = ts.parseJsonConfigFileContent(parsed.config, ts.sys, reactDir);
  if (parsedCmd.errors && parsedCmd.errors.length > 0) {
    console.warn('Config parsing warnings:', parsedCmd.errors.map(e => e.messageText).join('\n'));
  }

  // Create compiler host and program
  const program = ts.createProgram(parsedCmd.fileNames, parsedCmd.options);
  const checker = program.getTypeChecker();

  const propsMaps = {};

  for (const sourceFile of program.getSourceFiles()) {
    // Only parse source files in packages/react/src
    const relativePath = path.relative(reactDir, sourceFile.fileName);
    if (sourceFile.isDeclarationFile || relativePath.startsWith('..') || !relativePath.startsWith('src')) {
      continue;
    }

    const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
    if (!moduleSymbol) continue;

    const exports = checker.getExportsOfModule(moduleSymbol);
    for (const exp of exports) {
      // Look for exported interface/type ending in "Props"
      if (exp.name.endsWith('Props') && exp.name !== 'ComponentProps') {
        const componentName = exp.name.substring(0, exp.name.length - 5);

        // Get the declared type
        const type = checker.getDeclaredTypeOfSymbol(exp);
        const properties = type.getProperties();

        const propsList = [];
        for (const propSymbol of properties) {
          const propName = propSymbol.getName();

          // Skip data-attributes, style, classNames, etc. to keep UI simple
          if (propName.startsWith('data-') || propName === 'style' || propName === 'className' || propName === 'key' || propName === 'ref') {
            continue;
          }

          const propType = checker.getTypeOfSymbolAtLocation(propSymbol, sourceFile.endOfFileToken);
          const typeString = checker.typeToString(propType);

          // Check for union of literals (choices)
          let options = undefined;
          if (propType.isUnion() && !typeString.includes('boolean')) {
            const choices = [];
            let isLiteralUnion = true;
            for (const t of propType.types) {
              if (t.isStringLiteral()) {
                choices.push(t.value);
              } else if (t.isNumberLiteral()) {
                choices.push(t.value);
              } else if (t.flags & ts.TypeFlags.Undefined || t.flags & ts.TypeFlags.Null || checker.typeToString(t) === 'undefined') {
                continue;
              } else {
                isLiteralUnion = false;
                break;
              }
            }
            if (isLiteralUnion && choices.length > 0) {
              options = choices;
            }
          }

          const description = ts.displayPartsToString(propSymbol.getDocumentationComment(checker)).trim();
          const isOptional = !!(propSymbol.flags & ts.SymbolFlags.Optional);

          // Map TS type string to a standard controlType
          let controlType = 'string';
          if (typeString === 'boolean' || typeString.includes('boolean')) {
            controlType = 'boolean';
          } else if (typeString === 'number' || typeString.includes('Elevation')) {
            controlType = 'number';
          } else if (options) {
            controlType = 'select';
          } else if (propName.toLowerCase().includes('color') || propName === 'accent' || propName === 'accentLight' || propName === 'accentDark') {
            controlType = 'color';
          }

          // Exclude function/callback props from controls as they cannot be configured in JSON inputs
          if (typeString.includes('=>') || typeString.includes('function') || propName.startsWith('on')) {
            continue;
          }

          propsList.push({
            name: propName,
            type: typeString,
            controlType,
            isOptional,
            options,
            description
          });
        }

        propsMaps[componentName] = {
          displayName: componentName,
          props: propsList
        };
      }
    }
  }

  // Write the result alongside the Sandbox component itself
  const outputPath = path.resolve(reactDir, 'src/components/Sandbox/props-map.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(propsMaps, null, 2));
  console.log(`Successfully generated property mappings for ${Object.keys(propsMaps).length} components at:\n  ${outputPath}`);
} catch (e) {
  console.error('Critical failure running TS compiler generator:', e);
  process.exit(1);
}
