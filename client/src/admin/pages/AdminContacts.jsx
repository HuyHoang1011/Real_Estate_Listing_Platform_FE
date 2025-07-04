import React, { useState } from 'react';
import { useGetAllContactsQuery, useUpdateContactMutation, useDeleteContactMutation } from '../../features/contacts/contactsApi';

export default function AdminContacts() {
  const { data: contacts, isLoading, error } = useGetAllContactsQuery();
  const [updateContact] = useUpdateContactMutation();
  const [deleteContact] = useDeleteContactMutation();
  const [selectedStatus, setSelectedStatus] = useState('');

  if (isLoading) return <p className="text-center mt-20">Đang tải danh sách liên hệ...</p>;
  if (error) return <p className="text-center mt-20 text-red-600">Lỗi tải dữ liệu. Vui lòng thử lại.</p>;

  const handleStatusUpdate = async (contactId, newStatus) => {
    try {
      await updateContact({ id: contactId, status: newStatus }).unwrap();
      alert('Cập nhật trạng thái thành công!');
    } catch (error) {
      alert('Có lỗi xảy ra khi cập nhật trạng thái.');
      console.error('Status update error:', error);
    }
  };

  const handleDelete = async (contactId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa yêu cầu liên hệ này?')) {
      try {
        await deleteContact(contactId).unwrap();
        alert('Xóa yêu cầu liên hệ thành công!');
      } catch (error) {
        alert('Có lỗi xảy ra khi xóa yêu cầu liên hệ.');
        console.error('Delete error:', error);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-primary/10 text-primary';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Chờ xử lý';
      case 'processing':
        return 'Đang xử lý';
      case 'completed':
        return 'Hoàn thành';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  const filteredContacts = selectedStatus 
    ? contacts?.filter(contact => contact.status === selectedStatus)
    : contacts;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Quản lý yêu cầu liên hệ</h1>
        
        {/* Filter by status */}
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Lọc theo trạng thái:</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="">Tất cả</option>
            <option value="pending">Chờ xử lý</option>
            <option value="processing">Đang xử lý</option>
            <option value="completed">Hoàn thành</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>
      </div>

      {filteredContacts?.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">Không có yêu cầu liên hệ nào.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Người liên hệ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bất động sản
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tin nhắn
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContacts?.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {contact.user?.name || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {contact.user?.email || 'N/A'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {contact.property?.title || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {contact.property?.price?.toLocaleString()} VND
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {contact.message}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(contact.status)}`}>
                        {getStatusText(contact.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {/* Status update dropdown */}
                        <select
                          value={contact.status}
                          onChange={(e) => handleStatusUpdate(contact.id, e.target.value)}
                          className="px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-primary focus:border-primary"
                        >
                          <option value="pending">Chờ xử lý</option>
                          <option value="processing">Đang xử lý</option>
                          <option value="completed">Hoàn thành</option>
                          <option value="cancelled">Đã hủy</option>
                        </select>
                        
                        {/* Delete button */}
                        <button
                          onClick={() => handleDelete(contact.id)}
                          className="text-red-600 hover:text-red-900 text-xs"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
} 