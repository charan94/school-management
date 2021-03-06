/**
 * @file auth.api.js
 * @author K Sai Charan
*/

import { apiCall } from "./api";

export const loginAPI = (data) => {
    const url = `/auth/login`;
    return apiCall(url, 'POST', data);
}