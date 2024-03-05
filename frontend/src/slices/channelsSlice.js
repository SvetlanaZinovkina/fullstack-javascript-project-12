import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    activeChannel: '1',
  },
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload;
    },
    addChannelState: (state, action) => {
      state.channels.push(action.payload);
    },
    setActiveChannel: (state, action) => {
      state.activeChannel = action.payload;
    },
    removeChannelState: (state, action) => {
      state.channels = state.channels.filter((channel) => channel.id !== action.payload);
      if (state.activeChannel === action.payload) {
        state.activeChannel = state.channels[0].id;
      }
    },
  },
});

export const {
  setChannels, addChannelState, setActiveChannel, removeChannelState,
} = channelsSlice.actions;

export default channelsSlice.reducer;
