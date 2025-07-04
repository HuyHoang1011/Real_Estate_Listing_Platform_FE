import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  if (!user) return null;

  const handleLogout = () => dispatch(logout());

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center relative z-50" role="navigation" tabIndex={0}>
      <div className="text-2xl font-bold text-primary">
        <Link to={user.role === "admin" ? "/admin" : "/home"}>BĐS</Link>
      </div>
      <ul className="flex space-x-6">
        {user.role !== "admin" ? (
          <>
            <li><Link to="/home" className="hover:text-primary-hover cursor-pointer">Trang chủ</Link></li>
            <li><Link to="/properties" className="hover:text-primary-hover cursor-pointer">Bất động sản</Link></li>
            <li><Link to="/profile" className="hover:text-primary-hover cursor-pointer">Cá nhân</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/admin" className="hover:text-primary-hover cursor-pointer">Trang quản trị</Link></li>
            <li><Link to="/admin/properties" className="hover:text-primary-hover cursor-pointer">Quản lý BĐS</Link></li>
            <li><Link to="/admin/users" className="hover:text-primary-hover cursor-pointer">Quản lý người dùng</Link></li>
            <li><Link to="/admin/contacts" className="hover:text-primary-hover cursor-pointer">Quản lý liên hệ</Link></li>
          </>
        )}
        <li>
          <button
            onClick={handleLogout}
            className="hover:text-cta font-semibold cursor-pointer bg-transparent border-none"
          >
            Đăng xuất
          </button>
        </li>
      </ul>
    </nav>
  );
}
