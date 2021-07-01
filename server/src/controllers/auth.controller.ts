/**
 * @file auth.controller.ts
 * @author K Sai Charan
*/

import { NextFunction, Request, Response, Router } from "express";
import { matchedData } from "express-validator";
import { inject, injectable } from "inversify";
import { TYPES } from "../config/inversify.types";
import { IUser } from "../interfaces";
import { AuthService } from "../services/auth.service";

@injectable()
export class AuthController {

    /**
     * Router Initialization
     */
    private router = Router();

    /**
     * Initialize routes on contructor
     */
    constructor(@inject(TYPES.AuthService) private authService: AuthService) {
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this.router.post('/login', (request, response, next) => this.doLogin(request, response, next))
    }

    async doLogin(request: Request, response: Response, next: NextFunction) {
        try {
            const body: IUser = matchedData(request, { locations: ['body'] });
            const result: IUser = await this.authService.login(body);
            return response.status(200).send({ status: 200, data: result });
        } catch (err) {
            return next({ status: 400, message: err });
        }
    }

    /**
     * 
     * @returns created router object
     */
    getRouter(): Router {
        return this.router;
    }
}