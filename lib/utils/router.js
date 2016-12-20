
class Router {

    static createHandler(controllerPath) {
        return function(request, reply) {
            let Controller;
            let controller;

            try {
                Controller = require('../../' + controllerPath);
                controller = new Controller();
                let requestCnxt = {};
                requestCnxt.response = {};
                requestCnxt.data = {};
                requestCnxt.response.body = {};
                requestCnxt.response.headers = {};

                requestCnxt.request = {};

                for (let prop in request.params) {
                    if (request.params.hasOwnProperty(prop)) {
                        requestCnxt.request[prop] = request.params[prop];
                    }
                }

                controller.handle(requestCnxt)
                    .then((requestContext) => {

                        let code = requestContext.response.status || 200;
                        let body = requestContext.response.body;

                        let response;
                        response = reply(body).hold();

                        let headers = requestContext.response.headers;
                        for (let header in headers) {
                            if (headers.hasOwnProperty(header)) {
                                response.header(header, headers[header]);
                            }
                        }

                        response.code(code);
                        response.send();
                    })
                    .catch((error) => {
                        Router._handleError(error, reply, request);
                    });
            } catch (e) {
                Router._handleError(e, reply, request);
            }
        };
    }

    static _handleError(error, reply, request) {
        let code = error.status || 500;
        let body = {
            error: {
                message : error.message,
                stack: error.stack
            }
        };
        reply(body).code(code);
    }
}

module.exports = Router;