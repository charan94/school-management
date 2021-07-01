import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

export enum Gender {
    MALE,
    FEMALE,
    OTHERS
}

export const ERROR_MESSAGES = {
    UNAUTHORIZED: 'User is not authorized to access this resource',
    INVALID_TOKEN: 'Invalid Authentication token',
    REQUIRED: (key: string) => `${key} is required`,
    LOGIN_FAILED: 'Unauthorized. Please check your username and password'
}

/**
 * Verifies jwt token with options
 * @param token 
 * @param options 
 * @returns 
 */
export function verifyAuthToken(token: string, options?: any) {
    const secret = `${process.env.JWT_KEY}`;
    if (!options) {
        options = { ignoreExpiration: false }
    }
    const isTokenValid = jwt.verify(token, secret, options);
    return isTokenValid;
}

export function getMilliSeconds(date: Date) {
    return moment(date).valueOf()
}