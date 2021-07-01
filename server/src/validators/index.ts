import { checkSchema, Schema } from "express-validator";
import { ERROR_MESSAGES } from "../utils";

const paginationRequestSchema: Schema = {
    limit: {
        in: ['query'],
        trim: true,
        isNumeric: true,
        optional: true
    },
    skip: {
        in: ['query'],
        trim: true,
        isNumeric: true,
        optional: true
    },
    sort: {
        in: ['query'],
        optional: true,
        trim: true,
        isObject: {
            errorMessage: ERROR_MESSAGES.INVALID
        }
    },
    filter: {
        in: ['query'],
        optional: true,
        trim: true,
        isArray: {
            errorMessage: ERROR_MESSAGES.INVALID
        }
    }
}

export const authValidator = {
    login: checkSchema({
        username: {
            in: ['body'],
            trim: true,
            escape: true,
            notEmpty: {
                errorMessage: ERROR_MESSAGES.REQUIRED('User Name'),
            },
        },
        password: {
            in: ['body'],
            trim: true,
            escape: true,
            notEmpty: {
                errorMessage: ERROR_MESSAGES.REQUIRED('Password'),
            },
        }
    })
}

const paginationValidator = {
    findAll: checkSchema(paginationRequestSchema)
}

const studentValidator = {


}

const courseValidator = {

}

const logValidator = {

}