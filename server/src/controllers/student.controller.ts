import { NextFunction, Request, Response, Router } from "express";
import { injectable } from "inversify";

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
        this.router.get('/all', (request, response, next) => this.getAllStudents(request, response, next));
        this.router.get('/one/:id', (request, response, next) => this.getStudentByID(request, response, next))
        this.router.post('/one/:id', (request, response, next) => this.updateStudent(request, response, next))
    }

    getAllStudents(request: Request, response: Response, next: NextFunction) {

    }

    getStudentByID(request: Request, response: Response, next: NextFunction) {

    }

    updateStudent(request: Request, response: Response, next: NextFunction) {

    }

    /**
     * 
     * @returns created router object
     */
    getRouter(): Router {
        return this.router;
    }
}