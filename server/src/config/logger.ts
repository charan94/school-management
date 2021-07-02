/**
 * @file logger.ts
 * @author Sai Charan K
 */

import * as winston from 'winston';

const levels = {
    error: 0,
    warn: 1,
    info: 2,
};

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'cyan',
};

/**
 * Used for logging to the console
 * @note We can also use Mail transport to send email when there is an error
 */
export const LOGGER = winston.createLogger({
    levels,
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            level: 'info',
        }),
        new winston.transports.Console({
            level: 'warn',
        })
    ]
});

winston.addColors(colors);
