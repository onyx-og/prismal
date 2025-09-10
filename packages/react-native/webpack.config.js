const path = require('path');

const config = {
    entry: './src/index.ts',
    experiments: {
        outputModule: true,
    },
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'index.js',
        globalObject: 'this',
        library: {
            type: 'module',
        },
        libraryTarget: 'commonjs'
    },
    externals: {
        react: 'react',
        reactDOM: 'react-dom',
        "react-native": 'react-native'
    },
    mode: "development",
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                options: {
                    configFile: 'build.tsconfig.json'
                },
                exclude: ['/node_modules/'],
            },
        ]
    },
    plugins: [],
    resolve: {
        extensions: [
            '.js',
            '.jsx',
            '.tsx',
            '.ts',
        ],
        alias: {
            'styles': path.resolve(__dirname, 'src/styles'),
            'components': path.resolve(__dirname, 'src/components'),
            'hooks': path.resolve(__dirname, 'src/hooks'),
            'utils': path.resolve(__dirname, 'src/utils'),
        }
    },
};

module.exports = () => {
    return [config];
}
