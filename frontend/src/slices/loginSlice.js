import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { username: null, token: null },
  reducers: {
    setUserToken: (state, { payload }) => {
      state.username = payload.username;
      state.token = payload.token;
    },
  },
});

export const { setUserToken } = authSlice.actions;

export default authSlice.reducer;
