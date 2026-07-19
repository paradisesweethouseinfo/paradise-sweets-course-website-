import {
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  useRef,
  useState,
} from "react";

const LESSONS = [
  {
    day: "Day 01",
    video:
      "https://www.youtube.com/embed/3YHxr-kNPHM",
  },
  {
    day: "Day 02",
    video:
      "https://www.youtube.com/embed/3yybjhMuUFM",
  },
  {
    day: "Day 03",
    video:
      "https://www.youtube.com/embed/HDuCbD6XrRE",
  },
  {
    day: "Day 04",
    video:
      "https://www.youtube.com/embed/X_Xpa6auRng",
  },
  {
    day: "Day 05",
    video:
      "https://www.youtube.com/embed/koz23dzxmyI",
  },
  {
    day: "Day 06",
    video:
      "https://www.youtube.com/embed/YOUR_VIDEO_ID_6",
  },
  {
    day: "Day 07",
    video:
      "https://www.youtube.com/embed/YOUR_VIDEO_ID_7",
  },
  {
    day: "Day 08",
    video:
      "https://www.youtube.com/embed/YOUR_VIDEO_ID_8",
  },
];

const pageVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.35,
    },
  },
};

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 30,
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

const lessonListVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};

const lessonButtonVariants = {
  hidden: {
    opacity: 0,
    x: -15,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function BasicCakeCourse() {
  const reduceMotion = useReducedMotion();

  const [selectedLesson, setSelectedLesson] =
    useState(0);

  const videoSectionRef = useRef(null);

  const currentLesson =
    LESSONS[selectedLesson];

  const totalLessons = LESSONS.length;

  const selectLesson = (lessonIndex) => {
    setSelectedLesson(lessonIndex);

    window.setTimeout(() => {
      videoSectionRef.current?.scrollIntoView({
        behavior: reduceMotion
          ? "auto"
          : "smooth",
        block: "start",
      });
    }, 50);
  };

  return (
    <motion.main
      variants={
        reduceMotion
          ? undefined
          : pageVariants
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
      className="min-h-screen bg-gray-50 pb-20 pt-24 sm:pt-28 lg:pt-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        {/* Header */}

        <motion.header
          variants={
            reduceMotion
              ? undefined
              : sectionVariants
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
          className="mb-10"
        >
          <span className="font-semibold uppercase tracking-widest text-green-600">
            Paradise Sweets Academy
          </span>

          <h1 className="mt-3 text-4xl font-black text-gray-900 sm:text-5xl">
            Basic Cake Course
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-600">
            Welcome to the Basic Cake Course.
            Complete all eight lessons in order.
            Select any day from the lesson list to
            start learning.
          </p>

          <div className="mt-6 inline-flex items-center rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
            {currentLesson.day} of{" "}
            {totalLessons} lessons
          </div>
        </motion.header>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Lesson sidebar */}

          <motion.aside
            variants={
              reduceMotion
                ? undefined
                : sectionVariants
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
            aria-label="Course lessons"
            className="h-fit rounded-3xl bg-white p-6 shadow-xl lg:sticky lg:top-32"
            style={{
              willChange: reduceMotion
                ? "auto"
                : "transform, opacity",
              transform: "translateZ(0)",
            }}
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Course Lessons
              </h2>

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                {totalLessons} Days
              </span>
            </div>

            <motion.div
              variants={
                reduceMotion
                  ? undefined
                  : lessonListVariants
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
              className="space-y-3"
            >
              {LESSONS.map(
                (lesson, index) => {
                  const isSelected =
                    selectedLesson === index;

                  return (
                    <motion.button
                      key={lesson.day}
                      type="button"
                      variants={
                        reduceMotion
                          ? undefined
                          : lessonButtonVariants
                      }
                      onClick={() =>
                        selectLesson(index)
                      }
                      aria-current={
                        isSelected
                          ? "step"
                          : undefined
                      }
                      aria-label={`Open ${lesson.day}`}
                      className={`w-full rounded-2xl px-5 py-4 text-left font-semibold transition duration-200 active:scale-[0.98] ${
                        isSelected
                          ? "bg-green-600 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 md:hover:bg-green-100 md:hover:text-green-700"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className="mr-2"
                      >
                        🎥
                      </span>

                      {lesson.day}

                      {isSelected && (
                        <span className="float-right text-sm font-medium text-green-100">
                          Playing
                        </span>
                      )}
                    </motion.button>
                  );
                }
              )}
            </motion.div>
          </motion.aside>
                    {/* Video Section */}

          <motion.section
            ref={videoSectionRef}
            variants={
              reduceMotion
                ? undefined
                : sectionVariants
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
            className="lg:col-span-3"
            style={{
              willChange: reduceMotion
                ? "auto"
                : "transform, opacity",
              transform: "translateZ(0)",
            }}
          >
            <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
              <iframe
                key={currentLesson.video}
                loading="lazy"
                className="aspect-video w-full"
                src={`${currentLesson.video}?rel=0&modestbranding=1`}
                title={currentLesson.day}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />

              <div className="p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-4xl font-bold text-gray-900">
                      {currentLesson.day}
                    </h2>

                    <p className="mt-4 leading-8 text-gray-600">
                      Watch this lesson completely before
                      moving to the next lesson.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-green-50 px-5 py-4 text-center">
                    <p className="text-sm text-gray-500">
                      Progress
                    </p>

                    <p className="mt-1 text-xl font-bold text-green-600">
                      {selectedLesson + 1} / {totalLessons}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}

                <div className="mt-8 h-3 overflow-hidden rounded-full bg-gray-200">
                  <motion.div
                    initial={false}
                    animate={{
                      width: `${
                        ((selectedLesson + 1) /
                          totalLessons) *
                        100
                      }%`,
                    }}
                    transition={{
                      duration: reduceMotion
                        ? 0
                        : 0.4,
                    }}
                    className="h-full rounded-full bg-green-600"
                  />
                </div>

                {/* Navigation Buttons */}

                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    type="button"
                    disabled={selectedLesson === 0}
                    onClick={() =>
                      selectLesson(
                        selectedLesson - 1
                      )
                    }
                    className="rounded-full bg-gray-200 px-6 py-3 font-semibold transition duration-200 active:scale-[0.98] md:hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    ← Previous
                  </button>

                  <button
                    type="button"
                    disabled={
                      selectedLesson ===
                      totalLessons - 1
                    }
                    onClick={() =>
                      selectLesson(
                        selectedLesson + 1
                      )
                    }
                    className="rounded-full bg-green-600 px-6 py-3 font-semibold text-white transition duration-200 active:scale-[0.98] md:hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </motion.main>
  );
}