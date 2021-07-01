import { NextFunction, Request, Response, Router } from "express";
import { matchedData } from "express-validator";
import { inject, injectable } from "inversify";
import { getRepository, Repository } from "typeorm";
import { TYPES } from "../config/inversify.types";
import { Student } from "../entities/Student";
import { IPaginationRequest, IPaginationResponse, IStudent } from "../interfaces";
import { authGuard } from "../middlewares/auth.middleware";
import { routeValidator } from "../middlewares/route-validator.middleware";
import { PaginationService } from "../services/pagination.service";
import { StudentService } from "../services/student.service";
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
    constructor(@inject(TYPES.StudentService) private service: StudentService, @inject(TYPES.PaginationService) private paginationService: PaginationService<Student>) {
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
        try {
            const body: IPaginationRequest<Student> = matchedData(request, { locations: ['query'] });
            const studentRepo: Repository<Student> = getRepository(Student);
            const result: IPaginationResponse<Student> = await this.paginationService.findRecords(body, studentRepo);
            return response.status(200).send({ status: 200, data: result });
        } catch (err) {
            next(err);
        }
    }

    async getStudentByID(request: Request, response: Response, next: NextFunction) {
        try {
            const body: any = matchedData(request, { locations: ['params'] });
            const result: IStudent = await this.service.findStudent(body?.id || '');
            return response.status(200).send({ status: 200, data: result });
        } catch (err) {
            next(err);
        }
    }

    async updateStudent(request: Request, response: Response, next: NextFunction) {
        try {
            const id: string = matchedData(request, { locations: ['params'] })?.id;
            const body: Student = (matchedData(request, { locations: ['body'] }) as Student);
            const student: IStudent = await this.service.updateStudent(id, body);
            return response.status(200).send({ status: 200, data: student });
        } catch (err) {
            next(err);
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