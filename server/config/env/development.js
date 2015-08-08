'use strict';

module.exports = {
    env: 'development',
    host: 'localhost',
    port: 3000,
    secret: 'wanted_secret',
    imgPrefix: 'http://localhost:3000',
    mongo: {
        uri: 'mongodb://localhost/',
        db: 'wanted',
        username: '',
        password: ''
    },
    log4js: {
        "appenders": [
            {
                "type":"console"
            }
        ]
    },
    logLevel: 'debug'
};