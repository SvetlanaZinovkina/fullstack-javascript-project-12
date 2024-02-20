import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../routes/routes.js';

const baseQuery = fetchBaseQuery({
  baseUrl: routes.path(),
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    // const { token } = getState().auth;
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
        url: '/signup',
        method: 'POST',
        body: newUser,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getChannels: builder.query({
      query: () => '/channels',
    }),
    addChannel: builder.mutation({
      query: (newChannel) => ({
        url: '/channels',
        method: 'POST',
        body: newChannel,
      }),
    }),
    editChannel: builder.mutation({
      query: ({ id, editedChannel }) => ({
        url: `/channels/${id}`,
        method: 'PATCH',
        body: editedChannel,
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: `/channels/${id}`,
        method: 'DELETE',
      }),
    }),
    getMessages: builder.query({
      query: () => '/messages',
    }),
    addMessage: builder.mutation({
      query: (newMessage) => ({
        url: '/messages',
        method: 'POST',
        body: newMessage,
      }),
    }),
    editMessage: builder.mutation({
      query: ({ id, editedMessage }) => ({
        url: `/messages/${id}`,
        method: 'PATCH',
        body: editedMessage,
      }),
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        url: `/messages/${id}`,
        method: 'DELETE',
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
  useRemoveMessageMutation,
} = api;
export default api;
