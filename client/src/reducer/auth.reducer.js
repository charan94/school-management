import {
    createEntityAdapter,
    createSelector,
    createSlice,
} from "@reduxjs/toolkit";

export const AUTH_INITIAL_STATE_LOGIN = {
    user: null,
    state: null,
    errors: null,
    isAuthenticated: false,
    accessToken: null
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
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
export const { selectAll, selectEntities } = authAdapter.getSelectors();
export const getAuthState = (rootState) => rootState[AUTH_FEATURE_KEY];
export const selectAllAuth = createSelector(getAuthState, selectAll);
export const selectAuthEntities = createSelector(getAuthState, selectEntities);
