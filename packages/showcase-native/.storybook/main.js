const path = require('path');

module.exports = {
  stories: [
    "../src/**/stories.mdx",
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/components/**/stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-react-native-web"
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  core: {
    builder: {
      name: 'webpack5',
      options: {}
    }
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.mdx$/,
      use: ['@mdx-js/loader'],
    });
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
    };
    return config;
  }
};