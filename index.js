const fs = require('fs');
const mongoose = require('mongoose');
const http = require('http');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');

function getMongooseOptions() {
  let options = { ...config.mongoose.options };
  return options;
}

const server = http.createServer(app);
mongoose.connect(config.mongoose.url, { ...getMongooseOptions() }).then(() => {
  logger.info('Connected to MongoDB');
  server.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}\n\n`);
    if (config.cron_enabled) {
      runCron(); 
    }
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
