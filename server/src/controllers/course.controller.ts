import { NextFunction, Router, Request, Response } from "express";
import { injectable } from "inversify";
import { authGuard } from "../middlewares/auth.middleware";
import { routeValidator } from "../middlewares/route-validator.middleware";
import { courseValidator, paginationRequestValidator } from "../validators";

@injectable()
export class CourseController {

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
            (request, response, next) => this.getAllCourses(request, response, next));

        this.router.get(
            '/one/:id',
            [authGuard],
            courseValidator.findByID,
            [routeValidator],
            (request, response, next) => this.getCourseByID(request, response, next));

        this.router.post(
            '/one/:id',
            [authGuard],
            courseValidator.updateCourse,
            [routeValidator],
            (request, response, next) => this.updateCourse(request, response, next));
    }

    async getAllCourses(request: Request, response: Response, next: NextFunction) {

    }

    async getCourseByID(request: Request, response: Response, next: NextFunction) {

    }

    async updateCourse(request: Request, response: Response, next: NextFunction) {

    }

    /**
     * 
     * @returns created router object
     */
    getRouter(): Router {
        return this.router;
    }
}