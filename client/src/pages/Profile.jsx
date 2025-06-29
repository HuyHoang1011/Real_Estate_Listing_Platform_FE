import React, { useState, useEffect } from 'react';
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from '../features/user/userApi';
import { useGetFavoritesQuery } from '../features/favorites/favoritesApi';
import PropertyCard from '../components/PropertyCard';

export default function Profile() {
  const { data: user, isLoading, isError } = useGetUserProfileQuery();
  const [updateUser, { isLoading: isUpdating, isSuccess, isError: updateError }] = useUpdateUserProfileMutation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: '', // URL avatar lấy từ DB
  });

  // Lấy danh sách favorite
  const { data: favorites, isLoading: isLoadingFavorites } = useGetFavoritesQuery();

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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Thông tin cá nhân</h2>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Avatar bên trái */}
        <div className="flex flex-col items-center space-y-4 w-40">
          <div className="w-40 h-40 rounded-full overflow-hidden border border-gray-300">
            {formData.avatar ? (
              <img
                src={formData.avatar}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
                Không có ảnh
              </div>
            )}
          </div>
        </div>

        {/* Thông tin bên phải */}
        <div className="flex-1 w-full space-y-4">
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
          <button
            type="submit"
            disabled={isUpdating}
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {isUpdating ? 'Đang cập nhật...' : 'Cập nhật'}
          </button>
          {isSuccess && <p className="text-green-600 mt-2">Cập nhật thành công!</p>}
          {updateError && <p className="text-red-600 mt-2">Cập nhật thất bại!</p>}
        </div>
      </form>

      {/* Favorite Properties Section */}
      <div className="mt-12">
        <h3 className="text-xl font-bold mb-4">Bất động sản yêu thích</h3>
        {isLoadingFavorites ? (
          <p>Đang tải danh sách yêu thích...</p>
        ) : favorites && favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favorites.map((fav) => fav.property && (
              <PropertyCard key={fav.propertyId} property={fav.property} hideFavorite />
            ))}
          </div>
        ) : (
          <p>Bạn chưa có bất động sản yêu thích nào.</p>
        )}
      </div>
    </div>
  );
}
