import React from 'react';
import AdminDashboard from './AdminDashboard';
import AdminProperties from './AdminProperties';
import AdminUsers from './AdminUsers';
import AdminContacts from './pages/AdminContacts';

export const adminRoutes = [
  {
    path: '',
    element: <AdminDashboard />,
  },
  {
    path: 'properties',
    element: <AdminProperties />,
  },
  {
    path: 'users',
    element: <AdminUsers />,
  },
  {
    path: 'contacts',
    element: <AdminContacts />,
  },
];
