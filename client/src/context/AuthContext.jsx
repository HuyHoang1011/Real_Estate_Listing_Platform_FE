import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // userInfo: { username, role } hoặc null nếu chưa login
  const [user, setUser] = useState(null);

  // Hàm đăng nhập giả lập
  const login = (username, password) => {
    // Hardcode tài khoản
    if (username === "admin" && password === "admin") {
      setUser({ username: "admin", role: "admin" });
      return { success: true };
    }
    if (username === "user" && password === "123") {
      setUser({ username: "user", role: "user" });
      return { success: true };
    }
    return { success: false, message: "Invalid credentials" };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
