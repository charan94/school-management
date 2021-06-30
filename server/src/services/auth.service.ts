import { injectable } from "inversify";
import { verifyAuthToken } from "../utils";

@injectable()
export class AuthService {

    constructor() { }

    /**
     * Validates authToken and returns decoded token
     * @param token 
     * @returns decodedToken | false
     */
    validateAuthToken(token: string) {
        const authenticatedPayload: any = verifyAuthToken(token);
        if (authenticatedPayload) {
            return authenticatedPayload;
        }
        return false;
    }

}