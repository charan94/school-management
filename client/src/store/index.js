import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authReducer, AUTH_FEATURE_KEY } from "../reducer/auth.reducer";

const store = configureStore({
    reducer: {
        [AUTH_FEATURE_KEY]: authReducer
    },
    middleware: [...getDefaultMiddleware()],
    enhancers: []
});

export default store;