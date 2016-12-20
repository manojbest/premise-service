
const Promise = require('bluebird');
const PostCodeService = require('../../lib/services/postcodeservice');

class CoordinateController {

    constructor(context) {
        context = context || {};

        this._postCodeService = context.postCodeService || new PostCodeService();
    }

    handle(requestContext) {
        return this._postCodeService.validatePostcodeDetails(requestContext)
            .then((requestContext) => {
                requestContext.response.body = requestContext.data.validationDetails;
                return requestContext;
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }
}

module.exports = CoordinateController;