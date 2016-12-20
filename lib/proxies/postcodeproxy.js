
const Promise = require('bluebird');
const request = Promise.promisify(require('request'));
const config = require('config');

class PostCodeProxy {

    _callRemoteService(options) {
        return request(options)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    retrieveAddress(options) {
        let remoteUri = config.addressLookupUri;
        let addressFragment = options.requestParam['address']
        remoteUri = remoteUri.replace('{address-fragment}', addressFragment);
        let requestOptions = {
            method: 'GET',
            uri: remoteUri
        };

        return this._callRemoteService(requestOptions);
    }

    retrieveStreet(options) {
        let remoteUri = config.streetLookupUri;
        let addressFragment = options.requestParam['address']
        remoteUri = remoteUri.replace('{address-fragment}', addressFragment);
        let requestOptions = {
            method: 'GET',
            uri: remoteUri
        };

        return this._callRemoteService(requestOptions);
    }

    validatePostcode(options) {
        let remoteUri = config.postcodeValidationLookupUri;
        let addressFragment = options.requestParam['address']
        remoteUri = remoteUri.replace('{address-fragment}', addressFragment);
        let requestOptions = {
            method: 'GET',
            uri: remoteUri
        };

        return this._callRemoteService(requestOptions);
    }

}

module.exports = PostCodeProxy;