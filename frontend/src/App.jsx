import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./components/auth/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute"
import Signup from "./components/auth/Signup"
import Login from "./components/auth/Login"
import Logout from "./components/auth/Logout";
import MediForm from './components/medication/MediForm'
import Layout from './components/Layout'

import Dashboard from "./components/adminActions/Dashboard"
import SearchMed from './components/medication/SearchMed'
function App() {
  const userRole = localStorage.getItem('userRole')
  return (
    <AuthProvider>
        <Router>
          <Routes>
          <Route path="/mediForm" 
            element={
              <ProtectedRoute>
              <Layout>
                <MediForm />
              </Layout>
            </ProtectedRoute>            
              } 
            />
            <Route path="/dashboard" 
            element={
              <ProtectedRoute>
              <Layout>
                {userRole === 'admin'? <Dashboard /> : null}
              </Layout>
            </ProtectedRoute>             
              } 
            />
            <Route
                path="/signup"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Signup />
                    </Layout>
                  </ProtectedRoute>
                }/>
                <Route
                path="/login"
                element={
                  <Layout>
                    <Login />
                  </Layout>
                }/>
              <Route
                path="/logout"
                element={
                <ProtectedRoute>
                  <Layout>
                    <Logout />
                  </Layout>
                </ProtectedRoute>
                }/>
              <Route path="*" 
              element={
              <Layout>
                <SearchMed/>
              </Layout>
              } 
              />
          </Routes>
        </Router>
      </AuthProvider>
  )
}
export default App
