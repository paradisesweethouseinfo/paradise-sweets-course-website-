import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="pt-36 pb-24 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-green-600 font-semibold tracking-wider uppercase">
            Paradise Sweets Academy
          </span>

          <h1 className="text-6xl font-black mt-5 leading-tight text-gray-900">
            Learn Professional
            <br />
            Cakes, Bakery &
            <span className="text-green-600"> Sweets</span>
          </h1>

          <p className="mt-8 text-gray-600 text-lg leading-8">
            Premium online lessons designed for beginners and professionals.
            Learn from anywhere with organized video lessons and lifetime access.
          </p>

          <div className="flex gap-5 mt-10">
            <Link
              to="/courses"
              className="bg-green-600 text-white px-8 py-4 rounded-full hover:bg-green-700 transition"
            >
              Explore Courses
            </Link>

            <Link
              to="/login"
              className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-full hover:bg-green-600 hover:text-white transition"
            >
              Student Login
            </Link>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
        >
          <img
            src="/images/hero-cake.png"
            alt="Paradise Sweets Academy"
            className="w-full rounded-3xl shadow-2xl"
          />
        </motion.div>

      </div>
    </section>
  );
}