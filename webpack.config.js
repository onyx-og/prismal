const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// TODO: export only useful!!
const styleUtils = {
    entry: {
        animations: "./src/styles/animations.scss",
        global: "./src/styles/global.scss",
        icons: "./src/styles/icons.scss",
        layers: "./src/styles/layers.scss",
        layout: "./src/styles/layout.scss",
        lists: "./src/styles/lists.scss",
        typography: "./src/styles/typography.scss",
        utils: "/src/styles/utils.scss",
        vars: "./src/styles/vars.scss"
    },
    output: {
        path: path.resolve(__dirname, 'lib/styles'),
    },
    module: {
        rules: [
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: "asset",
            },
            {
                test: /\.s[ac]ss$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
        ],
    },
    resolve: {
        extensions: [
            '.scss', '.eot', '.svg', '.ttf', '.woff'
        ],
    }
}

const components = {
    entry: {
        button: ['./src/components/Button/index.scss', './src/styles/theme.scss'],
        alert: ['./src/components/Alert/index.scss', './src/styles/theme.scss'],
        list: ['./src/components/List/index.scss', './src/styles/theme.scss'],
        sidebar: ['./src/components/Sidebar/index.scss', './src/styles/theme.scss'],
        slider: ['./src/components/Slider/index.scss', './src/styles/theme.scss'],
        modal: ['./src/components/Modal/index.scss', './src/styles/theme.scss'],
        searchbar: ['./src/components/SearchBar/index.scss', './src/styles/theme.scss'],
        select: ['./src/components/Form/Select/index.scss', './src/styles/theme.scss'],
        textInput: ['./src/components/Form/TextInput/index.scss', './src/styles/theme.scss'],
        actionBar: ['./src/components/ActionBar/index.scss', './src/styles/theme.scss'],
        form: ['./src/components/Form/index.scss', './src/styles/theme.scss'],
        global: ['./src/styles/global.scss', './src/styles/theme.scss'],
    },
    output: {
        path: path.resolve(__dirname, 'lib/styles'),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader,'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader', options: {modules: false}},
                    'sass-loader'
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin()
    ],
    resolve: {
        extensions: [
            '.scss'
        ],
    }
}

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
        reactDOM: 'react-dom'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader,'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader', options: {modules: false}},
                    'sass-loader'
                ],
            },
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "index.css",
        }),
    ],
    resolve: {
        extensions: [
            '.js',
            '.jsx',
            '.tsx',
            '.ts',
            '.scss'
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
    return [components, config, styleUtils];
}
