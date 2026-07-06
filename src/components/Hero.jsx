import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100 pt-28 md:pt-36 pb-24">

      {/* Background Shapes */}

      <div className="absolute -top-40 -left-40 w-96 h-96 bg-green-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>

      <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      <div className="absolute bottom-20 left-20 w-56 h-56 bg-lime-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>

      <div className="absolute -bottom-32 right-0 w-[450px] h-[450px] bg-green-100 rounded-full blur-3xl opacity-40 animate-pulse"></div>

      {/* Background Pattern */}

      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px,#15803d 1px,transparent 0)",
            backgroundSize: "35px 35px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">

        {/* Academy Name */}

        <motion.span
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold tracking-wide shadow"
        >
          Paradise Sweets Academy
        </motion.span>

        {/* Heading */}

        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-8 text-4xl md:text-6xl font-black text-gray-900 leading-tight"
        >
          Master Professional
          <br />
          Cakes, Bakery &
          <span className="text-green-600"> Sweets</span>
        </motion.h1>

        {/* Description */}

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
          className="mt-8 flex justify-center items-center gap-2"
        >
          <span className="text-yellow-500 text-xl">
            ⭐⭐⭐⭐⭐
          </span>

          <span className="text-gray-600">
            Professional Online Academy
          </span>
        </motion.div>

        {/* Buttons */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .6 }}
          className="flex flex-wrap justify-center gap-5 mt-10"
        >

          <Link
            to="/courses"
            className="bg-green-600 text-white px-8 py-4 rounded-full font-semibold shadow-2xl hover:bg-green-700 hover:scale-110 hover:shadow-green-300 transition duration-300"
          >
            Explore Courses
          </Link>

          <Link
            to="/login"
            className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-full font-semibold hover:bg-green-600 hover:text-white hover:scale-110 hover:shadow-xl transition duration-300"
          >
            Student Login
          </Link>

        </motion.div>

      </div>

    </section>
  );
}