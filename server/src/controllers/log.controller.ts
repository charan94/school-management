import { Router, Request, Response, NextFunction } from "express";
import { injectable } from "inversify";
import { authGuard } from "../middlewares/auth.middleware";
import { routeValidator } from "../middlewares/route-validator.middleware";
import { paginationRequestValidator } from "../validators";

@injectable()
export class LogController {

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
        this.router.get(
            '/all',
            [authGuard],
            paginationRequestValidator,
            [routeValidator],
            (request, response, next) => this.getAllLogs(request, response, next));
    }

    async getAllLogs(request: Request, response: Response, next: NextFunction) {
        try {

        } catch (err) {
            next({ status: 400, message: err });
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