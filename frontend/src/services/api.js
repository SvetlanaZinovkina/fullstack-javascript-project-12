import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../routes/routes.js';

const baseQuery = fetchBaseQuery({
  baseUrl: routes.defaultApiPath(),
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const api = createApi({
  baseQuery,
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (newUser) => ({
        url: routes.signUpPage(),
        method: 'POST',
        body: newUser,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: routes.loginPage(),
        method: 'POST',
        body: credentials,
      }),
    }),
    getChannels: builder.query({
      query: () => routes.channelsPath(),
    }),
    addChannel: builder.mutation({
      query: (newChannel) => ({
        url: routes.channelsPath(),
        method: 'POST',
        body: newChannel,
      }),
    }),
    editChannel: builder.mutation({
      query: ({ id, editedChannel }) => ({
        url: routes.getChannelPath(id),
        method: 'PATCH',
        body: editedChannel,
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: routes.getChannelPath(id),
        method: 'DELETE',
      }),
    }),
    getMessages: builder.query({
      query: () => routes.messagesPath(),
    }),
    addMessage: builder.mutation({
      query: (newMessage) => ({
        url: routes.messagesPath(),
        method: 'POST',
        body: newMessage,
      }),
    }),
    editMessage: builder.mutation({
      query: ({ id, editedMessage }) => ({
        url: routes.getMessagePath(id),
        method: 'PATCH',
        body: editedMessage,
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginMutation,
  useGetChannelsQuery,
  useAddChannelMutation,
  useEditChannelMutation,
  useRemoveChannelMutation,
  useGetMessagesQuery,
  useAddMessageMutation,
  useEditMessageMutation,
} = api;
export default api;
