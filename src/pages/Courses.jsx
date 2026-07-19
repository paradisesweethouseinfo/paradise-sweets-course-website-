import {
  motion,
  useReducedMotion,
} from "framer-motion";
import { Link } from "react-router-dom";

const COMING_SOON_COURSES = [
  "Advanced Cake",
  "Bakery Course",
  "Traditional Sweets",
];

const cardsContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 35,
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

function getPurchasedCourses() {
  try {
    const storedCourses =
      localStorage.getItem("studentCourses");

    const parsedCourses = JSON.parse(
      storedCourses || "[]"
    );

    return Array.isArray(parsedCourses)
      ? parsedCourses
      : [];
  } catch (error) {
    console.error(
      "Could not read student courses:",
      error
    );

    return [];
  }
}

export default function Courses() {
  const reduceMotion = useReducedMotion();

  const purchasedCourses =
    getPurchasedCourses();

  const studentName =
    localStorage.getItem("studentName") ||
    "Student";

  const hasBasicCakeCourse =
    purchasedCourses.includes("basic-cake");

  return (
    <section className="min-h-screen bg-green-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Page heading */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 30,
                }
          }
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-14 text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Welcome,
            <span className="text-green-600">
              {" "}
              {studentName}
            </span>
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Access your enrolled courses below.
          </p>
        </motion.div>

        {/* Course cards */}

        <motion.div
          variants={
            reduceMotion
              ? undefined
              : cardsContainerVariants
          }
          initial={
            reduceMotion
              ? false
              : "hidden"
          }
          animate={
            reduceMotion
              ? undefined
              : "visible"
          }
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {/* Basic Cake Course */}

          <motion.article
            variants={
              reduceMotion
                ? undefined
                : cardVariants
            }
            className="group overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 active:scale-[0.99] md:hover:-translate-y-2 md:hover:shadow-2xl"
            style={{
              willChange: reduceMotion
                ? "auto"
                : "transform, opacity",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="overflow-hidden bg-gray-100">
              <img
                src="/images/basic-cake.png"
                alt="Basic Cake Course"
                loading="lazy"
                decoding="async"
                className="h-56 w-full object-cover transition-transform duration-500 md:group-hover:scale-105"
              />
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                  Available
                </span>

                {hasBasicCakeCourse ? (
                  <span className="text-sm font-semibold text-green-600">
                    Enrolled
                  </span>
                ) : (
                  <span className="text-sm font-semibold text-gray-500">
                    Locked
                  </span>
                )}
              </div>

              <h2 className="mt-4 text-2xl font-bold text-gray-900">
                Basic Cake Course
              </h2>

              <p className="mt-3 text-gray-600">
                Learn cake making from beginner to
                professional.
              </p>

              <div className="mt-5 space-y-2 text-sm text-gray-500">
                <p>🎥 8 Days Video Lessons</p>
                <p>📱 Lifetime Access</p>
                <p>⭐ Beginner Friendly</p>
              </div>

              {hasBasicCakeCourse ? (
                <Link
                  to="/courses/basic-cake"
                  className="mt-6 block rounded-full bg-green-600 py-3 text-center font-semibold text-white transition-colors duration-200 active:bg-green-700 md:hover:bg-green-700"
                >
                  View Course
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  className="mt-6 block w-full cursor-not-allowed rounded-full bg-gray-400 py-3 font-semibold text-white"
                >
                  🔒 Locked
                </button>
              )}
            </div>
          </motion.article>

          {/* Coming Soon Courses */}

          {COMING_SOON_COURSES.map(
            (course) => (
              <motion.article
                key={course}
                variants={
                  reduceMotion
                    ? undefined
                    : cardVariants
                }
                className="flex min-h-[430px] flex-col items-center justify-center rounded-3xl bg-white p-8 text-center shadow-lg transition duration-300 active:scale-[0.99] md:hover:-translate-y-2 md:hover:shadow-2xl"
                style={{
                  willChange: reduceMotion
                    ? "auto"
                    : "transform, opacity",
                  transform:
                    "translateZ(0)",
                  backfaceVisibility:
                    "hidden",
                }}
              >
                <div
                  aria-hidden="true"
                  className="flex h-28 w-28 items-center justify-center rounded-full bg-green-100 text-6xl"
                >
                  🚧
                </div>

                <h2 className="mt-6 text-2xl font-bold text-gray-900">
                  {course}
                </h2>

                <p className="mt-4 text-gray-500">
                  Coming Soon
                </p>
              </motion.article>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}