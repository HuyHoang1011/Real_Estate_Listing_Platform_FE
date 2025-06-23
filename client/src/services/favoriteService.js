import api from './api';

export const addFavorite = (propertyId) => api.post('/favorites', { propertyId });

export const removeFavorite = (propertyId) => api.delete(`/favorites/${propertyId}`);

export const getFavorites = () => api.get('/favorites');

