const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  "stories": [
    "../src/components/**/stories.mdx",
    "../src/components/**/stories.@(js|jsx|ts|tsx)",
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)"
  ],

  staticDirs: ['../static'],

  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    '@storybook/addon-a11y',
    '@storybook/addon-storysource',
    "@storybook/addon-webpack5-compiler-swc",
    "@chromatic-com/storybook"
  ],

  "framework": {
    name: "@storybook/react-webpack5",
    options: {}
  },

  // babel: {
  //   "presets": ["@babel/preset-typescript", "@babel/preset-react"]
  // },

  "core": {
    "disableTelemetry": true
  },

  webpackFinal: async (config, { configType }) => {
    // config.plugins.push(new MiniCssExtractPlugin())
    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      use: [
        "style-loader","css-loader",
        {
          loader: 'sass-loader',
          options: {
            // implementation: require('sass')
            additionalData: `@use 'styles/theme.scss';`,
          },
        },
      ],
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      'styles': path.resolve(__dirname, "../../../src/styles"),
      'components': path.resolve(__dirname, "../../../src/components"),
      'utils': path.resolve(__dirname, "../../../src/utils"),
      'hooks': path.resolve(__dirname, "../../../src/hooks"),
    }

    // Return the altered config
    return config;
  },

  docs: {
    autodocs: true
  },

  typescript: {
    reactDocgen: "react-docgen-typescript"
  }
}