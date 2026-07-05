import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import BasicCakeCourse from "./pages/BasicCakeCourse";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Pages */}
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

      </Routes>
    </BrowserRouter>
  );
}