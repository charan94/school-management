/**
 * @file Log.ts
 * @author K Sai Charan
*/

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    Generated,
} from 'typeorm';
import { User } from './User';

@Entity()
export class Log {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unique: true, type: 'nvarchar', length: 36, name: 'log_uuid' })
    @Generated('uuid')
    logUUID: string;

    @Column({ type: 'nvarchar', length: 255 })
    level: string;

    @Column({ type: 'nvarchar', length: 255 })
    category: string;

    @Column({ type: 'nvarchar', length: 255 })
    activity: string;

    @Column({ type: 'longtext', nullable: true })
    details: string;

    @Column({ nullable: true, type: 'nvarchar', length: 255 })
    metadata: string;

    @Column({ nullable: true, type: 'nvarchar', length: 255 })
    ip: string;

    @ManyToOne('User', 'log')
    user: Promise<User>;

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
}
