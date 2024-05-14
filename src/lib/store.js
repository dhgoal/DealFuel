// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from './features/auth/authSlice';
// Import your reducers here, for example:
// import userReducer from '../features/user/userSlice';
import dashboardReducer from './features/dashboard/dashboardSlice';
import temporaryReducer from './features/temp/temporarySlice';

const rootReducer = combineReducers({
    auth: authReducer,
    dashboard: dashboardReducer,
    temporary: temporaryReducer,
});

export const makeStore = () => configureStore({
    reducer: rootReducer,

});

const store = makeStore();


