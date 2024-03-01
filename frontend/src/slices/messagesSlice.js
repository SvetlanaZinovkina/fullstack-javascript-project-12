import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessageState: (state, action) => {
      state.messages = [...state.messages, action.payload];

      // state.messages.push(action.payload);
    },
    editMessage: (state, action) => {
      const { messageId, newBody } = action.payload;
      const messageToEdit = state.messages.find((message) => message.id === messageId);

      if (messageToEdit) {
        // eslint-disable-next-line functional/no-expression-statements
        messageToEdit.body = newBody;
      }
    },
    deleteMessage: (state, action) => {
      const messageIdToRemove = action.payload.id;
      state.messages = state.messages.filter((message) => message.id !== messageIdToRemove);
    },
  },
});

export const {
  setMessages, addMessageState, editMessage, deleteMessage,
} = messagesSlice.actions;

export default messagesSlice.reducer;
