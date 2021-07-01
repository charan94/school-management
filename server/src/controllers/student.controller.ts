import { NextFunction, Request, Response, Router } from "express";
import { matchedData } from "express-validator";
import { injectable } from "inversify";
import { IPaginationRequest, IStudent } from "../interfaces";
import { authGuard } from "../middlewares/auth.middleware";
import { routeValidator } from "../middlewares/route-validator.middleware";
import { paginationRequestValidator, studentValidator } from "../validators";

@injectable()
export class StudentController {

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
            (request, response, next) => this.getAllStudents(request, response, next));

        this.router.get(
            '/one/:id',
            [authGuard],
            studentValidator.findByID,
            [routeValidator],
            (request, response, next) => this.getStudentByID(request, response, next))

        this.router.post(
            '/one/:id',
            [authGuard],
            studentValidator.updateStudent,
            [routeValidator],
            (request, response, next) => this.updateStudent(request, response, next))
    }

    async getAllStudents(request: Request, response: Response, next: NextFunction) {
        const body: IPaginationRequest<IStudent> = matchedData(request, { locations: ['query'] })
    }

    async getStudentByID(request: Request, response: Response, next: NextFunction) {

    }

    async updateStudent(request: Request, response: Response, next: NextFunction) {

    }

    /**
     * 
     * @returns created router object
     */
    getRouter(): Router {
        return this.router;
    }
}