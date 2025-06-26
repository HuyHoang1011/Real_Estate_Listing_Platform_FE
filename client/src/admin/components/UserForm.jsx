import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCreateUserMutation, useUpdateUserMutation } from '../../features/user/userApi';

const userSchema = Yup.object({
  name: Yup.string().required('Bắt buộc nhập tên'),
  email: Yup.string().email('Email không hợp lệ').required('Bắt buộc nhập email'),
  phone: Yup.string().nullable(),
  role: Yup.string().oneOf(['user', 'admin']).required('Bắt buộc chọn vai trò'),
});

export default function UserForm({ user, onClose }) {
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      role: user?.role || 'user',
    },
    validationSchema: userSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (user) {
          await updateUser({ id: user.id, ...values }).unwrap();
        } else {
          await createUser(values).unwrap();
        }
        onClose();
      } catch (err) {
        alert('Lỗi khi lưu người dùng');
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="mb-4 p-4 border rounded shadow bg-gray-50">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Tên"
          value={formik.values.name}
          onChange={formik.handleChange}
          className="w-full px-3 py-2 border rounded"
        />
        {formik.errors.name && formik.touched.name && (
          <p className="text-red-600 text-sm">{formik.errors.name}</p>
        )}

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          className="w-full px-3 py-2 border rounded"
        />
        {formik.errors.email && formik.touched.email && (
          <p className="text-red-600 text-sm">{formik.errors.email}</p>
        )}

        <input
          name="phone"
          placeholder="Số điện thoại"
          value={formik.values.phone}
          onChange={formik.handleChange}
          className="w-full px-3 py-2 border rounded"
        />

        <select
          name="role"
          value={formik.values.role}
          onChange={formik.handleChange}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-200"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {user ? 'Cập nhật' : 'Thêm mới'}
          </button>
        </div>
      </form>
    </div>
  );
}
