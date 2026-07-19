import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";

const QUICK_LINKS = [
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
  {
    to: "/login",
    label: "Student Login",
  },
];

const COURSES = [
  {
    icon: "🎂",
    name: "Basic Cake Course",
    comingSoon: false,
  },
  {
    icon: "🍰",
    name: "Advanced Cake Course",
    comingSoon: true,
  },
  {
    icon: "🥖",
    name: "Bakery Course",
    comingSoon: true,
  },
  {
    icon: "🍬",
    name: "Traditional Sweets",
    comingSoon: true,
  },
];

export default function Footer() {
  const navigate = useNavigate();

  const [clickCount, setClickCount] = useState(0);

  const resetTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const handleLogoClick = () => {
    if (resetTimerRef.current) {
      window.clearTimeout(resetTimerRef.current);
    }

    const newCount = clickCount + 1;

    if (newCount >= 5) {
      setClickCount(0);
      navigate("/admin");
      return;
    }

    setClickCount(newCount);

    resetTimerRef.current = window.setTimeout(() => {
      setClickCount(0);
    }, 3000);
  };

  return (
    <footer className="mt-20 bg-gradient-to-r from-green-900 via-green-800 to-green-900 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Academy information */}

        <div>
          <button
            type="button"
            onClick={handleLogoClick}
            aria-label="Paradise Sweets Academy"
            className="mb-5 block cursor-pointer select-none rounded-xl outline-none transition-transform duration-300 active:scale-95 md:hover:scale-105"
          >
            <img
              src="/logo.png"
              alt="Paradise Sweets Academy"
              loading="lazy"
              decoding="async"
              draggable="false"
              className="w-44 object-contain"
            />
          </button>

          <p className="leading-7 text-green-100">
            Paradise Sweets Academy is Sri Lanka&apos;s online learning platform
            for professional Cake, Bakery and Traditional Sweets education
            through structured video lessons.
          </p>

          <div className="mt-6 flex gap-5 text-2xl">
            <a
              href="https://web.facebook.com/ParadiseSweetHouse/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Paradise Sweet House on Facebook"
              className="rounded-lg p-1 transition-transform duration-300 hover:text-blue-300 active:scale-95 md:hover:scale-110"
            >
              <FaFacebookF aria-hidden="true" />
            </a>

            <a
              href="https://www.instagram.com/paradise_sweet_house/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Paradise Sweet House on Instagram"
              className="rounded-lg p-1 transition-transform duration-300 hover:text-pink-300 active:scale-95 md:hover:scale-110"
            >
              <FaInstagram aria-hidden="true" />
            </a>

            <a
              href="https://www.tiktok.com/@paradise_sweet_house"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Paradise Sweet House on TikTok"
              className="rounded-lg p-1 transition-transform duration-300 hover:text-gray-300 active:scale-95 md:hover:scale-110"
            >
              <FaTiktok aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Quick links */}

        <div>
          <h3 className="mb-5 text-2xl font-bold">
            Quick Links
          </h3>

          <nav
            aria-label="Footer navigation"
            className="space-y-3"
          >
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block transition-colors duration-200 hover:text-green-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Courses */}

        <div>
          <h3 className="mb-5 text-2xl font-bold">
            Our Courses
          </h3>

          <div className="space-y-3">
            {COURSES.map((course) => (
              <p
                key={course.name}
                className={
                  course.comingSoon
                    ? "text-gray-300"
                    : "text-white"
                }
              >
                <span aria-hidden="true">
                  {course.icon}
                </span>{" "}
                {course.name}

                {course.comingSoon && (
                  <span className="italic">
                    {" "}
                    (Coming Soon)
                  </span>
                )}
              </p>
            ))}
          </div>
        </div>

        {/* Contact */}

        <div>
          <h3 className="mb-5 text-2xl font-bold">
            Contact Us
          </h3>

          <address className="space-y-4 not-italic">
            <a
              href="https://wa.me/94706963617"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 transition-colors duration-200 hover:text-green-300"
            >
              <FaWhatsapp
                className="shrink-0 text-green-400"
                aria-hidden="true"
              />

              <span>+94 70 696 3617</span>
            </a>

            <a
              href="tel:+94764184781"
              className="flex items-center gap-3 transition-colors duration-200 hover:text-blue-300"
            >
              <FaPhoneAlt
                className="shrink-0 text-blue-300"
                aria-hidden="true"
              />

              <span>076 418 4781</span>
            </a>

            <a
              href="mailto:paradisesweetsacademy@gmail.com"
              className="flex items-start gap-3 break-all transition-colors duration-200 hover:text-red-300"
            >
              <FaEnvelope
                className="mt-1 shrink-0 text-red-300"
                aria-hidden="true"
              />

              <span>
                paradisesweetsacademy@gmail.com
              </span>
            </a>

            <div className="flex items-center gap-3">
              <FaMapMarkerAlt
                className="shrink-0 text-yellow-300"
                aria-hidden="true"
              />

              <span>Sri Lanka</span>
            </div>
          </address>
        </div>
      </div>

      {/* Copyright */}

      <div className="border-t border-green-700">
        <div className="mx-auto max-w-7xl px-6 py-8 text-center leading-8 text-green-200">
          <p>
            © 2026{" "}
            <strong>
              Paradise Sweets Academy
            </strong>
            . All Rights Reserved.
          </p>

          <p className="mt-2 text-sm">
            Paradise Sweets Academy is the educational platform of
            <strong>
              {" "}
              Paradise Sweet House.
            </strong>
          </p>

          <p className="mt-2 text-sm">
            All course videos, learning materials, logos and website content
            are protected by copyright. Unauthorized copying, recording,
            sharing, redistribution or resale is strictly prohibited.
          </p>

          <p className="mt-5 text-green-300">
            Designed &amp; Developed by{" "}
            <strong>
              Sanithu Udaneth
            </strong>
          </p>
        </div>
      </div>
    </footer>
  );
}