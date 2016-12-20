
const Promise = require('bluebird');
const PostCodeService = require('../../lib/services/postcodeservice');

class AddressController {

    constructor(context) {
        context = context || {};

        this._postCodeService = context.postCodeService || new PostCodeService();
    }

    handle(requestContext) {
        return this._postCodeService.findAddressDetails(requestContext)
            .then((requestContext) => {
                requestContext.response.body = requestContext.data.addressDetails;
                return requestContext;
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }
}

module.exports = AddressController;