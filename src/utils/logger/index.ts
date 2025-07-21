import logger from 'pino';

const browserLogger = logger({
    browser: {
        serialize: true,
      write: {
        info: function (o) {
          console.log(o)
        },
        error: function (o) {
          console.log(o)
        }
      }
    }
});

export default browserLogger;