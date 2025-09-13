const path = require('path');

module.exports = {
  stories: [
    "../components/**/*.stories.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx)",
    "../components/**/stories.@(js|jsx|ts|tsx)"
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
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
    };
    return config;
  }
};