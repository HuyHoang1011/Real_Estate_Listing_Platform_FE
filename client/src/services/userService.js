import api from './api';

// Lấy thông tin profile user hiện tại
export const getProfile = () => api.get('/users/profile');

// Cập nhật thông tin user
export const updateProfile = (data) => api.put('/users/profile', data);

// Lấy danh sách người dùng (chỉ admin, nếu có API)
export const getUsers = () => api.get('/users');

// Khóa/mở khóa user (nếu có API)
export const toggleUserStatus = (userId, isActive) =>
  api.put(`/users/${userId}/status`, { isActive });
