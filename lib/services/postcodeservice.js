
const PostCodeProxy = require('../../lib/proxies/postcodeproxy')
const RedisRepository = require('../../lib/repositories/redisrepository');
const md5Base64 = require('md5-base64');
const Promise = require('bluebird');
const Logger = require('../../lib/utils/logger');

const logger = Logger.getLogger();

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

        return this._redisRepository.getData(key)
            .then((response) => {
                if (response) {
                    logger.debug('Taking details from cache for the key : ' + key);
                    requestContext.data.addressDetails = JSON.parse(response);
                    return requestContext;
                } else {
                    return this._postCodeProxy.retrieveAddress(options)
                        .then((results) => {
                            logger.debug('Taking details from address details service');
                            return this._redisRepository.setData(key,results.body)
                                .then((res) => {
                                    requestContext.data.addressDetails = JSON.parse(results.body);
                                    return requestContext;
                                });
                        });
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    findStreetDetails(requestContext) {
        let options = {};
        options.requestParam = {};
        options.requestParam['address'] = requestContext.request['addresscode'];

        let key = md5Base64('ukstreet' + options.requestParam['address']);

        return this._redisRepository.getData(key)
            .then((response) => {
                if (response) {
                    logger.debug('Taking street details from cache for the key : ' + key);
                    requestContext.data.streetDetails = JSON.parse(response);
                    return requestContext;
                } else {
                    return this._postCodeProxy.retrieveStreet(options)
                        .then((results) => {
                            logger.debug('Taking details from street details service' );
                            return this._redisRepository.setData(key,results.body)
                                .then((res) => {
                                    requestContext.data.streetDetails = JSON.parse(results.body);
                                    return requestContext;
                                });
                        });
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    validatePostcodeDetails(requestContext) {
        let options = {};
        options.requestParam = {};
        options.requestParam['address'] = requestContext.request['addresscode'];

        let key = md5Base64('ukvalidate' + options.requestParam['address']);

        return this._redisRepository.getData(key)
            .then((response) => {
                if (response) {
                    logger.debug('Taking address validation details from cache for the key : ' + key);
                    requestContext.data.validationDetails = JSON.parse(response);
                    return requestContext;
                } else {
                    return this._postCodeProxy.validatePostcode(options)
                        .then((results) => {
                            logger.debug('Taking details from street details service' );
                            let str = JSON.stringify({isValid: results.body});
                            return this._redisRepository.setData(key,str)
                                .then((res) => {
                                    requestContext.data.validationDetails = JSON.parse(str);
                                    return requestContext;
                                });
                        });
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

}

module.exports = PostCodeService;