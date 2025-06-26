import React, { useState } from 'react';
import { useGetPropertiesQuery, useDeletePropertyMutation } from '../../features/properties/propertiesApi';
import PropertyForm from '../components/PropertyForm';

export default function AdminProperties() {
  const { data: properties, isLoading, error } = useGetPropertiesQuery();
  const [deleteProperty] = useDeletePropertyMutation();

  const [editingProperty, setEditingProperty] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (property) => {
    setEditingProperty(property);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingProperty(null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn chắc chắn muốn xóa dự án này?')) {
      await deleteProperty(id);
    }
  };

  if (isLoading) return <p>Đang tải danh sách...</p>;
  if (error) return <p>Lỗi tải dữ liệu.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Quản lý Dự án Bất động sản</h2>
      <button onClick={handleAdd} className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Thêm dự án mới
      </button>

      {showForm && (
        <PropertyForm
          property={editingProperty}
          onClose={() => setShowForm(false)}
        />
      )}

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Tiêu đề</th>
            <th className="border border-gray-300 p-2">Giá</th>
            <th className="border border-gray-300 p-2">Diện tích</th>
            <th className="border border-gray-300 p-2">Loại</th>
            <th className="border border-gray-300 p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((prop) => (
            <tr key={prop.id}>
              <td className="border border-gray-300 p-2">{prop.title}</td>
              <td className="border border-gray-300 p-2">{prop.price} triệu</td>
              <td className="border border-gray-300 p-2">{prop.area} m²</td>
              <td className="border border-gray-300 p-2">{prop.type}</td>
              <td className="border border-gray-300 p-2 space-x-2">
                <button
                  onClick={() => handleEdit(prop)}
                  className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(prop.id)}
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
