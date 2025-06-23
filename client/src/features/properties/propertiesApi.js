// src/features/properties/propertiesApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const propertiesApi = createApi({
  reducerPath: 'propertiesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['Properties'],
  endpoints: (builder) => ({
    getProperties: builder.query({
      query: ({ limit = 10, sort = 'newest' } = {}) =>
        `/properties?limit=${limit}&sort=${sort}`,
      providesTags: ['Properties'],
    }),
    getPropertyById: builder.query({
      query: (id) => `/properties/${id}`,
      providesTags: (result, error, id) => [{ type: 'Properties', id }],
    }),
    createProperty: builder.mutation({
      query: (newProperty) => ({
        url: '/properties',
        method: 'POST',
        body: newProperty,
      }),
      invalidatesTags: ['Properties'],
    }),
    updateProperty: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/properties/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['Properties'],
    }),
    deleteProperty: builder.mutation({
      query: (id) => ({
        url: `/properties/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Properties'],
    }),
  }),
});

export const {
  useGetPropertiesQuery,
  useGetPropertyByIdQuery,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
} = propertiesApi;
