import winston from 'winston';

/**
 * We are exposing method which will produce new `winston` logger instance
 * and return method which will use exactly this instance.
 * This way we can have as much loggers as we want, ie. one per app instance.
 */
export default function logger() {

    /**
     * This configuration should go straight from `config`
     * @TODO: get logger configuration from config, ie. set only slack & file transport for production
     */
    const logger = new (winston.Logger)({
        level: 'debug',
        transports: [
            new (winston.transports.Console)()
        ]
    });

    /**
     *
     * @return {Winston} Winston logger instance
     */
    return function() {
    	return logger.log.apply(logger, arguments);
    };

}
