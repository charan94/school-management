/**
 * @file log.controller.ts
 * @author K Sai Charan
*/

import { Router, Request, Response, NextFunction } from "express";
import { matchedData } from "express-validator";
import { inject, injectable } from "inversify";
import { getRepository, Repository } from "typeorm";
import { TYPES } from "../config/inversify.types";
import { Log } from "../entities/Log";
import { IPaginationRequest } from "../interfaces";
import { authGuard } from "../middlewares/auth.middleware";
import { routeValidator } from "../middlewares/route-validator.middleware";
import { PaginationService } from "../services/pagination.service";
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
    constructor(@inject(TYPES.PaginationService) private paginationService: PaginationService<Log>) {
        this.initializeRoutes();
    }

    /**
     * Initializes routes on log controller
     */
    initializeRoutes(): void {
        this.router.get(
            '/all',
            [authGuard],
            paginationRequestValidator,
            [routeValidator],
            (request, response, next) => this.getAllLogs(request, response, next));
    }

    /**
     * 
     * @param request 
     * @param response 
     * @param next 
     * @returns Log Array
     */
    async getAllLogs(request: Request, response: Response, next: NextFunction) {
        try {
            const body: IPaginationRequest<Log> = matchedData(request, { locations: ['query'] });
            const logRepo: Repository<Log> = getRepository(Log);
            const result = await this.paginationService.findRecords(body, logRepo);
            return response.status(200).send({ status: 200, data: result });
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