import {
    createEntityAdapter,
    createSelector,
    createSlice,
} from "@reduxjs/toolkit";
import { loginAction } from "../actions/auth.actions";

export const AUTH_INITIAL_STATE_LOGIN = {
    user: null,
    errors: null,
    isAuthenticated: false,
    accessToken: null,
    loading: false
};

export const AUTH_FEATURE_KEY = "auth";
export const authAdapter = createEntityAdapter();
export const initialAuthState = authAdapter.getInitialState(
    AUTH_INITIAL_STATE_LOGIN
);

export const authSlice = createSlice({
    name: AUTH_FEATURE_KEY,
    initialState: AUTH_INITIAL_STATE_LOGIN,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginAction.pending, (state) => {
                state.loading = true;
                state.isAuthenticated = false;
                state.accessToken = null;
            })
            .addCase(loginAction.fulfilled, (state, action) => {
                state.loading = false;
                const response = action?.payload;
                if (response?.status === 200) {
                    state.user = response?.data;
                    state.isAuthenticated = true;
                    state.accessToken = response.data?.token;
                    localStorage.setItem('x-auth-token', response.data?.token);
                } else {
                    state.errors = response?.error;
                    state.isAuthenticated = false;
                    state.accessToken = null;
                }
            })
            .addCase(loginAction.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.errors = action?.error?.message;
            })
    }
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
export const { selectAll, selectEntities } = authAdapter.getSelectors();
export const getAuthState = (rootState) => rootState[AUTH_FEATURE_KEY];
export const selectAllAuth = createSelector(getAuthState, selectAll);
export const selectAuthEntities = createSelector(getAuthState, selectEntities);
