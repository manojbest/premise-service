

module.exports = {

    httpHost: 'localhost',
    httpPort: 8000,
    numWorkers: 2,
    maxDeadWorkerSize: 10,
    maxSockets: 100,

    logLevel: 'debug',
    logToScreen: true,
    logToFile: true,
    logDir: '../log/',
    logAllowWebAccess: true,


    addressLookupUri:'http://ws.postcoder.com/pcw/PCW45-12345-12345-1234X/address/uk/{address-fragment}?format=json',
    streetLookupUri:'http://ws.postcoder.com/pcw/PCW45-12345-12345-1234X/street/uk/{address-fragment}?format=json',
    postcodeValidationLookupUri:'http://ws.postcoder.com/pcw/PCW45-12345-12345-1234X/codepoint/validatepostcode/{address-fragment}?format=json',

};