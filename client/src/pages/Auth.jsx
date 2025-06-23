// src/pages/Auth.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Auth() {
  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow-md">
      <div className="flex justify-center mb-8 space-x-4">
        <Link
          to="/auth/login"
          className="py-2 px-6 font-semibold rounded-md bg-blue-600 text-white shadow-md hover:bg-blue-700 transition"
        >
          Login
        </Link>
        <Link
          to="/auth/register"
          className="py-2 px-6 font-semibold rounded-md bg-green-600 text-white shadow-md hover:bg-green-700 transition"
        >
          Register
        </Link>
      </div>

      {/* Outlet sẽ render LoginForm hoặc RegisterForm tùy route */}
      <Outlet />
    </div>
  );
}
