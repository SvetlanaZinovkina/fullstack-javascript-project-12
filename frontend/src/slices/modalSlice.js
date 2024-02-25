import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: { isOpened: false, type: null, channelID: null },
  reducers: {
    openModal: (state, action) => {
      state.isOpened = true;
      state.type = action.payload.type;
      state.channelID = action.payload.channelID;
    },
    closeModal: (state) => {
      state.isOpened = false;
      state.type = null;
      state.channelID = null;
    },
  },
});

export const { setOpenModal } = modalSlice.actions;

export default modalSlice.reducer;
