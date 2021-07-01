import { injectable } from "inversify";
import { getRepository, In, Repository } from "typeorm";
import { Course } from "../entities/Course";
import { ICourse } from "../interfaces";
import { ERROR_MESSAGES, getMilliSeconds } from "../utils";

@injectable()
export class CourseService {
    constructor() { }

    async findMany(courseIds: Array<string>) {
        const courseRepo: Repository<Course> = getRepository(Course);
        const courses = await courseRepo.find({
            where: {
                courseUUID: In(courseIds)
            }
        });
        return courses;
    }

    async findCourse(courseUUID: string) {
        const courseRepo: Repository<Course> = getRepository(Course);
        const course = await courseRepo.findOne({
            where: {
                courseUUID
            }
        });
        if (!course) {
            throw { status: 400, message: ERROR_MESSAGES.INVALID }
        }
        return course;
    }

    async updateCourse(courseUUID: string, body: Course) {
        const courseRepo: Repository<Course> = getRepository(Course);
        const updated = await courseRepo.update({ courseUUID }, body);
        if (!updated.affected) {
            throw { status: 400, message: `Course doesn't exist.` }
        }
        return this.findCourse(courseUUID);
    }

    sanitizeCourseProps(course: any): ICourse {
        const result: ICourse = {
            courseUUID: course.courseUUID,
            name: course.name,
            description: course.description,
            created: getMilliSeconds(course.created),
            updated: getMilliSeconds(course.updated)
        };
        return result;
    }
}