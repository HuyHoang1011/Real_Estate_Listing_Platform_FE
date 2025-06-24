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
      <div className="text-2xl font-bold text-blue-600">
        <Link to={user.role === "admin" ? "/admin" : "/home"}>RealEstate</Link>
      </div>
      <ul className="flex space-x-6">
        {user.role !== "admin" ? (
          <>
            <li><Link to="/home" className="hover:text-blue-500 cursor-pointer">Home</Link></li>
            <li><Link to="/properties" className="hover:text-blue-500 cursor-pointer">Properties</Link></li>
            <li><Link to="/profile" className="hover:text-blue-500 cursor-pointer">Profile</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/admin" className="hover:text-blue-500 cursor-pointer">Admin Dashboard</Link></li>
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
