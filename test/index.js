const mongoose = require('mongoose');
const http = require('http');
const app = require('../app');
const config = require('../config/config');
const logger = require('../config/logger');

function getMongooseOptions() {
  let options = { ...config.mongoose.options };
  return options;
}

const testServer = http.createServer(app);

const exitHandler = () => {
  if (testServer) {
    testServer.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

mongoose.connect(config.mongoose.url, { ...getMongooseOptions() }).then(() => {
  try {
    testServer.listen(process.env.TEST_PORT, () => {});
  } catch (err) {
    exitHandler();
  }
});

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

const Mocha = require('mocha');
const mocha = new Mocha();
 
mocha.addFile('./test/todo.test.js');

mocha.run(() => {
  exitHandler();
});
