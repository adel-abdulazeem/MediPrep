import React, { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userRole: null,
    userId: null
  });
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedRole = localStorage.getItem("userRole");
    const storedUserId = localStorage.getItem("userId");

    if (storedAuth === "true") {
      setAuthState({
        isAuthenticated: true,
        userRole: storedRole,
        userId: storedUserId
      });
    }
  }, []);

  const login = (role, userId) => {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", role);
    localStorage.setItem("userId", userId);

    setAuthState({
      isAuthenticated: true,
      userRole: role,
      userId: userId,
    });
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    setAuthState({
      isAuthenticated: false,
      userRole: null,
      userId: null,
    });
  };
    // Value to be provided to consuming components
    const value = { authState, login, logout};

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};