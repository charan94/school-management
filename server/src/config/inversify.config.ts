/**
 * @file inversify.config.ts
 * @author K Sai Charan
*/

import "reflect-metadata";
import { Container } from 'inversify';
import { AuthController } from "../controllers/auth.controller";
import { TYPES } from "./inversify.types";
import { AuthService } from "../services/auth.service";
import { StudentController } from "../controllers/student.controller";
import { StudentService } from "../services/student.service";
import { CourseController } from "../controllers/course.controller";
import { CourseService } from "../services/course.service";
import { LogController } from "../controllers/log.controller";
import { LogService } from "../services/log.service";
import { PaginationService } from "../services/pagination.service";

/**
 * Instantiates a container where the symbols from types.ts are mapped to the respective classes.
 * @export container which has all the mapped classes
 */

export const container = new Container();

container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container.bind<AuthService>(TYPES.AuthService).to(AuthService);
container.bind<StudentController>(TYPES.StudentController).to(StudentController);
container.bind<StudentService>(TYPES.StudentService).to(StudentService);
container.bind<CourseController>(TYPES.CourseController).to(CourseController);
container.bind<CourseService>(TYPES.CourseService).to(CourseService);
container.bind<LogController>(TYPES.LogController).to(LogController);
container.bind<LogService>(TYPES.LogService).to(LogService);
container.bind<PaginationService<any>>(TYPES.PaginationService).to(PaginationService);