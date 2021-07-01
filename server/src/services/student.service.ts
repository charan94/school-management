import { injectable } from "inversify";
import { getRepository, Repository } from "typeorm";
import { Student } from "../entities/Student";
import { IStudent } from "../interfaces";
import { ERROR_MESSAGES, getMilliSeconds } from "../utils";

@injectable()
export class StudentService {
    constructor() { }

    async findStudent(studentUUID: string) {
        const studentRepo: Repository<Student> = getRepository(Student);
        const student = await studentRepo.findOne({
            where: {
                studentUUID
            }
        });
        const courses = await student.course;
        if (!student) {
            throw { status: 400, message: ERROR_MESSAGES.INVALID }
        }
        const result: IStudent = {
            studentUUID: student.studentUUID,
            course: courses,
            firstName: student.firstName,
            lastName: student.lastName,
            dob: student.dob,
            gender: student.gender,
            mobile: student.mobile,
            phone: student.phone,
            created: getMilliSeconds(student.created),
            updated: getMilliSeconds(student.updated)
        };
        return result;
    }

    async updateStudent(studentUUID: string, body: Student) {
        const studentRepo: Repository<Student> = getRepository(Student);
        const updated = await studentRepo.update({ studentUUID }, body);
        if (!updated.affected) {
            throw { status: 400, message: `Student doesn't exist.` }
        }
        return this.findStudent(studentUUID);
    }
}