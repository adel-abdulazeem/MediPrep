import React, { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userRole: null,
  });
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedRole = localStorage.getItem("userRole");
    if (storedAuth === "true" && storedRole) {
      setAuthState({
        isAuthenticated: true,
        userRole: storedRole,
      });
    }
  }, []);

  const login = (role) => {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", role);
    setAuthState({
      isAuthenticated: true,
      userRole: role,
    });
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    setAuthState({
      isAuthenticated: false,
      userRole: null,
    });
  };
    // Value to be provided to consuming components
    const value = { ...authState, login, logout
    };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};