/**
 * @file student.service.ts
 * @author K Sai Charan
*/

import { inject, injectable } from "inversify";
import { getRepository, Repository } from "typeorm";
import { TYPES } from "../config/inversify.types";
import { Student } from "../entities/Student";
import { IStudent } from "../interfaces";
import { ERROR_MESSAGES, getMilliSeconds } from "../utils";
import { CourseService } from "./course.service";

@injectable()
export class StudentService {
    constructor(@inject(TYPES.CourseService) private courseService: CourseService) { }

    /**
     * Find student based on UUID
     * @param studentUUID 
     * @returns student object
     */
    async findStudent(studentUUID: string) {
        const studentRepo: Repository<Student> = getRepository(Student);
        const student = await studentRepo.findOne({
            where: {
                studentUUID
            }
        });
        if (!student) {
            throw { status: 400, message: ERROR_MESSAGES.INVALID }
        }
        const courses = await student.course;
        return { student, courses };
    }

    /**
     * Updates student based on UUID
     * @param studentUUID 
     * @param body 
     * @returns Updated student object
     */
    async updateStudent(studentUUID: string, body: Student) {
        const studentRepo: Repository<Student> = getRepository(Student);
        let newCourses: any = null;
        if (body.course) {
            newCourses = body.course;
            delete body.course;
        }
        if (Object.keys(body).length) {
            const updated = await studentRepo.update({ studentUUID }, body);
            if (!updated.affected) {
                throw { status: 400, message: `Student doesn't exist.` }
            }
        }
        const { student, courses } = await this.findStudent(studentUUID);
        if (newCourses) {
            student.course = Promise.resolve(await this.courseService.findMany(newCourses.map((course: any) => course.courseUUID)));
            const updatedStudent = await studentRepo.save(student);
            return { student: updatedStudent, courses: updatedStudent['__course__'] }
        }
        return { student, courses };
    }

    /**
     * Removes/Updates unwanted/secure keys in the student object
     * @param studentProps 
     * @param courses 
     * @returns sanitized student object
     */
    sanitizeRecords(studentProps: any, courses: Array<any>): IStudent {
        const result: IStudent = {
            id: studentProps.id,
            studentUUID: studentProps.studentUUID,
            course: courses.map((course: any) => {
                delete course.deleted;
                course.created = getMilliSeconds(course.created);
                course.updated = getMilliSeconds(course.updated);
                return course;
            }),
            firstName: studentProps.firstName,
            lastName: studentProps.lastName,
            dob: studentProps.dob,
            gender: studentProps.gender,
            mobile: studentProps.mobile,
            phone: studentProps.phone,
            created: getMilliSeconds(studentProps.created),
            updated: getMilliSeconds(studentProps.updated)
        };
        return result;
    }
}