// src/components/LoginForm.jsx
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

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
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {formik.status && (
        <p className="text-red-600 font-semibold bg-red-100 p-3 rounded">{formik.status}</p>
      )}
      {error && <p className="text-red-600 font-semibold bg-red-100 p-3 rounded">{error}</p>}

      <div>
        <input
          name="email"
          type="email"
          placeholder="Email"
          {...formik.getFieldProps("email")}
          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition ${
            formik.touched.email && formik.errors.email
              ? "border-red-500 ring-red-500"
              : "border-gray-300 ring-blue-500"
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
          {...formik.getFieldProps("password")}
          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition ${
            formik.touched.password && formik.errors.password
              ? "border-red-500 ring-red-500"
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
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
      >
        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
    </form>
  );
}
