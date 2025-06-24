import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const favoriteApi = createApi({
  reducerPath: 'favoriteApi',
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
  tagTypes: ['Favorites'],
  endpoints: (builder) => ({
    addFavorite: builder.mutation({
      query: (propertyId) => ({
        url: '/favorites',
        method: 'POST',
        body: { propertyId },
      }),
      invalidatesTags: ['Favorites', 'Properties'],
    }),
    removeFavorite: builder.mutation({
      query: (propertyId) => ({
        url: `/favorites/${propertyId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Favorites', 'Properties'],
    }),
    getFavorites: builder.query({
      query: () => '/favorites',
      providesTags: ['Favorites'],
    }),
  }),
});

export const {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
  useGetFavoritesQuery,
} = favoriteApi;
