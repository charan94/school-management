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
        userName: {
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

export const paginationRequestValidator = checkSchema(paginationRequestSchema);

export const studentValidator = {
    findByID: checkSchema({
        id: {
            in: ['params'],
            notEmpty: true,
            trim: true
        }
    }),
    updateStudent: checkSchema({
        id: {
            in: ['params'],
            notEmpty: true,
            trim: true
        },
        firstName: {
            in: ['body'],
            escape: true,
            trim: true,
            isString: {
                errorMessage: ERROR_MESSAGES.INVALID
            },
            isLength: {
                options: {
                    max: 255
                },
                errorMessage: ERROR_MESSAGES.INVALID
            },
            optional: true
        },
        lastName: {
            in: ['body'],
            escape: true,
            trim: true,
            isString: {
                errorMessage: ERROR_MESSAGES.INVALID
            },
            isLength: {
                options: {
                    max: 255
                },
                errorMessage: ERROR_MESSAGES.INVALID
            },
            optional: true
        },
        gender: {
            in: ['body'],
            escape: true,
            trim: true,
            isInt: {
                options: { lt: 3 },
                errorMessage: ERROR_MESSAGES.INVALID
            },
            optional: true
        },
        dob: {
            in: ['body'],
            escape: true,
            trim: true,
            isDate: {
                options: { format: 'yyyy-mm-dd' },
                errorMessage: ERROR_MESSAGES.INVALID
            },
            optional: true
        },
        phone: {
            in: ['body'],
            escape: true,
            trim: true,
            isString: {
                errorMessage: ERROR_MESSAGES.INVALID
            },
            optional: true
        },
        mobile: {
            in: ['body'],
            escape: true,
            trim: true,
            isString: {
                errorMessage: ERROR_MESSAGES.INVALID
            },
            optional: true
        },
        course: {
            in: ['body'],
            isArray: {
                errorMessage: ERROR_MESSAGES.INVALID
            },
            optional: true
        }
    })
}

export const courseValidator = {
    findByID: checkSchema({
        id: {
            in: ['params'],
            notEmpty: true,
            trim: true
        }
    }),
    updateCourse: checkSchema({
        id: {
            in: ['params'],
            notEmpty: true,
            trim: true
        },
        name: {
            in: ['body'],
            escape: true,
            trim: true,
            isString: {
                errorMessage: ERROR_MESSAGES.INVALID
            },
            isLength: {
                options: {
                    max: 255
                },
                errorMessage: ERROR_MESSAGES.INVALID
            },
            optional: true
        },
        description: {
            in: ['body'],
            escape: true,
            trim: true,
            isString: {
                errorMessage: ERROR_MESSAGES.INVALID
            },
            isLength: {
                options: {
                    max: 255
                },
                errorMessage: ERROR_MESSAGES.INVALID
            },
            optional: true
        }
    })
}