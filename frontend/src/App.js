import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BlogList from "./components/BlogList";
import BlogPage from "./components/BlogPage";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateBlog from "./components/CreateBlog";
import EditBlog from "./components/EditBlog";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider, AuthContext } from "./context/AuthContext";


const ProtectedRoute = ({ children }) => {
  const { token } = React.useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
};


const AdminRoute = ({ children }) => {
  const { token, role } = React.useContext(AuthContext);
  return token && role === "admin" ? children : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Navbar />
          <div style={{ flexGrow: 1 }}>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <BlogList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/blog/:id"
                element={
                  <ProtectedRoute>
                    <BlogPage />
                  </ProtectedRoute>
                }
              />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route
                path="/create-blog"
                element={
                  <AdminRoute>
                    <CreateBlog />
                  </AdminRoute>
                }
              />
              <Route
                path="/edit-blog/:id"
                element={
                  <AdminRoute>
                    <EditBlog />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>

          <Footer /> 
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
