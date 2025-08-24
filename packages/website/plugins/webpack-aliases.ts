const path = require('path');

module.exports = function(context, options) {
  return {
    name: 'webpack-aliases',
    configureWebpack() {
      return {
        resolve: {
          alias: {
            'components': path.resolve(__dirname, '../../../src/components'),
            'styles': path.resolve(__dirname, '../../../src/styles'),
            'hooks': path.resolve(__dirname, '../../../src/hooks'),
            'utils': path.resolve(__dirname, '../../../src/utils'),
          },
        },
      };
    },
  };
};