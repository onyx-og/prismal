const path = require('path');

module.exports = function(context, options) {
  return {
    name: 'webpack-aliases',
    configureWebpack() {
      return {
        resolve: {
          alias: {
            'components': path.resolve(__dirname, '../../react/src/components'),
            'styles': path.resolve(__dirname, '../../react/src/styles'),
            'hooks': path.resolve(__dirname, '../../react/src/hooks'),
            'utils': path.resolve(__dirname, '../../react/src/utils'),
          },
        },
      };
    },
  };
};