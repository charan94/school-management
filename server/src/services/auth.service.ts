/**
 * @file auth.service.ts
 * @author K Sai Charan
*/

import { injectable } from "inversify";
import { getRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { IUser } from "../interfaces";
import { ERROR_MESSAGES, getMilliSeconds, signJWT, verifyAuthToken } from "../utils";

@injectable()
export class AuthService {

    constructor() { }

    /**
     * Checks in the db whether the user exists and then returns the user object
     * @param user 
     */
    async login(loginProps: IUser): Promise<IUser> {
        const userRepo: Repository<User> = getRepository(User);
        let result: IUser = null;
        const user: User = await userRepo.findOne({
            where: {
                userName: loginProps.userName,
            },
            relations: ['role'],
        });

        user.role = user.role.map((role: any) => {
            delete role.id;
            delete role.deleted;
            delete role.description;
            role.created = getMilliSeconds(role.created);
            role.updated = getMilliSeconds(role.updated);
            return role;
        });

        if (!user) {
            throw { message: ERROR_MESSAGES.LOGIN_FAILED }
        }
        const isPasswordMatched = await user.comparePassword(loginProps.password);
        if (!isPasswordMatched) {
            throw { message: ERROR_MESSAGES.LOGIN_FAILED };
        }

        result = {
            firstName: user.firstName, lastName: user.lastName, role: user.role, email: user.email,
            userUUID: user.userUUID, created: getMilliSeconds(user.created), updated: getMilliSeconds(user.updated)
        };
        result.token = signJWT(result, `${process.env.JWT_KEY}`, 3600);
        return result;
    }


    /**
     * Validates authToken and returns decoded token
     * @param token 
     * @returns decodedToken | false
     */
    validateAuthToken(token: string) {
        const authenticatedPayload: any = verifyAuthToken(token, `${process.env.JWT_KEY}`);
        if (authenticatedPayload) {
            return authenticatedPayload;
        }
        return false;
    }

}