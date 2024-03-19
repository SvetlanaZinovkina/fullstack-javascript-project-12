import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpened: false,
    type: null,
    channelID: null,
  },
  reducers: {
    openModal: (state, action) => {
      // eslint-disable-next-line
      state.isOpened = true;
      // eslint-disable-next-line
      state.type = action.payload.type;
      // eslint-disable-next-line
      state.channelID = action.payload.channelID;
    },
    closeModal: (state) => {
      // eslint-disable-next-line
      state.isOpened = false;
      // eslint-disable-next-line
      state.type = null;
      // eslint-disable-next-line
      state.channelID = null;
    },
  },
});

export const {
  openModal,
  closeModal,
} = modalSlice.actions;

export default modalSlice.reducer;
