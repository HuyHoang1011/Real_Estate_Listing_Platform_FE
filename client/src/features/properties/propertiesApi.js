// src/features/properties/propertiesApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const propertiesApi = createApi({
  reducerPath: 'propertiesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['Properties'],
  endpoints: (builder) => ({
    getProperties: builder.query({
      query: (params = {}) => {
        const { 
          limit = 10, 
          sort = 'newest', 
          keyword, 
          minPrice, 
          maxPrice, 
          minArea, 
          maxArea, 
          bedrooms, 
          propertyType,
          province,
          district,
          ward,
          page = 1
        } = params;
        const queryParams = new URLSearchParams();

        queryParams.append('limit', limit);
        queryParams.append('sort', sort);
        queryParams.append('page', page);

        if (keyword) queryParams.append('keyword', keyword);
        if (minPrice) queryParams.append('minPrice', minPrice);
        if (maxPrice) queryParams.append('maxPrice', maxPrice);
        if (minArea) queryParams.append('minArea', minArea);
        if (maxArea) queryParams.append('maxArea', maxArea);
        if (bedrooms) queryParams.append('bedrooms', bedrooms);
        if (propertyType) queryParams.append('propertyType', propertyType);
        if (province) queryParams.append('province', province);
        if (district) queryParams.append('district', district);
        if (ward) queryParams.append('ward', ward);

        return `/properties?${queryParams.toString()}`;
      },
      providesTags: ['Properties'],
      transformResponse: (response) => {
        // response: { data, total }
        return response;
      },
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
