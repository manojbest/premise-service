
const Promise = require('bluebird');
const PostCodeService = require('../../lib/services/postcodeservice');

class StreetController {

    constructor(context) {
        context = context || {};

        this._postCodeService = context.postCodeService || new PostCodeService();
    }

    handle(requestContext) {
        return this._postCodeService.findStreetDetails(requestContext)
            .then((requestContext) => {
                requestContext.response.body = requestContext.data.streetDetails;
                return requestContext;
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }
}

module.exports = StreetController;