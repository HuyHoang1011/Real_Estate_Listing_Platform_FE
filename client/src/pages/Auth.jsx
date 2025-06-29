// src/pages/Auth.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Auth() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="flex justify-center mb-8 space-x-4">
          <Link
            to="/auth/login"
            className="py-2 px-6 font-semibold rounded-md bg-blue-600 text-white shadow-md hover:bg-blue-700 transition"
          >
            Đăng nhập
          </Link>
          <Link
            to="/auth/register"
            className="py-2 px-6 font-semibold rounded-md bg-green-600 text-white shadow-md hover:bg-green-700 transition"
          >
            Đăng ký
          </Link>
        </div>
        {/* Outlet sẽ render LoginForm hoặc RegisterForm tùy route */}
        <Outlet />
      </div>
    </div>
  );
}
