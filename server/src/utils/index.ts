import * as jwt from 'jsonwebtoken';

export enum Gender {
    MALE,
    FEMALE,
    OTHERS
}

export const ERROR_MESSAGES = {
    UNAUTHORIZED: 'User is not authorized to access this resource',
    INVALID_TOKEN: 'Invalid Authentication token',
    REQUIRED: (key: string) => `${key} is required`,
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