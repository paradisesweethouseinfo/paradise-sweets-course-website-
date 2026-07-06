import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import BasicCakeCourse from "./pages/BasicCakeCourse";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* All pages with Navbar */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />

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

      </Routes>
    </BrowserRouter>
  );
}