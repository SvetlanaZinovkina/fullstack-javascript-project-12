import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    activeChannel: 1,
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
  },
});

export const { setChannels, addChannelState, setActiveChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
