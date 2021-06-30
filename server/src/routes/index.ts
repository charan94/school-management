import { Router } from "express";
import { container } from "../config/inversify.config";
import { TYPES } from "../config/inversify.types";
import { AuthController } from "../controllers/auth.controller";
import { CourseController } from "../controllers/course.controller";
import { LogController } from "../controllers/log.controller";
import { StudentController } from "../controllers/student.controller";

const router = Router();

/**
 * Get instances from container
*/

const authController: AuthController = container.get<AuthController>(TYPES.AuthController);
const studentController: StudentController = container.get<StudentController>(TYPES.StudentController);
const courseController: CourseController = container.get<CourseController>(TYPES.CourseController);
const logController: LogController = container.get<LogController>(TYPES.LogController);

router.use('/auth', authController.getRouter());
router.use('/students', authController.getRouter());
router.use('/courses', authController.getRouter());
router.use('/logs', authController.getRouter());


export default router as Router;