/**
 * @file Course.ts
 * @author K Sai Charan
*/

import { Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Student } from "./Student";

@Entity()
export class Course {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unique: true, type: 'varchar', length: 36, name: 'course_uuid' })
    @Generated('uuid')
    courseUUID: string;

    @Column({ nullable: false, type: 'nvarchar', length: 255 })
    name: string;

    @Column({ type: 'nvarchar', length: 500 })
    description: string;

    @CreateDateColumn({
        default: () => 'CURRENT_TIMESTAMP(6)',
        type: 'timestamp',
    })
    created: Date;

    @ManyToMany(() => Student, (student) => student.course)
    student: Student[];

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