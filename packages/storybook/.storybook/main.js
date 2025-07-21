const path = require("path");

module.exports = {
  "stories": [
    // "../../../src/components/**/stories.mdx",
    // "../../../src/components/**/stories.@(js|jsx|ts|tsx)",
    "../src/components/**/stories.mdx",
    "../src/components/**/stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    '@storybook/addon-a11y',
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5",
    "disableTelemetry": true,
  },
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      use: [
        "style-loader","css-loader", 
        {
          loader: 'sass-loader',
        }
      ]
    });

    config.resolve.alias = { ...config.resolve.alias,
      'styles': path.resolve(__dirname, "../../../src/styles"),
      'components': path.resolve(__dirname, "../../../src/components"),
      'utils': path.resolve(__dirname, "../../../src/utils"),
      'hooks': path.resolve(__dirname, "../../../src/hooks"),
    }

    // Return the altered config
    return config;
  },

}