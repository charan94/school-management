/**
 * @file Role.ts
 * @author K Sai Charan
*/

import {
    Column,
    CreateDateColumn,
    Generated,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    Entity,
    DeleteDateColumn,
    ManyToOne,
    ManyToMany,
    Index,
} from 'typeorm';
import { User } from './User';

/**
 * Role Entity
 */
@Entity()
export class Role {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unique: true, type: 'nvarchar', length: 36 })
    @Generated('uuid')
    roleUuid: string;

    @Column({ nullable: false, unique: true, type: 'nvarchar', length: 255 })
    name: string;

    @Column({ type: 'nvarchar', length: 255 })
    description: string;

    @Column({ default: false, name: 'is_active' })
    isActive: boolean;

    @ManyToMany(() => User, (user) => user.role)
    user: User[];

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
