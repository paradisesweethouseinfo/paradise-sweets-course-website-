import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import BasicCakeCourse from "./pages/BasicCakeCourse";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Pages with Navbar & Footer */}
        <Route element={<Layout />}>

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />

          {/* Student Protected Pages */}
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            }
          />

          <Route
            path="/courses/basic-cake"
            element={
              <ProtectedRoute>
                <BasicCakeCourse />
              </ProtectedRoute>
            }
          />

          {/* Admin Login */}
          <Route
            path="/admin"
            element={<AdminLogin />}
          />

          {/* Admin Dashboard */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <Admin />
              </AdminProtectedRoute>
            }
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}