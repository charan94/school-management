/**
 * @file error.middleware.ts
 * @author K Sai Charan
*/

import { NextFunction, Request, Response } from 'express';

/**
 * Middleware that returns error response
 * @param err
 * @param req
 * @param res
 * @param next
 * @returns status and error messages
 */
export async function errorMiddleware(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    res.status(err.status || 500).send({
        status: err.status || 500,
        error: err && err.message ? err.message : err,
    });
}
