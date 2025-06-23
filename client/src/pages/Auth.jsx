import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';


export function LoginForm({ onSuccess }) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email không hợp lệ').required('Bắt buộc nhập email'),
      password: Yup.string().min(6, 'Mật khẩu ít nhất 6 ký tự').required('Bắt buộc nhập mật khẩu'),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setStatus(null);
      try {
        const user = await login(values.email, values.password);
        if (user.role === 'admin') {
          navigate('/admin', { replace: true });
        } else {
          navigate('/home', { replace: true });
        }
        onSuccess();
      } catch (error) {
        setStatus(error.message || 'Đăng nhập thất bại');
      }
      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {formik.status && (
        <p className="text-red-600 font-semibold bg-red-100 p-3 rounded">{formik.status}</p>
      )}
      <div>
        <input
          name="email"
          type="email"
          placeholder="Email"
          {...formik.getFieldProps('email')}
          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition ${
            formik.touched.email && formik.errors.email
              ? 'border-red-500 ring-red-500'
              : 'border-gray-300 ring-blue-500'
          }`}
        />
        {formik.touched.email && formik.errors.email ? (
          <p className="text-red-500 mt-1 text-sm">{formik.errors.email}</p>
        ) : null}
      </div>

      <div>
        <input
          name="password"
          type="password"
          placeholder="Mật khẩu"
          {...formik.getFieldProps('password')}
          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition ${
            formik.touched.password && formik.errors.password
              ? 'border-red-500 ring-red-500'
              : 'border-gray-300 ring-blue-500'
          }`}
        />
        {formik.touched.password && formik.errors.password ? (
          <p className="text-red-500 mt-1 text-sm">{formik.errors.password}</p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
      >
        {formik.isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </button>
    </form>
  );
}


export function RegisterForm({ onSuccess }) {
  const { register } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Bắt buộc nhập họ tên'),
      email: Yup.string().email('Email không hợp lệ').required('Bắt buộc nhập email'),
      password: Yup.string().min(6, 'Mật khẩu ít nhất 6 ký tự').required('Bắt buộc nhập mật khẩu'),
      phone: Yup.string()
        .matches(/^\d{10,15}$/, 'Số điện thoại không hợp lệ')
        .notRequired()
        .nullable(),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setStatus(null);
      try {
        await register(values);
        alert('Đăng ký thành công! Vui lòng đăng nhập.');
        navigate('/auth/login', { replace: true });
        onSuccess();
      } catch (error) {
        setStatus(error.message || 'Đăng ký thất bại');
      }
      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {formik.status && (
        <p className="text-red-600 font-semibold bg-red-100 p-3 rounded">{formik.status}</p>
      )}

      <div>
        <input
          name="name"
          type="text"
          placeholder="Họ tên"
          {...formik.getFieldProps('name')}
          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition ${
            formik.touched.name && formik.errors.name
              ? 'border-red-500 ring-red-500'
              : 'border-gray-300 ring-green-500'
          }`}
        />
        {formik.touched.name && formik.errors.name ? (
          <p className="text-red-500 mt-1 text-sm">{formik.errors.name}</p>
        ) : null}
      </div>

      <div>
        <input
          name="email"
          type="email"
          placeholder="Email"
          {...formik.getFieldProps('email')}
          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition ${
            formik.touched.email && formik.errors.email
              ? 'border-red-500 ring-red-500'
              : 'border-gray-300 ring-green-500'
          }`}
        />
        {formik.touched.email && formik.errors.email ? (
          <p className="text-red-500 mt-1 text-sm">{formik.errors.email}</p>
        ) : null}
      </div>

      <div>
        <input
          name="password"
          type="password"
          placeholder="Mật khẩu"
          {...formik.getFieldProps('password')}
          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition ${
            formik.touched.password && formik.errors.password
              ? 'border-red-500 ring-red-500'
              : 'border-gray-300 ring-green-500'
          }`}
        />
        {formik.touched.password && formik.errors.password ? (
          <p className="text-red-500 mt-1 text-sm">{formik.errors.password}</p>
        ) : null}
      </div>

      <div>
        <input
          name="phone"
          type="tel"
          placeholder="Số điện thoại (không bắt buộc)"
          {...formik.getFieldProps('phone')}
          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition ${
            formik.touched.phone && formik.errors.phone
              ? 'border-red-500 ring-red-500'
              : 'border-gray-300 ring-green-500'
          }`}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <p className="text-red-500 mt-1 text-sm">{formik.errors.phone}</p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
      >
        {formik.isSubmitting ? 'Đang đăng ký...' : 'Đăng ký'}
      </button>
    </form>
  );
}

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow-md">
      <div className="flex justify-center mb-8 space-x-4">
        <button
          onClick={() => setIsLogin(true)}
          className={`py-2 px-6 font-semibold rounded-md transition ${
            isLogin
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`py-2 px-6 font-semibold rounded-md transition ${
            !isLogin
              ? "bg-green-600 text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Register
        </button>
      </div>
      {isLogin ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}
