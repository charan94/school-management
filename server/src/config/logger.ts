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
