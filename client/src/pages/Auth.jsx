// src/pages/Auth.jsx
import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

export default function Auth() {
  const location = useLocation();
  const isLogin = location.pathname.endsWith("login");

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left: Image */}
      <div className="md:w-1/2 w-full h-64 md:h-auto flex items-center justify-center bg-white p-0">
        <img
          src="/images/4288146.jpg"
          alt="Hình minh họa đăng nhập"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Right: Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2 leading-tight">
            Hệ thống quản lý Bất Động Sản<br />
            Hàng đầu Việt Nam
          </h1>
          <p className="mb-6 text-gray-600 text-sm">Chào mừng bạn quay trở lại! Vui lòng đăng nhập vào tài khoản của bạn.</p>
          <div className="flex justify-start mb-8 space-x-4">
            <Link
              to="/auth/login"
              className={`py-2 px-6 font-semibold rounded-md border transition shadow-sm ${isLogin ? 'bg-primary text-white border-primary' : 'bg-white text-primary border-primary hover:bg-primary hover:text-white'}`}
            >
              Đăng nhập
            </Link>
            <Link
              to="/auth/register"
              className={`py-2 px-6 font-semibold rounded-md border transition shadow-sm ${!isLogin ? 'bg-primary text-white border-primary' : 'bg-white text-primary border-primary hover:bg-primary hover:text-white'}`}
            >
              Đăng ký
            </Link>
          </div>
          {/* Outlet will render LoginForm or RegisterForm depending on route */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
