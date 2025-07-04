import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCreateUserMutation, useUpdateUserMutation, useGetAllUsersQuery } from '../../features/user/userApi';

export default function UserForm({ user, onClose }) {
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [serverError, setServerError] = useState('');
  const { data: existingUsers } = useGetAllUsersQuery();

  // Create validation schema based on whether we're editing or creating
  const userSchema = Yup.object({
    name: Yup.string().required('Bắt buộc nhập tên'),
    email: Yup.string().email('Email không hợp lệ').required('Bắt buộc nhập email'),
    password: user 
      ? Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').nullable().optional()
      : Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Bắt buộc nhập mật khẩu'),
    phone: Yup.string().nullable(),
    role: Yup.string().oneOf(['user', 'admin']).required('Bắt buộc chọn vai trò'),
  });

  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      password: '',
      phone: user?.phone || '',
      role: user?.role || 'user',
    },
    validationSchema: userSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setServerError(''); // Clear any previous errors
        
        // Check for duplicate email before submitting
        if (!user) { // Only check for new users
          const emailExists = existingUsers?.some(existingUser => 
            existingUser.email.toLowerCase() === values.email.toLowerCase()
          );
          
          if (emailExists) {
            setServerError('Email đã được sử dụng');
            setSubmitting(false);
            return;
          }
        }
        
        if (user) {
          // For updates, only send password if it's provided
          const updateData = { ...values };
          if (!updateData.password) {
            delete updateData.password;
          }
          await updateUser({ id: user.id, ...updateData }).unwrap();
        } else {
          await createUser(values).unwrap();
        }
        onClose();
      } catch (err) {
        console.error('Error saving user:', err);
        console.error('Error status:', err.status);
        console.error('Error data:', err.data);
        console.error('Error message:', err.message);
        
        // Handle specific error types
        if (err.status === 409) {
          setServerError('Email đã được sử dụng');
        } else if (err.data?.message) {
          setServerError(err.data.message);
        } else if (err.error?.message) {
          setServerError(err.error.message);
        } else if (err.message) {
          setServerError(err.message);
        } else {
          setServerError('Lỗi không xác định khi lưu người dùng');
        }
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="mb-4 p-4 border rounded shadow bg-gray-50">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Display server error if any */}
        {serverError && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {serverError}
          </div>
        )}

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
          name="password"
          type="password"
          placeholder={user ? "Mật khẩu mới (để trống nếu không thay đổi)" : "Mật khẩu"}
          value={formik.values.password}
          onChange={formik.handleChange}
          className="w-full px-3 py-2 border rounded"
        />
        {formik.errors.password && formik.touched.password && (
          <p className="text-red-600 text-sm">{formik.errors.password}</p>
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
            className="px-4 py-2 bg-cta text-white rounded hover:bg-cta-hover"
          >
            {user ? 'Cập nhật' : 'Thêm mới'}
          </button>
        </div>
      </form>
    </div>
  );
}
