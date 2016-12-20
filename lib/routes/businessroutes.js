
const Router = require('../../lib/utils/router');

module.exports = [

    {
        method: 'GET',
        path:'/api/v1/uk/postcoder/address/{addresscode}',
        handler: Router.createHandler('lib/controllers/addresscontroller')
    },
    {
        method: 'GET',
        path:'/api/v1/uk/postcoder/street/{addresscode}',
        handler: Router.createHandler('lib/controllers/streetcontroller')
    },
    {
        method: 'GET',
        path:'/api/v1/uk/postcoder/validate/{addresscode}',
        handler: Router.createHandler('lib/controllers/validateaddresscontroller')
    }

];