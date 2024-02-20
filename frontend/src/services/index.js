import { configureStore } from '@reduxjs/toolkit';
import api from './api.js';
import authReducer from '../slices/loginSlice.js';
import channelsReducer from '../slices/channelsSlice.js';
import messagesReducer from '../slices/messagesSlice.js';

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    channels: channelsReducer,
    messages: messagesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});
