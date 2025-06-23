import api from './api';

export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);
export const refreshToken = (refreshToken) => api.post('/auth/refresh-token', { refresh_token: refreshToken });
export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};
