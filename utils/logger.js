var winston = require('winston');

module.exports = function () {
    var logger = winston.createLogger({
        format: winston.format.combine(
            winston.format.splat(),
            winston.format.simple()
        ),
        transports: [new winston.transports.Console()]
    });

    return logger;
};
