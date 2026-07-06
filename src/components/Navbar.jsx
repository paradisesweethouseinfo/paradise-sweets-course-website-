import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="Paradise Sweets Academy"
            className="h-12 md:h-14 w-auto"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-gray-700">

          <Link to="/" className="hover:text-green-600 transition">
            Home
          </Link>

          <Link to="/courses" className="hover:text-green-600 transition">
            Courses
          </Link>

          <Link to="/about" className="hover:text-green-600 transition">
            About
          </Link>

          <Link to="/contact" className="hover:text-green-600 transition">
            Contact
          </Link>

          <Link
            to="/login"
            className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition"
          >
            Student Login
          </Link>

        </nav>

        {/* Mobile Button */}

        <button
          className="md:hidden text-3xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>

      {/* Mobile Menu */}

      {menuOpen && (

        <div className="md:hidden bg-white border-t shadow-lg">

          <nav className="flex flex-col px-6 py-4 text-lg font-medium">

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="py-3 border-b hover:text-green-600"
            >
              Home
            </Link>

            <Link
              to="/courses"
              onClick={() => setMenuOpen(false)}
              className="py-3 border-b hover:text-green-600"
            >
              Courses
            </Link>

            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="py-3 border-b hover:text-green-600"
            >
              About
            </Link>

            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="py-3 border-b hover:text-green-600"
            >
              Contact
            </Link>

            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="mt-5 bg-green-600 text-white text-center py-3 rounded-full hover:bg-green-700 transition"
            >
              Student Login
            </Link>

          </nav>

        </div>

      )}

    </header>
  );
}