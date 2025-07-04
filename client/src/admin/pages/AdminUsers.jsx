import React, { useState } from 'react';
import { useGetAllUsersQuery, useDeleteUserMutation } from '../../features/user/userApi';
import UserForm from '../components/UserForm';

function UserSearchBar({ onSearch, onReset }) {
  const [keyword, setKeyword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ keyword });
  };
  const handleClear = () => {
    setKeyword('');
    onReset();
  };
  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input
        type="text"
        placeholder="Tìm kiếm theo tên hoặc email..."
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        className="px-3 py-2 border rounded w-64"
      />
      <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover">Tìm kiếm</button>
      <button type="button" onClick={handleClear} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">Xóa lọc</button>
    </form>
  );
}

export default function AdminUsers() {
  const [filters, setFilters] = useState({});
  const { data: users, isLoading, error } = useGetAllUsersQuery(filters);
  const [deleteUser] = useDeleteUserMutation();

  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn chắc chắn muốn xóa người dùng này?')) {
      try {
        await deleteUser(id).unwrap();
        // Success - the query will automatically refetch due to invalidatesTags
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Lỗi khi xóa người dùng: ' + (error.data?.message || error.message || 'Lỗi không xác định'));
      }
    }
  };

  const handleSearch = (searchFilters) => {
    setFilters(searchFilters);
  };
  const handleReset = () => {
    setFilters({});
  };

  if (isLoading) return <p>Đang tải danh sách người dùng...</p>;
  if (error) return <p>Lỗi tải dữ liệu người dùng.</p>;

  // Ensure users is always an array
  const userList = Array.isArray(users) ? users : [];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Quản lý Người dùng</h2>
      <UserSearchBar onSearch={handleSearch} onReset={handleReset} />
      <button onClick={handleAdd} className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Thêm người dùng mới
      </button>

      {showForm && (
        <UserForm
          user={editingUser}
          onClose={() => setShowForm(false)}
        />
      )}

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Tên</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Số điện thoại</th>
            <th className="border border-gray-300 p-2">Vai trò</th>
            <th className="border border-gray-300 p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((u) => (
            <tr key={u.id}>
              <td className="border border-gray-300 p-2">{u.name}</td>
              <td className="border border-gray-300 p-2">{u.email}</td>
              <td className="border border-gray-300 p-2">{u.phone || '-'}</td>
              <td className="border border-gray-300 p-2">{u.role}</td>
              <td className="border border-gray-300 p-2 space-x-2">
                <button
                  onClick={() => handleEdit(u)}
                  className="bg-primary text-white px-2 py-1 rounded hover:bg-primary-hover"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
