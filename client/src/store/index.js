import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authReducer, AUTH_FEATURE_KEY, AUTH_INITIAL_STATE_LOGIN } from "../reducer/auth.reducer";
import { homeReducer, HOME_FEATURE_KEY, HOME_INITIAL_STATE } from "../reducer/home.reducer";

const getStateFromStorage = () => {
    const savedState = localStorage.getItem('state');
    if (savedState) {
        return JSON.parse(savedState)
    }
    return {
        [AUTH_FEATURE_KEY]: AUTH_INITIAL_STATE_LOGIN,
        [HOME_FEATURE_KEY]: HOME_INITIAL_STATE
    }
}

const store = configureStore({
    reducer: {
        [AUTH_FEATURE_KEY]: authReducer,
        [HOME_FEATURE_KEY]: homeReducer
    },
    middleware: [...getDefaultMiddleware()],
    enhancers: [],
    preloadedState: getStateFromStorage()
});

const saveState = (data) => {
    if (data) {
        localStorage.setItem('state', JSON.stringify(data));
    } else {
        localStorage.setItem('state', JSON.stringify({
            [AUTH_FEATURE_KEY]: AUTH_INITIAL_STATE_LOGIN,
            [HOME_FEATURE_KEY]: HOME_INITIAL_STATE
        }));
    }

}

store.subscribe(() => {
    const state = store.getState();
    saveState(state);
})

export default store;