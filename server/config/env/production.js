'use strict';

module.exports = {
    env: 'production',
    host: 'godong9.com',
    port: 9000,
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
                "type": "dateFile",
                "absolute": true,
                "filename": "/data/log/wanted/server.log",
                "pattern":"-yyyy-MM-dd",
                "alwaysIncludePattern": true
            }
        ]
    },
    logLevel: 'info'
};