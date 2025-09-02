const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// TODO: export only useful!!
const styleUtils = {
    entry: {
        index: "./src/styles/index.scss",
        globals: "./src/styles/globals.scss",
        vars: "./src/styles/vars.scss",
        utils: "/src/styles/utils.scss",
        animations: "./src/styles/animations.scss",
        icons: "./src/styles/icons.scss",
        layers: "./src/styles/layers.scss",
        layout: "./src/styles/layout.scss",
        lists: "./src/styles/lists.scss",
        typography: "./src/styles/typography.scss"
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
        globals: ['./src/styles/globals.scss', './src/styles/theme.scss'],
        container: ['./src/components/Container/index.scss', './src/styles/theme.scss'],
        text: ['./src/components/Text/index.scss', './src/styles/theme.scss'],
        button: ['./src/components/Button/index.scss', './src/styles/theme.scss'],
        buttonGroup: ['./src/components/ButtonGroup/index.scss', './src/styles/theme.scss'],
        icons: ['./src/styles/icons.scss'],
        card: ['./src/components/Card/index.scss', './src/styles/theme.scss'],
        alert: ['./src/components/Alert/index.scss', './src/styles/theme.scss'],
        list: ['./src/components/List/index.scss', './src/styles/theme.scss'],
        sidebar: ['./src/components/Sidebar/index.scss', './src/styles/theme.scss'],
        slider: ['./src/components/Slider/index.scss', './src/styles/theme.scss'],
        modal: ['./src/components/Modal/index.scss', './src/styles/theme.scss'],
        searchbar: ['./src/components/SearchBar/index.scss', './src/styles/theme.scss'],
        select: ['./src/components/Form/Select/index.scss', './src/styles/theme.scss'],
        numberInput: ['./src/components/Form/NumberInput/index.scss', './src/styles/theme.scss'],
        textInput: ['./src/components/Form/TextInput/index.scss', './src/styles/theme.scss'],
        toggle: ['./src/components/Form/Toggle/index.scss', './src/styles/theme.scss'],
        form: ['./src/components/Form/index.scss', './src/styles/theme.scss'],
        dropdown: ['./src/components/Dropdown/index.scss', './src/styles/theme.scss'],
        tooltip: ['./src/components/Tooltip/index.scss', './src/styles/theme.scss'],
        header: ['./src/components/Header/index.scss', './src/styles/theme.scss'],
        actionBar: ['./src/components/ActionBar/index.scss', './src/styles/theme.scss'],
        accordion: ['./src/components/Accordion/index.scss', './src/styles/theme.scss'],
        lazyItem: ['./src/components/LazyItem/index.scss'],
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
                options: {
                    configFile: 'build.tsconfig.json'
                },
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
