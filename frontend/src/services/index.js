import { configureStore } from '@reduxjs/toolkit';
import api from './api.js';
import authReducer from '../slices/loginSlice.js';

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});
