
const PostCodeProxy = require('../../lib/proxies/postcodeproxy')
const RedisRepository = require('../../lib/repositories/redisrepository');
const md5Base64 = require('md5-base64');
const Promise = require('bluebird');


class PostCodeService {

    constructor(context) {
        context = context || {};

        this._postCodeProxy = context.postCodeService || new PostCodeProxy();
        this._redisRepository = context.redisRepository || new RedisRepository();
    }

    findAddressDetails(requestContext) {
        let options = {};
        options.requestParam = {};
        options.requestParam['address'] = requestContext.request['addresscode'];
        let key = md5Base64('ukaddress' + options.requestParam['address']);

        return this._postCodeProxy.retrieveAddress(options)
            .then((results) => {
                this._redisRepository.setData(key,results.body);
                requestContext.data.addressDetails = JSON.parse(results.body);
                return requestContext;
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    findStreetDetails(requestContext) {
        let options = {};
        options.requestParam = {};
        options.requestParam['address'] = requestContext.request['addresscode'];
        return this._postCodeProxy.retrieveStreet(options)
            .then((results) => {
                requestContext.data.streetDetails = JSON.parse(results.body);
                return requestContext;
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    validatePostcodeDetails(requestContext) {
        let options = {};
        options.requestParam = {};
        options.requestParam['address'] = requestContext.request['addresscode'];
        return this._postCodeProxy.validatePostcode(options)
            .then((results) => {
                requestContext.data.validationDetails = {isValid: results.body};
                return requestContext;
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

}

module.exports = PostCodeService;