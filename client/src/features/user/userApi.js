// src/features/user/userApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('access_token');
        console.log('Token from localStorage:', token);
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
            console.log('Authorization header set:', `Bearer ${token}`);
        } else {
            console.log('No token found in localStorage');
        }
        return headers;
    },
});

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery,
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUserProfile: builder.query({
            query: () => '/users/me',
            providesTags: ['User'],
        }),
        getAllUsers: builder.query({
            query: () => '/users',
            providesTags: ['User'],
        }),
        updateUserProfile: builder.mutation({
            query: (data) => ({
                url: '/users/me',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        createUser: builder.mutation({
            query: (newUser) => ({
                url: '/users',       // endpoint backend tạo user (cần có)
                method: 'POST',
                body: newUser,
            }),
            invalidatesTags: ['User'],
        }),
        // Thêm endpoint cập nhật user (không phải profile, update theo id)
        updateUser: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `/users/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: ['User'],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const { useGetUserProfileQuery, useGetAllUsersQuery, useUpdateUserProfileMutation, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } = userApi;
