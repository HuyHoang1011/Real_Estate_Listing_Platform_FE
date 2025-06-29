// src/features/contacts/contactsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Contacts'],
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: (userId) => `/contacts?userId=${userId}`,
      providesTags: ['Contacts'],
    }),
    getAllContacts: builder.query({
      query: () => '/contacts',
      providesTags: ['Contacts'],
    }),
    createContact: builder.mutation({
      query: (contact) => ({
        url: '/contacts',
        method: 'POST',
        body: contact,
      }),
      invalidatesTags: ['Contacts'],
    }),
    updateContact: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/contacts/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['Contacts'],
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetAllContactsQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactsApi;
