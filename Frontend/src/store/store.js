import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';
import { sessionApi } from './api/sessionApi';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [sessionApi.reducerPath]: sessionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      sessionApi.middleware
    ),
});