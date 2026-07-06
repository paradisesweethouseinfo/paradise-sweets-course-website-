import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100 pt-28 md:pt-36 pb-24">

      {/* Background Blobs */}
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-green-200 rounded-full blur-3xl opacity-30"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-40"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">

        {/* Academy Name */}

        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold tracking-wide"
        >
          Paradise Sweets Academy
        </motion.span>

        {/* Heading */}

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-8 text-4xl md:text-6xl font-black text-gray-900 leading-tight"
        >
          Master Professional
          <br />
          Cakes, Bakery &
          <span className="text-green-600"> Sweets</span>
        </motion.h1>

        {/* Subtitle */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .3 }}
          className="mt-8 max-w-3xl mx-auto text-lg md:text-xl text-gray-600 leading-8"
        >
          Learn professional baking through structured online lessons designed
          for beginners and aspiring cake artists.
        </motion.p>

        {/* Trust Badge */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .5 }}
          className="mt-8 flex justify-center items-center gap-2 text-yellow-500 text-xl"
        >
          ⭐⭐⭐⭐⭐
          <span className="text-gray-600 text-base">
            Professional Online Learning
          </span>
        </motion.div>

        {/* Buttons */}

        <motion.div
          initial={{ opacity:0,y:30 }}
          animate={{ opacity:1,y:0 }}
          transition={{ delay:.6 }}
          className="flex flex-wrap justify-center gap-5 mt-10"
        >

          <Link
            to="/courses"
            className="bg-green-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-green-700 hover:scale-105 transition duration-300"
          >
            Explore Courses
          </Link>

          <Link
            to="/login"
            className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-full font-semibold hover:bg-green-600 hover:text-white hover:scale-105 transition duration-300"
          >
            Student Login
          </Link>

        </motion.div>

        {/* Statistics */}

        <motion.div
          initial={{ opacity:0,y:40 }}
          animate={{ opacity:1,y:0 }}
          transition={{ delay:.9 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
        >

          <div className="bg-white rounded-3xl shadow-lg p-6 hover:-translate-y-2 transition">
            <h3 className="text-3xl font-black text-green-600">8</h3>
            <p className="mt-2 text-gray-600">Video Lessons</p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6 hover:-translate-y-2 transition">
            <h3 className="text-3xl font-black text-green-600">8 Days</h3>
            <p className="mt-2 text-gray-600">Course Duration</p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6 hover:-translate-y-2 transition">
            <h3 className="text-3xl font-black text-green-600">100%</h3>
            <p className="mt-2 text-gray-600">Online Learning</p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6 hover:-translate-y-2 transition">
            <h3 className="text-3xl font-black text-green-600">Beginner</h3>
            <p className="mt-2 text-gray-600">Friendly</p>
          </div>

        </motion.div>

      </div>

    </section>
  );
}