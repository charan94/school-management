import {
    createEntityAdapter,
    createSelector,
    createSlice,
} from "@reduxjs/toolkit";
import { loadStudentsAction } from "../actions/home.actions";

export const HOME_INITIAL_STATE = {
    students: [],
    courses: [],
    studentsDataLoading: false,
    courseDataLoading: false,
    studentsDataFetchError: null,
    coursesDataFetchError: null
};

export const HOME_FEATURE_KEY = "home";
export const homeAdapter = createEntityAdapter();
export const initialAuthState = homeAdapter.getInitialState(
    HOME_INITIAL_STATE
);

export const homeSlice = createSlice({
    name: HOME_FEATURE_KEY,
    initialState: HOME_INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadStudentsAction.pending, (state) => {
                state.students = [];
                state.studentsDataLoading = true;
            })
            .addCase(loadStudentsAction.fulfilled, (state, action) => {
                const response = action.payload;
                state.studentsDataLoading = false;
                if (response.status === 200) {
                    state.students = response.data;
                } else {
                    state.studentsDataFetchError = response?.error;
                }
            })
            .addCase(loadStudentsAction.rejected, (state, action) => {
                state.studentsDataLoading = false;
                state.studentsDataFetchError = action?.error?.message;
            })
    }
});

export const homeReducer = homeSlice.reducer;
export const homeActions = homeSlice.actions;
export const { selectAll, selectEntities } = homeAdapter.getSelectors();
export const getHomeState = (rootState) => rootState[HOME_FEATURE_KEY];
export const selectAllHome = createSelector(getHomeState, selectAll);
export const selectHomeEntities = createSelector(getHomeState, selectEntities);
