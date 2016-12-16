
const bunyan = require('bunyan');

let logger = null;

class Logger {

    static getLogger(config, componentName) {
        if (!logger) {
            const logLevel = (config.logLevel) ? config.logLevel : 'info';
            const logDir = (config.logDir) ? config.logDir : './';

            let logStreams = [];
            if (config.logToFile)
            {
                logStreams.push(
                    {
                        level: logLevel,
                        type: 'rotating-file',
                        path: logDir + componentName + '.log',
                        period: '1d',
                        count: 3
                    });
            }
            if (config.logToScreen)
            {
                logStreams.push(
                    {
                        level: logLevel,
                        stream: process.stderr
                    });
            }

            logger = bunyan.createLogger({
                name: componentName,
                level: logLevel,
                streams: logStreams
            });
        }
        return logger;
    }

}

module.exports = Logger;