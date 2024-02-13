import axios from 'axios';

import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null },
  reducers: {
    setUserToken: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
    },
  },
});

export const { setUserToken } = authSlice.actions;

export default authSlice.reducer;
