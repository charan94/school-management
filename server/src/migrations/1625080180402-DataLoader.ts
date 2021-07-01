/**
 * @file DataLoader.ts
 * @author K Sai Charan
*/

import { getRepository, MigrationInterface, QueryRunner, Repository } from "typeorm";
import { Course } from "../entities/Course";
import { Role } from "../entities/Role";
import { Student } from "../entities/Student";
import { User } from "../entities/User";
import * as faker from 'faker';
import { Gender } from "../utils";

export class DataLoader1625080180402 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const roleRepo: Repository<Role> = getRepository(Role);
        const userRepo: Repository<User> = getRepository(User);
        const studentRepo: Repository<Student> = getRepository(Student);
        const courseRepo: Repository<Course> = getRepository(Course);
        const createdRole = await roleRepo.create({ name: 'ADMIN', description: 'Role for ADMIN', isActive: true });
        const role = await roleRepo.save(createdRole);
        const createdUser = await userRepo.create({ firstName: 'admin', lastName: 'admin', isActive: true, userName: 'admin', password: 'password', email: 'admin@school.com', role: [role] });
        const user = await userRepo.save(createdUser);
        let courses = [];
        let students = [];
        for (let i = 0; i < 100; i++) {
            const createdCourse = await courseRepo.create({ name: faker.random.word(), description: faker.lorem.text().substring(0, 200) });
            const course = await courseRepo.save(createdCourse);
            courses.push(course);
        }
        for (let i = 0; i < 100; i++) {
            const gender = i % 2 > 0 ? Gender.MALE : Gender.FEMALE;
            const createdStudent = await studentRepo.create({
                firstName: faker.name.firstName(gender), lastName: faker.name.lastName(gender),
                mobile: faker.phone.phoneNumber().substring(0, 15), phone: faker.phone.phoneNumber().substring(0, 15),
                dob: faker.date.between('1980', '2000'), gender
            });
            let student = await studentRepo.save(createdStudent);
            student.course = Promise.resolve([courses[i]]);
            student = await studentRepo.save(student);
            students.push(student);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`truncate user_role`);
        await queryRunner.query(`truncate student_course`);
        await queryRunner.query(`truncate student`);
        await queryRunner.query(`truncate course`);
        await queryRunner.query(`truncate user`);
        await queryRunner.query(`truncate role`);
    }

}
