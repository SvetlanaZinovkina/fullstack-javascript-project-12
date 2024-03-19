import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: null,
    token: null,
  },
  reducers: {
    setUserToken: (state, { payload }) => {
      // eslint-disable-next-line
      state.username = payload.username;
      // eslint-disable-next-line
      state.token = payload.token;
    },
  },
});

export const { setUserToken } = authSlice.actions;

export default authSlice.reducer;
