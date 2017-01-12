
const Router = require('../../lib/utils/router');
const Joi = require('joi');

module.exports = [

    {
        method: 'GET',
        path:'/api/v1/uk/postcoder/address/{addresscode}',
        config: {
            handler: Router.createHandler('lib/controllers/addresscontroller'),
            description: 'Get UK address details',
            notes: 'Searches for UK address details',
            tags: ['api'],
            validate: {
                params: {
                    addresscode : Joi.string()
                        .required()
                        .description('address code')
                }
            }
        }
    },
    {
        method: 'GET',
        path:'/api/v1/uk/postcoder/street/{addresscode}',
        config: {
            handler: Router.createHandler('lib/controllers/streetcontroller'),
            description: 'Get UK street details',
            notes: 'Searches for UK street details',
            tags: ['api'],
            validate: {
                params: {
                    addresscode : Joi.string()
                        .required()
                        .description('address code')
                }
            }
        }
    },
    {
        method: 'GET',
        path:'/api/v1/uk/postcoder/validate/{addresscode}',
        config: {
            handler: Router.createHandler('lib/controllers/validateaddresscontroller'),
            description: 'Validate UK address',
            notes: 'Searches for UK address',
            tags: ['api'],
            validate: {
                params: {
                    addresscode : Joi.string()
                        .required()
                        .description('address code')
                }
            }
        }
    }

];