require('dotenv').config();

const configureServer = require('./config/server');

// Use bluebird over native promises.
global.Promise=require('bluebird');

const server = configureServer();

const PORT = process.env.PORT || 8080;
server.listen(PORT, function() {
  const displayMessage = `
  ############################
  #   Mail 4 Good started    #
  ############################
  # Port: ${PORT}
  ############################
  `;

  console.log(displayMessage);
});


process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

process.on('uncaughtException', (err) => {
  console.log('uncaughtException', err);
});

