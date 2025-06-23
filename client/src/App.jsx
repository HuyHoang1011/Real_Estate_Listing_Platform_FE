import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Auth from "./pages/Auth"; // nếu dùng chung khung đăng nhập/register
import Login from './pages/Login';
import Register from './pages/Register';
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";

export default function App() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="/auth" element={<Auth />}>
          <Route index element={<Login />} />         {/* /auth */}
          <Route path="login" element={<Login />} />  {/* /auth/login */}
          <Route path="register" element={<Register />} /> {/* /auth/register */}
        </Route>
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        {user.role === "admin" ? (
          <>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </>
        ) : (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </>
        )}
      </Routes>
    </>
  );
}
