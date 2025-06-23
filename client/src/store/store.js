// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { propertiesApi } from '../features/properties/propertiesApi';
import { favoritesApi } from '../features/favorites/favoritesApi';
import { contactsApi } from '../features/contacts/contactsApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // RTK Query reducers tự động tạo
    [propertiesApi.reducerPath]: propertiesApi.reducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      // Kết hợp middleware RTK Query để hỗ trợ cache, refetch,...
      .concat(propertiesApi.middleware, favoritesApi.middleware, contactsApi.middleware),
});
