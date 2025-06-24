import React, { useState, useEffect } from 'react';
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from '../features/user/userApi';

export default function Profile() {
  const { data: user, isLoading, isError } = useGetUserProfileQuery();
  const [updateUser, { isLoading: isUpdating, isSuccess, isError: updateError }] = useUpdateUserProfileMutation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        avatar: user.avatar || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(formData).unwrap();
      alert('Cập nhật thông tin thành công!');
    } catch {
      alert('Cập nhật thất bại!');
    }
  };

  if (isLoading) return <p>Đang tải thông tin...</p>;
  if (isError) return <p>Lỗi tải thông tin người dùng</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Thông tin cá nhân</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Họ tên"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled
          className="w-full px-4 py-2 border rounded bg-gray-100 cursor-not-allowed"
        />
        <input
          name="phone"
          type="tel"
          placeholder="Số điện thoại"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Nếu muốn thêm avatar upload, có thể làm thêm input file */}
        <button
          type="submit"
          disabled={isUpdating}
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {isUpdating ? 'Đang cập nhật...' : 'Cập nhật'}
        </button>
        {isSuccess && <p className="text-green-600 mt-2">Cập nhật thành công!</p>}
        {updateError && <p className="text-red-600 mt-2">Cập nhật thất bại!</p>}
      </form>
    </div>
  );
}
