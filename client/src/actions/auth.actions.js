/**
 * @file auth.actions.js
 * @author K Sai Charan
*/

import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI } from "../services/auth.api";

export const loginAction = createAsyncThunk(
    'auth/login',
    async (data) => {
        const result = await loginAPI(data);
        return result;
    }
)