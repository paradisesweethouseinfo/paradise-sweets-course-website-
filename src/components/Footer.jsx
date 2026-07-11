import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);

  const handleLogoClick = () => {
    const newCount = clickCount + 1;

    if (newCount >= 5) {
      setClickCount(0);
      navigate("/admin");
    } else {
      setClickCount(newCount);

      setTimeout(() => {
        setClickCount(0);
      }, 3000);
    }
  };

  return (
    <footer className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-4 md:grid-cols-2 gap-12">

        {/* Academy Info */}
        <div>

          <img
            src="/logo.png"
            alt="Paradise Sweets Academy"
            onClick={handleLogoClick}
            className="w-44 mb-5 hover:scale-105 transition cursor-pointer select-none"
          />

          <p className="text-green-100 leading-7">
            Paradise Sweets Academy is Sri Lanka's online learning platform for
            professional Cake, Bakery and Traditional Sweets education through
            structured video lessons.
          </p>

          <div className="flex gap-5 mt-6 text-2xl">

            <a
              href="https://web.facebook.com/ParadiseSweetHouse/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-300 hover:scale-125 transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.instagram.com/paradise_sweet_house/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-300 hover:scale-125 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.tiktok.com/@paradise_sweet_house"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-300 hover:scale-125 transition"
            >
              <FaTiktok />
            </a>

          </div>

        </div>

        {/* Quick Links */}
        <div>

          <h3 className="text-2xl font-bold mb-5">
            Quick Links
          </h3>

          <div className="space-y-3">

            <Link to="/" className="block hover:text-green-300 transition">
              Home
            </Link>

            <Link to="/courses" className="block hover:text-green-300 transition">
              Courses
            </Link>

            <Link to="/about" className="block hover:text-green-300 transition">
              About
            </Link>

            <Link to="/contact" className="block hover:text-green-300 transition">
              Contact
            </Link>

            <Link to="/login" className="block hover:text-green-300 transition">
              Student Login
            </Link>

          </div>

        </div>

        {/* Courses */}
        <div>

          <h3 className="text-2xl font-bold mb-5">
            Our Courses
          </h3>

          <div className="space-y-3">

            <p>🎂 Basic Cake Course</p>

            <p className="text-gray-300">
              🍰 Advanced Cake Course <span className="italic">(Coming Soon)</span>
            </p>

            <p className="text-gray-300">
              🥖 Bakery Course <span className="italic">(Coming Soon)</span>
            </p>

            <p className="text-gray-300">
              🍬 Traditional Sweets <span className="italic">(Coming Soon)</span>
            </p>

          </div>

        </div>

        {/* Contact */}
        <div>

          <h3 className="text-2xl font-bold mb-5">
            Contact Us
          </h3>

          <div className="space-y-4">

            <div className="flex items-center gap-3">
              <FaWhatsapp className="text-green-400" />
              <span>+94 70 696 3617</span>
            </div>

            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-blue-300" />
              <span>076 418 4781</span>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-red-300" />
              <span>paradisesweetsacademy@gmail.com</span>
            </div>

            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-yellow-300" />
              <span>Sri Lanka</span>
            </div>

          </div>

        </div>

      </div>

      {/* Copyright */}

      <div className="border-t border-green-700">

        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-green-200 leading-8">

          <p>
            © 2026 <strong>Paradise Sweets Academy</strong>. All Rights Reserved.
          </p>

          <p className="text-sm mt-2">
            Paradise Sweets Academy is the educational platform of
            <strong> Paradise Sweet House.</strong>
          </p>

          <p className="text-sm mt-2">
            All course videos, learning materials, logos and website content are
            protected by copyright. Unauthorized copying, recording, sharing,
            redistribution or resale is strictly prohibited.
          </p>

          <p className="mt-5 text-green-300">
            Designed & Developed by <strong>Sanithu Udaneth</strong>
          </p>

        </div>

      </div>

    </footer>
  );
}