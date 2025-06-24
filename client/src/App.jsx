import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuthLoad } from './hooks/useAuthLoad';

import Auth from "./pages/Auth";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Home from "./pages/Home";
import AdminDashboard from "./admin/AdminDashboard";
import Navbar from "./components/Navbar";
import PropertyDetail from './pages/PropertyDetail';
import Profile from './pages/Profile';
import Properties from './pages/Properties';

export default function App() {
  useAuthLoad();  // load user khi app start

  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return (
      <Routes>
        <Route path="/auth" element={<Auth />}>
          <Route index element={<Navigate to="login" replace />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
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
            <Route path="/properties" element={<Properties />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
            <Route path="/profile" element={<Profile />} /> 
            <Route path="/properties/:id" element={<PropertyDetail />} />
          </>
        )}
      </Routes>
    </>
  );
}
