import { Router, Request, Response, NextFunction } from "express";
import { injectable } from "inversify";

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
        this.router.get('/all', (request, response, next) => this.getAllLogs(request, response, next));
        this.router.post('/one/:id', (request, response, next) => this.insertLog(request, response, next));
    }

    getAllLogs(request: Request, response: Response, next: NextFunction) {

    }

    insertLog(request: Request, response: Response, next: NextFunction) {

    }

    /**
     * 
     * @returns created router object
     */
    getRouter(): Router {
        return this.router;
    }
}