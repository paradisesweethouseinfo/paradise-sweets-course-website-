import { Link } from "react-router-dom";
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
  return (
    <footer className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-4 md:grid-cols-2 gap-12">

        {/* Logo */}

        <div>
          <img
            src="/logo.png"
            alt="Paradise Sweets Academy"
            className="w-40 mb-5"
          />

          <p className="text-green-100 leading-7">
            Paradise Sweets Academy is an online learning platform dedicated to
            teaching professional cake, bakery, and sweets making through
            high-quality video lessons.
          </p>

          <div className="flex gap-4 mt-6 text-2xl">

            <a
              href="https://web.facebook.com/ParadiseSweetHouse/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-300 transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.instagram.com/paradise_sweet_house/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-300 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.tiktok.com/@paradise_sweet_house"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-300 transition"
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

            <Link to="/" className="block hover:text-green-300">
              Home
            </Link>

            <Link to="/courses" className="block hover:text-green-300">
              Courses
            </Link>

            <Link to="/about" className="block hover:text-green-300">
              About
            </Link>

            <Link to="/contact" className="block hover:text-green-300">
              Contact
            </Link>

            <Link to="/login" className="block hover:text-green-300">
              Student Login
            </Link>

          </div>

        </div>

        {/* Courses */}

        <div>

          <h3 className="text-2xl font-bold mb-5">
            Courses
          </h3>

          <div className="space-y-3">

            <p>🟢 Basic Cake Course</p>

            <p className="text-gray-300">
              Advanced Cake Course (Coming Soon)
            </p>

            <p className="text-gray-300">
              Bakery Course (Coming Soon)
            </p>

            <p className="text-gray-300">
              Traditional Sweets (Coming Soon)
            </p>

          </div>

        </div>

        {/* Contact */}

        <div>

          <h3 className="text-2xl font-bold mb-5">
            Contact
          </h3>

          <div className="space-y-4">

            <div className="flex gap-3">
              <FaWhatsapp className="mt-1" />
              <span>+94 70 696 3617</span>
            </div>

            <div className="flex gap-3">
              <FaPhoneAlt className="mt-1" />
              <span>076 418 4781</span>
            </div>

            <div className="flex gap-3">
              <FaEnvelope className="mt-1" />
              <span>paradisesweetsacademy@gmail.com</span>
            </div>

            <div className="flex gap-3">
              <FaMapMarkerAlt className="mt-1" />
              <span>Sri Lanka</span>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-green-700">

        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-green-200">

          © 2026 Paradise Sweets Academy. All Rights Reserved.

          <br />

          Designed & Developed by Sanithu Udaneth.

        </div>

      </div>

    </footer>
  );
}