import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

const contentContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 36,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeDown = {
  hidden: {
    opacity: 0,
    y: -24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100 pb-24 pt-28 md:pt-36">
      {/* Optimized animated background shapes */}

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-green-300 opacity-20 blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, 24, 0],
                y: [0, 16, 0],
                scale: [1, 1.06, 1],
              }
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-10 top-40 h-72 w-72 rounded-full bg-emerald-200 opacity-30 blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, -20, 0],
                y: [0, 24, 0],
                scale: [1, 1.08, 1],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-20 left-20 h-56 w-56 rounded-full bg-lime-200 opacity-20 blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, 18, 0],
                y: [0, -20, 0],
                scale: [1, 1.05, 1],
              }
        }
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 right-0 h-[450px] w-[450px] rounded-full bg-green-100 opacity-40 blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, -25, 0],
                y: [0, -15, 0],
                scale: [1, 1.04, 1],
              }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />

      {/* Background pattern */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #15803d 1px, transparent 0)",
            backgroundSize: "35px 35px",
          }}
        />
      </div>

      {/* Hero content */}

      <motion.div
        variants={contentContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-6xl px-6 text-center"
      >
        {/* Academy name */}

        <motion.span
          variants={fadeDown}
          className="inline-block rounded-full bg-green-100 px-5 py-2 font-semibold tracking-wide text-green-700 shadow"
          style={{
            willChange: "transform, opacity",
          }}
        >
          Paradise Sweets Academy
        </motion.span>

        {/* Heading */}

        <motion.h1
          variants={fadeUp}
          className="mt-8 text-4xl font-black leading-tight text-gray-900 md:text-6xl"
          style={{
            willChange: "transform, opacity",
          }}
        >
          Master Professional
          <br />
          Cakes, Bakery &amp;
          <span className="text-green-600"> Sweets</span>
        </motion.h1>

        {/* Description */}

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-600 md:text-xl"
          style={{
            willChange: "transform, opacity",
          }}
        >
          Learn professional baking through structured online lessons designed
          for beginners and aspiring cake artists.
        </motion.p>

        {/* Trust badge */}

        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-col items-center justify-center gap-2 sm:flex-row"
          style={{
            willChange: "transform, opacity",
          }}
        >
          <span
            className="text-xl text-yellow-500"
            aria-label="Five-star rating"
          >
            ⭐⭐⭐⭐⭐
          </span>

          <span className="text-gray-600">
            Professional Online Academy
          </span>
        </motion.div>

        {/* Buttons */}

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap justify-center gap-5"
          style={{
            willChange: "transform, opacity",
          }}
        >
          <Link
            to="/courses"
            className="rounded-full bg-green-600 px-8 py-4 font-semibold text-white shadow-xl transition duration-300 active:scale-95 md:hover:scale-105 md:hover:bg-green-700 md:hover:shadow-green-300"
          >
            Explore Courses
          </Link>

          <Link
            to="/login"
            className="rounded-full border-2 border-green-600 px-8 py-4 font-semibold text-green-600 transition duration-300 active:scale-95 md:hover:scale-105 md:hover:bg-green-600 md:hover:text-white md:hover:shadow-xl"
          >
            Student Login
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}