
const ServerSetup = require('./lib/serversetup');
const Logger = require('./lib/utils/logger');
const serverSetup = new ServerSetup("PremiseApp");

const server = serverSetup.appStartUp();
const logger = Logger.getLogger();

serverSetup.start((err) => {
    if (err) {
        logger.error('Error occured when starting server : ' + err);
        throw err;
    }

    logger.info(serverSetup.getAppName() + ' :: Server started at : ' + server.info.uri + ' :: Timestamp :: ' + serverSetup.getStartTime());
});

process.on('SIGINT', () => {
    serverSetup.appShutDown('SIGINT');
});