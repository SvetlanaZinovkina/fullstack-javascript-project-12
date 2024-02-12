import { configureStore } from '@reduxjs/toolkit';
import api from './loginApi.js';
import authReducer from '../slices/loginSlice.js';

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});
