import type { StorybookConfig } from '@storybook/react-webpack5';
import {
  getCodeEditorStaticDirs,
  getExtraStaticDir,
} from 'storybook-addon-code-editor/getStaticDirs';
import { dirname } from "path"

import { fileURLToPath } from "url"

/**
* This function is used to resolve the absolute path of a package.
* It is needed in projects that use Yarn PnP or are set up within a monorepo.
*/
function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}
const config: StorybookConfig = {
  staticDirs: [
    ...getCodeEditorStaticDirs(__filename),
    // files will be available at: /monaco-editor/esm/*
    getExtraStaticDir('monaco-editor/esm'),
  ],
  "stories": [
      "../src/components/**/stories.mdx",
      "../src/components/**/stories.@(js|jsx|ts|tsx)",
      "../src/components/**/*.stories.@(js|jsx|ts|tsx)"
    ],
  "addons": [
    getAbsolutePath("@storybook/addon-webpack5-compiler-swc"),
    'storybook-addon-code-editor',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    // name: "@storybook/react-vite",
    options: {
      // ...
    },
  },
 webpackFinal: async (config, { configType }) => {
  
     // config.plugins.push(new MiniCssExtractPlugin())
     config['module'] = {...config.module, rules: [ ...config.module?.rules!, {
        test: /\.s[ac]ss$/i,
        use: [
         "style-loader","css-loader",
         {
           loader: 'sass-loader',
           options: {
             // implementation: require('sass')
             additionalData: `@use '@prismal/react/lib/styles/theme.scss';`,
           },
         },
       ],
     },{
       test: /\.mdx$/,
       use: ['@mdx-js/loader'],
     }]}
     /*config.module!.rules!.push({
       test: /\.s[ac]ss$/i,
       use: [
         "style-loader","css-loader",
         {
           loader: 'sass-loader',
           options: {
             // implementation: require('sass')
             additionalData: `@use '@prismal/react/lib/styles/theme.scss';`,
           },
         },
       ],
     },{
       test: /\.mdx$/,
       use: ['@mdx-js/loader'],
     });
     */
 
     config.resolve!.alias = {
       ...config.resolve!.alias,
       '@prismal/react': getAbsolutePath("../../react/"),
       react: getAbsolutePath("react"),
       "react-dom": getAbsolutePath("react-dom"),
     }
 
     // Return the altered config
     return config;
   },
};
export default config;