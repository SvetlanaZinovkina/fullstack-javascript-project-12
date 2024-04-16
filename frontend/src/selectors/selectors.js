import { createSelector } from 'reselect';

export const getIsModalOpen = (state) => state.modal.isOpened;

export const getModalType = (state) => state.modal.type;

export const getChannelId = (state) => state.modal.channelID;

export const getChannels = (state) => state.channels.channels;

export const getActiveChannelId = (state) => state.channels.activeChannel;

export const getMessages = (state) => state.messages.messages;

export const getActiveChannel = createSelector(
  [getChannels, getActiveChannelId],
  (channels, activeChannelId) => channels.find((channel) => channel.id === activeChannelId),
);

export const getActiveMessage = createSelector(
  [getMessages, getActiveChannelId],
  (messages, activeChannelId) => messages && messages.filter((message) => message.channelId === activeChannelId),
);

export const getMessagesCount = createSelector(
  [getActiveMessage],
  (activeMessages) => (activeMessages ? activeMessages.length : 0),
);
