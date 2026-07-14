import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

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

function WebsiteLayout() {
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

        {/* Normal website pages with Navbar and Footer */}
        <Route element={<WebsiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />

          {/* Student protected pages */}
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
        </Route>

        {/* Admin login without Navbar and Footer */}
        <Route
          path="/admin"
          element={<AdminLogin />}
        />

        {/* Admin dashboard without Navbar and Footer */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <Admin />
            </AdminProtectedRoute>
          }
        />

        {/* Unknown pages return home */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}