import { NextFunction, Router, Request, Response } from "express";
import { injectable } from "inversify";

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
        this.router.get('/all', (request, response, next) => this.getAllCourses(request, response, next));
        this.router.get('/one/:id', (request, response, next) => this.getCourseByID(request, response, next));
        this.router.post('/one/:id', (request, response, next) => this.updateCourse(request, response, next));
    }

    getAllCourses(request: Request, response: Response, next: NextFunction) {

    }

    getCourseByID(request: Request, response: Response, next: NextFunction) {

    }

    updateCourse(request: Request, response: Response, next: NextFunction) {

    }

    /**
     * 
     * @returns created router object
     */
    getRouter(): Router {
        return this.router;
    }
}