/**
 * @file inversify.types.ts
 * @author K Sai Charan
*/

export const TYPES = {
    AuthController: Symbol.for("AuthController"),
    AuthService: Symbol.for("AuthService"),
    StudentController: Symbol.for("StudentController"),
    StudentService: Symbol.for("StudentService"),
    CourseController: Symbol.for("CourseController"),
    CourseService: Symbol.for("CourseService"),
    LogController: Symbol.for("LogController"),
    LogService: Symbol.for("LogService")
}