'use strict';

module.exports = {
    env: 'development',
    host: 'localhost',
    port: 3000,
    secret: 'wanted_secret',
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