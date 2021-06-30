import { checkSchema } from "express-validator";
import { ERROR_MESSAGES } from "../utils";

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

const studentValidator = {

}

const courseValidator = {

}

const logValidator = {

}