import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!user) return null; // Hoặc render menu cho user chưa đăng nhập nếu cần

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-blue-600">
        <Link to={user.role === "admin" ? "/admin" : "/home"}>RealEstate</Link>
      </div>
      <ul className="flex space-x-6">
        {user.role !== "admin" && (
          <>
            <li>
              <Link to="/home" className="hover:text-blue-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/properties" className="hover:text-blue-500">
                Properties
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-blue-500">
                Profile
              </Link>
            </li>
            {/* Thêm menu khác cho user nếu cần */}
          </>
        )}
        {user.role === "admin" && (
          <>
            <li>
              <Link to="/admin" className="hover:text-blue-500">
                Admin Dashboard
              </Link>
            </li>
            {/* Thêm menu khác cho admin nếu cần */}
          </>
        )}
        <li>
          <button
            onClick={handleLogout}
            className="hover:text-red-500 font-semibold cursor-pointer bg-transparent border-none"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
