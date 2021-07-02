/**
 * @file route-validator.middleware.ts
 * @author K Sai Charan
*/

import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { LOGGER } from "../config/logger";

/**
 * Validates request body, query and params for rest APIS
 * @param request 
 * @param response 
 * @param next 
 * @returns error if invalid or passes control to next matching routes
 */
export async function routeValidator(request: Request, response: Response, next: NextFunction) {
    const errors = validationResult(request).array();
    if (errors.length > 0) {
        // Log route access failure event.
        LOGGER.info({
            message: `An error occurred during the routing process due to missing request parameter(s).`,
        });

        // Log which validation errors occured.
        LOGGER.info({
            message: errors,
        });

        // Return failure response.
        return next({
            status: 400,
            message: 'Missing request parameter(s)',
        });
    }

    // Return to next middleware/controller.
    return next();
}