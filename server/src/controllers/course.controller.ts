/**
 * @file course.controller.ts
 * @author K Sai Charan
*/

import { NextFunction, Router, Request, Response } from "express";
import { matchedData } from "express-validator";
import { inject, injectable } from "inversify";
import { getRepository, Repository } from "typeorm";
import { TYPES } from "../config/inversify.types";
import { Course } from "../entities/Course";
import { ICourse, IPaginationRequest, IPaginationResponse } from "../interfaces";
import { authGuard } from "../middlewares/auth.middleware";
import { routeValidator } from "../middlewares/route-validator.middleware";
import { CourseService } from "../services/course.service";
import { PaginationService } from "../services/pagination.service";
import { courseValidator, paginationRequestValidator } from "../validators";

@injectable()
export class CourseController {

    /**
     * Router Initialization
     */
    private router = Router();


    constructor(
        @inject(TYPES.CourseService) private service: CourseService,
        @inject(TYPES.PaginationService) private paginationService: PaginationService<Course>
    ) {
        this.initializeRoutes();
    }

    /**
     * Initialize routes on course controller
     */
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

    /**
     * 
     * @param request 
     * @param response 
     * @param next 
     * @returns PaginatedResponse
     */
    async getAllCourses(request: Request, response: Response, next: NextFunction) {
        try {
            const body: IPaginationRequest<Course> = matchedData(request, { locations: ['query'] });
            const courseRepo: Repository<Course> = getRepository(Course);
            const result: IPaginationResponse<Course> = await this.paginationService.findRecords(body, courseRepo);
            return response.status(200).send({ status: 200, data: result });
        } catch (err) {
            next(err);
        }
    }

    /**
     * 
     * @param request 
     * @param response 
     * @param next 
     * @returns CourseDetails
     */
    async getCourseByID(request: Request, response: Response, next: NextFunction) {
        try {
            const body: any = matchedData(request, { locations: ['params'] });
            const course = await this.service.findCourse(body?.id || '');
            const result = this.service.sanitizeCourseProps(course);
            return response.status(200).send({ status: 200, data: result });
        } catch (err) {
            next(err);
        }
    }

    /**
     * 
     * @param request 
     * @param response 
     * @param next 
     * @returns Updates existing course
     */
    async updateCourse(request: Request, response: Response, next: NextFunction) {
        try {
            const id: string = matchedData(request, { locations: ['params'] })?.id;
            const body: Course = (matchedData(request, { locations: ['body'] }) as Course);
            const course = await this.service.updateCourse(id, body);
            const result: ICourse = await this.service.sanitizeCourseProps(course);
            return response.status(200).send({ status: 200, data: result });
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