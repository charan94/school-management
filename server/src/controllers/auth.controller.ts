/**
 * @file auth.controller.ts
 * @author K Sai Charan
*/

import { Router } from "express";
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

    }

    /**
     * 
     * @returns created router object
     */
    getRouter(): Router {
        return this.router;
    }
}