/**
 * @file auth.controller.ts
 * @author K Sai Charan
*/

import { NextFunction, Request, Response, Router } from "express";
import { injectable } from "inversify";

@injectable()
export class AuthController {

    /**
     * Router Initialization
     */
    private router = Router();

    /**
     * Initialize routes on contructor
     */
    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this.router.post('/login', (request, response, next) => this.doLogin(request, response, next))
    }

    doLogin(request: Request, response: Response, next: NextFunction) {

    }

    /**
     * 
     * @returns created router object
     */
    getRouter(): Router {
        return this.router;
    }
}