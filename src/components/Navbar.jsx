import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Paradise Sweets Academy"
            className="h-14 w-auto"
          />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8 font-medium text-gray-700">

          <Link to="/" className="hover:text-green-600">
            Home
          </Link>

          <Link to="/courses" className="hover:text-green-600">
            Courses
          </Link>

          <Link to="/about" className="hover:text-green-600">
            About
          </Link>

          <Link to="/contact" className="hover:text-green-600">
            Contact
          </Link>

          <Link
            to="/login"
            className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700"
          >
            Student Login
          </Link>

        </nav>

      </div>
    </header>
  );
}