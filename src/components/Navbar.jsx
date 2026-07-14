import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [studentLoggedIn, setStudentLoggedIn] =
    useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const loggedIn =
      localStorage.getItem("studentLoggedIn") === "true";

    setStudentLoggedIn(loggedIn);
    setStudentName(
      localStorage.getItem("studentName") || "Student"
    );
    setStudentId(
      localStorage.getItem("studentId") || ""
    );

    setMenuOpen(false);
  }, [location.pathname]);

  const handleStudentLogout = async () => {
    setLoggingOut(true);

    try {
      await signOut(auth);
    } catch (error) {
      console.error("Student logout error:", error);
    } finally {
      localStorage.removeItem("studentLoggedIn");
      localStorage.removeItem("studentId");
      localStorage.removeItem("studentName");
      localStorage.removeItem("studentCourses");

      setStudentLoggedIn(false);
      setStudentName("");
      setStudentId("");
      setMenuOpen(false);
      setLoggingOut(false);

      navigate("/login");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src="/logo.png"
            alt="Paradise Sweets Academy"
            className="h-16 w-auto transition-transform duration-300 hover:scale-105 md:h-20"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-7 font-medium text-gray-700 md:flex">
          <Link
            to="/"
            className="transition hover:text-green-600"
          >
            Home
          </Link>

          <Link
            to="/courses"
            className="transition hover:text-green-600"
          >
            Courses
          </Link>

          <Link
            to="/about"
            className="transition hover:text-green-600"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="transition hover:text-green-600"
          >
            Contact
          </Link>

          {studentLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-2">
                <p className="text-xs font-medium text-gray-500">
                  Logged in as
                </p>

                <p className="max-w-40 truncate text-sm font-semibold text-green-700">
                  {studentName}
                </p>

                {studentId && (
                  <p className="text-xs text-gray-500">
                    ID: {studentId}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={handleStudentLogout}
                disabled={loggingOut}
                className="rounded-full border border-red-200 bg-red-50 px-5 py-2 font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-green-600 px-5 py-2 text-white transition hover:bg-green-700"
            >
              Student Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          className="text-3xl text-gray-700 md:hidden"
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t bg-white shadow-lg md:hidden">
          <nav className="flex flex-col px-6 py-4 text-lg font-medium">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="border-b py-3 transition hover:text-green-600"
            >
              Home
            </Link>

            <Link
              to="/courses"
              onClick={() => setMenuOpen(false)}
              className="border-b py-3 transition hover:text-green-600"
            >
              Courses
            </Link>

            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="border-b py-3 transition hover:text-green-600"
            >
              About
            </Link>

            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="border-b py-3 transition hover:text-green-600"
            >
              Contact
            </Link>

            {studentLoggedIn ? (
              <div className="mt-5 space-y-3">
                <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
                  <p className="text-sm text-gray-500">
                    Logged in as
                  </p>

                  <p className="font-bold text-green-700">
                    {studentName}
                  </p>

                  {studentId && (
                    <p className="mt-1 text-sm text-gray-500">
                      Student ID: {studentId}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleStudentLogout}
                  disabled={loggingOut}
                  className="w-full rounded-full border border-red-200 bg-red-50 py-3 text-center font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loggingOut ? "Logging out..." : "Logout"}
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="mt-5 rounded-full bg-green-600 py-3 text-center text-white transition hover:bg-green-700"
              >
                Student Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}