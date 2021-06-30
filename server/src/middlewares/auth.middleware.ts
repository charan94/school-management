/**
 * @file auth.middleware.ts
 * @author K Sai Charan
*/

import { NextFunction, Request, Response } from "express";
import { container } from "../config/inversify.config";
import { TYPES } from "../config/inversify.types";
import { AuthService } from "../services/auth.service";
import { ERROR_MESSAGES } from "../utils";


/**
 * Checks if the Authorization token is valid.
 *
 * @param request The request object containing params or body.
 * @param response The response object for attaching/customizing data to respond with.
 * @param next The next middleware in the chain to process the request.
 * @returns next.
 */
export async function authGuard(
    request: Request,
    response: Response,
    next: NextFunction
) {
    if (!request.get('Authorization')) {
        return response
            .status(401)
            .send({ name: 'Authorization', message: ERROR_MESSAGES.UNAUTHORIZED });
    }

    const authService: AuthService = container.get<AuthService>(
        TYPES.AuthService
    );
    try {
        const authToken = request.get('Authorization').split('Bearer ')[1];
        const authenticatedPayload: any = authService.validateAuthToken(authToken);
        if (authenticatedPayload) {
            if (!response.locals) {
                response.locals = {};
            }
            response.locals.userUUID = authenticatedPayload?.userUUID || '';
            response.locals.email = authenticatedPayload?.email || '';
            response.locals.roles = authenticatedPayload?.role || [];
            next();
        } else {
            response
                .status(401)
                .send({ name: 'Authorization', message: ERROR_MESSAGES.UNAUTHORIZED });
        }
    } catch (err) {
        next({ message: ERROR_MESSAGES.INVALID_TOKEN, status: 401 });
    }
}