// src/components/LoginForm.jsx
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Email không hợp lệ").required("Bắt buộc nhập email"),
      password: Yup.string().min(6, "Mật khẩu ít nhất 6 ký tự").required("Bắt buộc nhập mật khẩu"),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setStatus(null);
      try {
        const resultAction = await dispatch(loginUser(values));
        if (loginUser.fulfilled.match(resultAction)) {
          // Điều hướng theo role
          if (resultAction.payload.user.role === "admin") {
            navigate("/admin", { replace: true });
          } else {
            navigate("/home", { replace: true });
          }
        } else {
          setStatus(resultAction.payload || "Đăng nhập thất bại");
        }
      } catch (err) {
        setStatus("Đăng nhập thất bại");
      }
      setSubmitting(false);
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6">Đăng nhập tài khoản</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {formik.status && (
          <div className="flex items-center gap-2 text-red-600 font-semibold bg-red-100 p-3 rounded">
            <span>❗</span>
            <span>{formik.status}</span>
          </div>
        )}
        {error && <div className="flex items-center gap-2 text-red-600 font-semibold bg-red-100 p-3 rounded"><span>❗</span><span>{error}</span></div>}

        <div className="relative">
          <input
            name="email"
            type="email"
            placeholder="Email"
            {...formik.getFieldProps("email")}
            className={`w-full pl-4 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition ${
              formik.touched.email && formik.errors.email
                ? "border-red-500 ring-red-500 text-red-600 placeholder-red-400"
                : "border-gray-300 ring-blue-500"
            }`}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-red-500 mt-1 text-sm">{formik.errors.email}</p>
          ) : null}
        </div>

        <div className="relative">
          <input
            name="password"
            type="password"
            placeholder="Mật khẩu"
            {...formik.getFieldProps("password")}
            className={`w-full pl-4 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition ${
              formik.touched.password && formik.errors.password
                ? "border-red-500 ring-red-500 text-red-600 placeholder-red-400"
                : "border-gray-300 ring-blue-500"
            }`}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="text-red-500 mt-1 text-sm">{formik.errors.password}</p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting || loading}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          {loading ? <span className="animate-spin mr-2">🔄</span> : null}
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
      <div className="mt-6 text-center text-sm text-gray-600">
        Chưa có tài khoản?{' '}
        <Link to="/auth/register" className="text-blue-600 hover:underline font-semibold">Đăng ký ngay</Link>
      </div>
    </div>
  );
}
