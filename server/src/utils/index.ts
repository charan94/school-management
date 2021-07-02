/**
 * @file index.ts
 * @author K Sai Charan
*/

import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import { LOGGER } from '../config/logger';

export enum Gender {
    MALE,
    FEMALE,
    OTHERS
}

export const ERROR_MESSAGES = {
    UNAUTHORIZED: 'User is not authorized to access this resource',
    INVALID_TOKEN: 'Invalid Authentication token',
    REQUIRED: (key: string) => `${key} is required`,
    LOGIN_FAILED: 'Unauthorized. Please check your username and password',
    INVALID: 'Invalid Request'
}

/**
 * Verifies jwt token with options
 * @param token 
 * @param secret
 * @param options 
 * @returns 
 */
export function verifyAuthToken(token: string, secret: string, options?: any) {
    if (!options) {
        options = { ignoreExpiration: false }
    }
    const isTokenValid = jwt.verify(token, secret, options);
    return isTokenValid;
}

/**
 * Converts date to ms
 * @param date 
 * @returns ms
 */
export function getMilliSeconds(date: Date) {
    return moment(date).valueOf()
}

/**
 * Verifies jwt token with options
 * @param data 
 * @returns signed token
 */
export function signJWT(data: any, secret: string, expiresIn: string | number): string {
    LOGGER.info('secret ', secret);
    LOGGER.info('expiresIn ', expiresIn);
    const token = jwt.sign(data, secret, { expiresIn });
    return token;

}