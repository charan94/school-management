import { Gender } from "../utils";

export interface IUser {
    id?: number;
    userUUID?: string;
    userName?: string;
    password?: string;
    email?: string;
    firstName?: string
    lastName?: string
    isActive?: boolean;
    role?: IRole;
    created?: Date | number;
    updated?: Date | number;
}

export interface IRole {
    id?: number;
    roleUUID?: string;
    name?: string;
    description?: string;
    isActive?: boolean;
    created?: Date | number;
    updated?: Date | number;
}
export interface IStudent {
    id?: number;
    studentUUID?: string;
    firstName?: string;
    lastName?: string;
    gender?: Gender.MALE | Gender.FEMALE | Gender.OTHERS;
    dob?: Date | number;
    phone?: string;
    mobile?: string;
    course?: ICourse[];
    created?: Date | number;
    updated?: Date | number;
}

export interface ICourse {
    id?: number;
    courseUUID?: string;
    name?: string;
    description?: string;
    created?: Date | number;
    updated?: Date | number;
}

export interface ILog {
    id?: number;
    logUUID?: string;
    level?: string;
    category?: string;
    activity?: string;
    details?: string;
    metadata?: string;
    ip?: string;
    created?: Date | number;
    updated?: Date | number;
}

export interface IPaginationRequest<T> {
    limit?: number;
    skip?: number;
    sort?: {
        [P in keyof T]: 'ASC' | 'DESC';
    };
    filter?: IFilter[];
}

export interface PaginationResponse<T> {
    totalRecords?: number;
    records?: T[];
    skip?: number;
    limit?: number;
}

interface IFilter {
    column: string;
    value: any;
}