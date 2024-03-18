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
      state.channels = state.channels.filter((channel) => channel.id !== action.payload.id);
      if (state.activeChannel === action.payload.id) {
        state.activeChannel = state.channels[0].id;
      }
    },
    renameChannelState: (state, action) => {
      const {
        id,
        name,
      } = action.payload;
      state.channels = state.channels.map((channel) => (channel.id === id ? {
        ...channel,
        name,
      } : channel));
    },
  },
});

export const {
  setChannels,
  addChannelState,
  setActiveChannel,
  removeChannelState,
  renameChannelState,
} = channelsSlice.actions;

export default channelsSlice.reducer;
