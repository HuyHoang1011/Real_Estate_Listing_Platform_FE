// src/hooks/useAuthLoad.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser, logout } from '../features/auth/authSlice';

export function useAuthLoad() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      dispatch(logout());
      return;
    }

    // Gọi API lấy thông tin user với token
    axios
      .get('http://localhost:3000/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(setUser({ user: response.data, token }));
      })
      .catch(() => {
        dispatch(logout());
      });
  }, [dispatch]);
}
