import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./components/auth/AuthContext";
import Signup from "./components/auth/Signup"
import Login from "./components/auth/Login"
import Logout from "./components/auth/Logout";
import ProtectedRoute from "./components/auth/ProtectedRoute"
import MediForm from './components/medication/MediForm'
import Layout from './components/Layout'

import Home from "./components/Home"
function App() {
  return (
    <AuthProvider>
        <Router>
          <Routes>
          <Route path="/mediForm" 
            element={
              <Layout>
                <MediForm/>
              </Layout>              
              } 
            />

            <Route path="/" 
            element={
              <Layout>
                <Home/>
              </Layout>              
              } 
            />

            <Route path="/login" 
            element={
              <Layout>
                <Login/>
              </Layout>
              }/>

            <Route
                path="/signup"
                element={
                  <ProtectedRoute>
                    <Signup />
                  </ProtectedRoute>
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

              <Route path="*" element={<Home/>} />
          </Routes>
        </Router>
      </AuthProvider>
  )
}
export default App
