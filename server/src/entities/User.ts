/**
 * @file User.ts
 * @author K Sai Charan
*/

import { Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Log } from "./Log";
import { Role } from "./Role";
import * as bcrypt from 'bcryptjs';

@Entity()
export class User {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unique: true, type: 'varchar', length: 36, name: 'user_uuid' })
    @Generated('uuid')
    userUUID: string;

    @Column({ unique: true, type: 'nvarchar', length: 255, name: 'first_name' })
    firstName: string;

    @Column({ unique: true, type: 'nvarchar', length: 255, name: 'last_name' })
    lastName: string;

    @Column({ unique: true, type: 'nvarchar', length: 50, name: 'user_name' })
    userName: string;

    @Column({ unique: true, type: 'nvarchar', length: 500 })
    email: string;

    @Column({ unique: true, type: 'nvarchar', length: 255 })
    password: string;

    @Column({ default: false, name: 'is_active' })
    isActive: boolean;

    @ManyToMany(() => Role, (role) => role.user, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
    })
    @JoinTable({
        name: 'user_role',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
    })
    role: Role[];

    @OneToMany('Log', 'user')
    log: Promise<Log[]>;

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

    /**
   * Compares password
   * @param pass
   * @returns true on success
   */
    async comparePassword(pass: string): Promise<boolean> {
        return bcrypt.compare(pass, this.password);
    }
}