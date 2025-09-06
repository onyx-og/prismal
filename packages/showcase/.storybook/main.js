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
    "@storybook/addon-google-analytics",
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
            additionalData: `@use '@prismal/react/lib/styles/theme.scss';`,
          },
        },
      ],
    },{
      test: /\.mdx$/,
      use: ['@mdx-js/loader'],
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      '@prismal/react': path.resolve(__dirname, "../../react/"),
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