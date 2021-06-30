/**
 * @file User.ts
 * @author K Sai Charan
*/

import { Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Log } from "./Log";
import { Role } from "./Role";

@Entity()
export class User {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unique: true, type: 'varchar', length: 36, name: 'user_uuid' })
    @Generated('uuid')
    userUUID: string;

    @Column({ unique: true, type: 'nvarchar', length: 50, name: 'user_name' })
    userName: string;

    @Column({ unique: true, type: 'nvarchar', length: 500 })
    email: string;

    @Column({ unique: true, type: 'nvarchar', length: 255 })
    password: string;

    @Column({ default: false })
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
    log: Log[];

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