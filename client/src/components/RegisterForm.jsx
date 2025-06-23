// src/components/RegisterForm.jsx
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", phone: "" },
    validationSchema: Yup.object({
      name: Yup.string().required("Bắt buộc nhập họ tên"),
      email: Yup.string().email("Email không hợp lệ").required("Bắt buộc nhập email"),
      password: Yup.string()
        .min(6, "Mật khẩu ít nhất 6 ký tự")
        .required("Bắt buộc nhập mật khẩu"),
      phone: Yup.string()
        .matches(/^\d{10,15}$/, "Số điện thoại không hợp lệ")
        .notRequired()
        .nullable(),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setStatus(null);
      try {
        const resultAction = await dispatch(registerUser(values));
        if (registerUser.fulfilled.match(resultAction)) {
          alert("Đăng ký thành công! Vui lòng đăng nhập.");
          navigate("/auth/login", { replace: true });
        } else {
          setStatus(resultAction.payload || "Đăng ký thất bại");
        }
      } catch (err) {
        setStatus("Đăng ký thất bại");
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
          name="name"
          type="text"
          placeholder="Họ tên"
          {...formik.getFieldProps("name")}
          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition ${
            formik.touched.name && formik.errors.name
              ? "border-red-500 ring-red-500"
              : "border-gray-300 ring-green-500"
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
          {...formik.getFieldProps("email")}
          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition ${
            formik.touched.email && formik.errors.email
              ? "border-red-500 ring-red-500"
              : "border-gray-300 ring-green-500"
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
              : "border-gray-300 ring-green-500"
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
          {...formik.getFieldProps("phone")}
          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition ${
            formik.touched.phone && formik.errors.phone
              ? "border-red-500 ring-red-500"
              : "border-gray-300 ring-green-500"
          }`}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <p className="text-red-500 mt-1 text-sm">{formik.errors.phone}</p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={formik.isSubmitting || loading}
        className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
      >
        {loading ? "Đang đăng ký..." : "Đăng ký"}
      </button>
    </form>
  );
}
