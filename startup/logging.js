const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
    winston.handleExceptions(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'uncaughtExceptions.log' })
    );

    process.on('unhadledRejection', (ex) => {
        throw ex;
    });

    winston.add(winston.transports.File, { filename: 'logfile.log' });
    winston.add(winston.transports.MongoDB, {
        db: 'mongodb+srv://bookly-user:mypassword@clusterbookly.rturt.mongodb.net/library?retryWrites=true&w=majority',
        level: 'info'
    });
}