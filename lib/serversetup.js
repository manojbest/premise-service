
const Hapi = require('hapi');
const Path = require('path');
const fs = require('fs');
const config = require('config');

const Logger = require('./utils/logger');

class ServerSetup {

    constructor(appName, optConfig) {
        this._appName = appName;
        this._startTime = new Date();
        this._config = optConfig || config;
        this._logger = Logger.getLogger(this._config, appName);
    }

    appStartUp() {
        this._server = new Hapi.Server({
            connections: {
                routes: {
                    files: {
                        relativeTo: Path.join(__dirname, 'public/app')
                    }
                }
            }
        });

        this._server.connection({ host: this._config.httpHost, port: this._config.httpPort });
        this._addServerRoutes();
        this._addServerPlugins();
        return this._server;
    }

    start(callback) {
        this._server.start(callback);
    }

    appShutDown(event, error) {
        this._server.stop({ timeout: 1 * 1000 }, () => {
            process.exit(0);
        });
    }

    getAppName() {
        return this._appName;
    }

    getStartTime() {
        return this._startTime;
    }

    _addServerRoutes() {
        const that = this;
        fs.readdirSync('./lib/routes').forEach((curFile) => {
            if (curFile.substr(-3) === '.js') {
                that._server.route(require('./routes/' + curFile));
            }
        });
        this._logger.info('All server routes are added ...');
    }

    _addServerPlugins() {
        const options = {
            info: {
                'title': 'UK Postcode API Documentation',
                'version': require('../package').version
            }
        };

        this._server.register([
            require('inert'),
            require('vision'),
            {
                'register': require('hapi-swagger'),
                'options': options
            }], (err) => {
                if (err) {
                    this._logger.error('Error occured when adding server plugins ...'+ err);
                }
            });
    }

}

module.exports = ServerSetup;