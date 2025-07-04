import React from 'react';
import { useGetPropertiesQuery } from '../../features/properties/propertiesApi';
import { useGetAllUsersQuery } from '../../features/user/userApi';
import { useGetAllContactsQuery } from '../../features/contacts/contactsApi';

export default function AdminDashboard() {
  // Fetch summary data
  const { data: propData, isLoading: loadingProps } = useGetPropertiesQuery({ limit: 5, sort: 'newest' });
  const { data: users, isLoading: loadingUsers } = useGetAllUsersQuery();
  const { data: contacts, isLoading: loadingContacts } = useGetAllContactsQuery();

  const totalProperties = propData?.total || 0;
  const latestProperties = propData?.data || [];
  const totalUsers = Array.isArray(users) ? users.length : 0;
  const latestUsers = Array.isArray(users) ? users.slice(-5).reverse() : [];
  const totalContacts = Array.isArray(contacts) ? contacts.length : 0;
  const latestContacts = Array.isArray(contacts)
    ? [...contacts].sort((a, b) => (b.createdAt && a.createdAt ? new Date(b.createdAt) - new Date(a.createdAt) : 0)).slice(0, 5)
    : [];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Bảng điều khiển quản trị</h1>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-primary/10 rounded-lg p-6 flex flex-col items-center shadow border border-primary/20">
          <span className="text-4xl font-bold text-primary">{loadingProps ? '...' : totalProperties}</span>
          <span className="mt-2 text-primary font-semibold">Bất động sản</span>
        </div>
        <div className="bg-accent-light rounded-lg p-6 flex flex-col items-center shadow border border-accent">
          <span className="text-4xl font-bold text-accent">{loadingUsers ? '...' : totalUsers}</span>
          <span className="mt-2 text-accent font-semibold">Người dùng</span>
        </div>
        <div className="bg-cta/10 rounded-lg p-6 flex flex-col items-center shadow border border-cta/20">
          <span className="text-4xl font-bold text-cta">{loadingContacts ? '...' : totalContacts}</span>
          <span className="mt-2 text-cta font-semibold">Liên hệ</span>
        </div>
      </div>

      {/* Latest Properties, Users, Contacts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">BĐS mới nhất</h2>
          <div className="bg-accent-light rounded-lg shadow p-4 border border-accent">
            {loadingProps ? (
              <p>Đang tải...</p>
            ) : latestProperties.length === 0 ? (
              <p>Không có bất động sản nào.</p>
            ) : (
              <ul>
                {latestProperties.map((p) => (
                  <li key={p.id} className="mb-3 border-b border-accent pb-2 last:border-b-0 last:pb-0">
                    <span className="font-semibold">{p.title}</span> — {p.price} triệu, {p.area} m², {p.province}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Người dùng mới nhất</h2>
          <div className="bg-accent-light rounded-lg shadow p-4 border border-accent">
            {loadingUsers ? (
              <p>Đang tải...</p>
            ) : latestUsers.length === 0 ? (
              <p>Không có người dùng nào.</p>
            ) : (
              <ul>
                {latestUsers.map((u) => (
                  <li key={u.id} className="mb-3 border-b border-accent pb-2 last:border-b-0 last:pb-0">
                    <span className="font-semibold">{u.name}</span> — {u.email} ({u.role})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Liên hệ mới nhất</h2>
          <div className="bg-accent-light rounded-lg shadow p-4 border border-accent">
            {loadingContacts ? (
              <p>Đang tải...</p>
            ) : latestContacts.length === 0 ? (
              <p>Không có liên hệ nào.</p>
            ) : (
              <ul>
                {latestContacts.map((c) => (
                  <li key={c.id} className="mb-3 border-b border-accent pb-2 last:border-b-0 last:pb-0">
                    <span className="font-semibold">{c.user?.name || 'Ẩn danh'}</span> → <span className="font-semibold">{c.property?.title || 'BĐS đã xóa'}</span>
                    <br />
                    <span className="text-gray-600 text-sm">{c.message}</span>
                    <br />
                    <span className="text-xs text-gray-500">Trạng thái: {c.status || 'chưa xử lý'}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
