import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Courses() {
  return (
    <section
      id="courses"
      className="bg-gray-50 py-24"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.5,
          }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-900">
            Featured Courses
          </h2>

          <p className="text-gray-600 mt-4 text-lg">
            Start learning with our professional online courses.
          </p>
        </motion.div>

        {/* Cards */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.12,
          }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {/* Basic Cake */}

          <motion.div
            variants={cardVariants}
            className="overflow-hidden rounded-3xl bg-white shadow-lg transform-gpu transition-shadow duration-300 md:hover:-translate-y-2 md:hover:shadow-2xl"
            style={{
              willChange: "transform, opacity",
              transform: "translateZ(0)",
            }}
          >
            <img
              src="/images/basic-cake.png"
              alt="Basic Cake Course"
              loading="lazy"
              decoding="async"
              className="h-56 w-full object-cover transition-transform duration-500 md:hover:scale-105"
            />

            <div className="p-6">
              <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                Available Now
              </span>

              <h3 className="mt-4 text-2xl font-bold">
                Basic Cake Course
              </h3>

              <p className="mt-3 text-gray-600">
                8 Days of professional cake lessons for beginners.
              </p>

              <Link
                to="/courses/basic-cake"
                className="mt-6 block rounded-full bg-green-600 py-3 text-center text-white transition duration-300 active:scale-95 md:hover:bg-green-700"
              >
                View Course
              </Link>
            </div>
          </motion.div>

          {/* Coming Soon */}

          {[
            "Advanced Cake Course",
            "Bakery Course",
            "Traditional Sweets",
          ].map((course) => (
            <motion.div
              key={course}
              variants={cardVariants}
              className="flex flex-col items-center justify-center rounded-3xl bg-white p-8 text-center shadow-lg transform-gpu transition-shadow duration-300 md:hover:-translate-y-2 md:hover:shadow-2xl"
              style={{
                willChange: "transform, opacity",
                transform: "translateZ(0)",
              }}
            >
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-green-100 text-6xl">
                🚧
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                {course}
              </h3>

              <p className="mt-3 text-gray-500">
                Coming Soon
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}