import api from './api';

export const createContact = (data) => api.post('/contacts', data);

// Nếu có API lấy yêu cầu liên hệ user hoặc admin
export const getUserContacts = () => api.get('/contacts/my');

export const getAllContacts = () => api.get('/contacts'); // Admin
