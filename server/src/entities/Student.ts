/**
 * @file Student.ts
 * @author K Sai Charan
*/

import { Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Gender } from "../utils";
import { Course } from "./Course";

@Entity()
export class Student {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unique: true, type: 'varchar', length: 36, name: 'student_uuid' })
    @Generated('uuid')
    studentUUID: string;

    @Column({ nullable: false, type: 'nvarchar', length: 255, name: 'first_name' })
    firstName: string;

    @Column({ type: 'nvarchar', length: 255, name: 'last_name' })
    lastName: string;

    @Column({
        type: 'enum', nullable: false, enum: [
            Gender.MALE,
            Gender.FEMALE,
            Gender.OTHERS
        ]
    })
    gender: string;

    @Column({ type: 'timestamp', name: 'date_of_birth' })
    dob: Date;

    @Column({ type: 'varchar', length: 10 })
    phone: string;

    @Column({ type: 'varchar', length: 10 })
    mobile: string;

    @ManyToMany(() => Course, (course) => course.student, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
    })
    @JoinTable({
        name: 'student_course',
        joinColumn: { name: 'student_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'course_id', referencedColumnName: 'id' },
    })
    course: Course[];

    @CreateDateColumn({
        default: () => 'CURRENT_TIMESTAMP(6)',
        type: 'timestamp',
    })
    created: Date;

    @UpdateDateColumn({
        default: () => 'CURRENT_TIMESTAMP(6)',
        type: 'timestamp',
    })
    updated: Date;

    @DeleteDateColumn({
        type: 'timestamp',
    })
    deleted: Date;
}