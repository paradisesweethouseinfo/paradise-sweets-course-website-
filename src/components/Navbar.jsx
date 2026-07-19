import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

const NAV_LINKS = [
  {
    to: "/",
    label: "Home",
  },
  {
    to: "/courses",
    label: "Courses",
  },
  {
    to: "/about",
    label: "About",
  },
  {
    to: "/contact",
    label: "Contact",
  },
];

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    height: 0,
  },
  open: {
    opacity: 1,
    height: "auto",
  },
};

const mobileContentVariants = {
  closed: {
    opacity: 0,
    y: -10,
  },
  open: {
    opacity: 1,
    y: 0,
  },
};

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  const [menuOpen, setMenuOpen] = useState(false);
  const [studentLoggedIn, setStudentLoggedIn] =
    useState(false);
  const [studentName, setStudentName] =
    useState("");
  const [studentId, setStudentId] =
    useState("");
  const [loggingOut, setLoggingOut] =
    useState(false);

  useEffect(() => {
    const loggedIn =
      localStorage.getItem("studentLoggedIn") ===
      "true";

    setStudentLoggedIn(loggedIn);

    setStudentName(
      localStorage.getItem("studentName") ||
        "Student"
    );

    setStudentId(
      localStorage.getItem("studentId") || ""
    );

    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActiveLink = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  const handleStudentLogout = async () => {
    setLoggingOut(true);

    try {
      await signOut(auth);
    } catch (error) {
      console.error(
        "Student logout error:",
        error
      );
    } finally {
      localStorage.removeItem(
        "studentLoggedIn"
      );

      localStorage.removeItem("studentId");
      localStorage.removeItem("studentName");
      localStorage.removeItem(
        "studentCourses"
      );
      localStorage.removeItem(
        "studentEmail"
      );

      setStudentLoggedIn(false);
      setStudentName("");
      setStudentId("");
      setMenuOpen(false);
      setLoggingOut(false);

      navigate("/login");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        {/* Logo */}

        <Link
          to="/"
          aria-label="Paradise Sweets Academy home"
          className="flex items-center"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src="/logo.png"
            alt="Paradise Sweets Academy"
            decoding="async"
            draggable="false"
            className="h-16 w-auto object-contain transition-transform duration-300 active:scale-95 md:h-20 md:hover:scale-105"
          />
        </Link>

        {/* Desktop menu */}

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 font-medium text-gray-700 md:flex"
        >
          {NAV_LINKS.map((link) => {
            const active = isActiveLink(link.to);

            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative py-2 transition-colors duration-200 ${
                  active
                    ? "text-green-600"
                    : "hover:text-green-600"
                }`}
              >
                {link.label}

                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-green-600 transition-transform duration-300 ${
                    active
                      ? "w-full scale-x-100"
                      : "w-full origin-left scale-x-0"
                  }`}
                />
              </Link>
            );
          })}

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
                className="rounded-full border border-red-200 bg-red-50 px-5 py-2 font-semibold text-red-700 transition-colors duration-200 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loggingOut
                  ? "Logging out..."
                  : "Logout"}
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-green-600 px-5 py-2 text-white transition-colors duration-200 hover:bg-green-700"
            >
              Student Login
            </Link>
          )}
        </nav>

        {/* Mobile menu button */}

        <button
          type="button"
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() =>
            setMenuOpen(
              (currentMenuState) =>
                !currentMenuState
            )
          }
          className="relative flex h-11 w-11 items-center justify-center rounded-full text-gray-700 transition-colors duration-200 active:bg-gray-100 md:hidden"
        >
          <span className="sr-only">
            Toggle navigation menu
          </span>

          <span className="relative block h-5 w-6">
            <span
              className={`absolute left-0 top-0 block h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ${
                menuOpen
                  ? "translate-y-[9px] rotate-45"
                  : ""
              }`}
            />

            <span
              className={`absolute left-0 top-[9px] block h-0.5 w-6 rounded-full bg-current transition-opacity duration-200 ${
                menuOpen
                  ? "opacity-0"
                  : "opacity-100"
              }`}
            />

            <span
              className={`absolute left-0 top-[18px] block h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ${
                menuOpen
                  ? "-translate-y-[9px] -rotate-45"
                  : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu */}

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            variants={
              reduceMotion
                ? undefined
                : mobileMenuVariants
            }
            initial={
              reduceMotion
                ? false
                : "closed"
            }
            animate={
              reduceMotion
                ? undefined
                : "open"
            }
            exit={
              reduceMotion
                ? undefined
                : "closed"
            }
            transition={{
              duration: 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden border-t border-gray-100 bg-white shadow-lg md:hidden"
            style={{
              willChange:
                "height, opacity",
            }}
          >
            <motion.nav
              aria-label="Mobile navigation"
              variants={
                reduceMotion
                  ? undefined
                  : mobileContentVariants
              }
              initial={
                reduceMotion
                  ? false
                  : "closed"
              }
              animate={
                reduceMotion
                  ? undefined
                  : "open"
              }
              exit={
                reduceMotion
                  ? undefined
                  : "closed"
              }
              transition={{
                duration: 0.22,
                ease: "easeOut",
              }}
              className="flex flex-col px-6 py-4 text-lg font-medium"
            >
              {NAV_LINKS.map((link) => {
                const active =
                  isActiveLink(link.to);

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    className={`border-b border-gray-100 py-3 transition-colors duration-200 ${
                      active
                        ? "text-green-600"
                        : "text-gray-700 active:text-green-600"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

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
                    onClick={
                      handleStudentLogout
                    }
                    disabled={loggingOut}
                    className="w-full rounded-full border border-red-200 bg-red-50 py-3 text-center font-semibold text-red-700 transition-colors duration-200 active:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loggingOut
                      ? "Logging out..."
                      : "Logout"}
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="mt-5 rounded-full bg-green-600 py-3 text-center text-white transition-colors duration-200 active:bg-green-700"
                >
                  Student Login
                </Link>
              )}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}