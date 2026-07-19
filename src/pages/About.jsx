import {
  motion,
  useReducedMotion,
} from "framer-motion";

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

export default function About() {
  const reduceMotion = useReducedMotion();

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
      className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100 py-24"
    >
      {/* Background Blobs */}

      <div
        aria-hidden="true"
        className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-green-200/40 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-green-300/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl px-6">
        <motion.div
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
          className="rounded-[40px] bg-white p-8 shadow-2xl md:p-12"
          style={{
            willChange: reduceMotion
              ? "auto"
              : "transform, opacity",
            transform: "translateZ(0)",
          }}
        >
          <span className="font-semibold uppercase tracking-[0.3em] text-green-600">
            Paradise Sweets Academy
          </span>

          <h1 className="mt-4 text-4xl font-black text-gray-900 md:text-5xl">
            About Us
          </h1>

          <div className="mt-10 space-y-8 text-lg leading-8 text-gray-600">
            <p>
              Paradise Sweets Academy is a professional
              bakery training institute in Sri Lanka,
              created by the team behind the
              well-established Paradise Sweet House,
              with over 20 years of experience in the
              bakery and confectionery industry.
            </p>

            <p>
              Our academy is built on real industry
              knowledge, offering practical hands-on
              training in cake baking, decoration, and
              traditional Sri Lankan sweets. We share
              the same techniques used in a real bakery
              environment so students can confidently
              build professional skills.
            </p>

            <p>
              Whether you are a beginner or an
              experienced baker looking to improve your
              techniques, our structured courses guide
              you step by step toward becoming a
              confident professional.
            </p>
                      </div>

          {/* Feature Cards */}

          <motion.div
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
            whileInView={
              reduceMotion
                ? undefined
                : "visible"
            }
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="mt-12 grid gap-6 md:grid-cols-3"
          >
            <div className="rounded-3xl border border-green-100 bg-green-50 p-6 transition duration-300 active:scale-[0.99] md:hover:-translate-y-1 md:hover:shadow-lg">
              <div className="text-4xl" aria-hidden="true">
                🏆
              </div>

              <h2 className="mt-4 text-xl font-bold text-gray-900">
                20+ Years Experience
              </h2>

              <p className="mt-3 leading-7 text-gray-600">
                Learn from a team with more than two decades
                of experience in bakery and confectionery.
              </p>
            </div>

            <div className="rounded-3xl border border-green-100 bg-green-50 p-6 transition duration-300 active:scale-[0.99] md:hover:-translate-y-1 md:hover:shadow-lg">
              <div className="text-4xl" aria-hidden="true">
                🎂
              </div>

              <h2 className="mt-4 text-xl font-bold text-gray-900">
                Practical Training
              </h2>

              <p className="mt-3 leading-7 text-gray-600">
                Our lessons focus on practical skills,
                step-by-step techniques, and real bakery
                methods.
              </p>
            </div>

            <div className="rounded-3xl border border-green-100 bg-green-50 p-6 transition duration-300 active:scale-[0.99] md:hover:-translate-y-1 md:hover:shadow-lg">
              <div className="text-4xl" aria-hidden="true">
                👩‍🍳
              </div>

              <h2 className="mt-4 text-xl font-bold text-gray-900">
                Professional Guidance
              </h2>

              <p className="mt-3 leading-7 text-gray-600">
                Receive clear guidance designed to help
                beginners and developing bakers grow with
                confidence.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.main>
  );
}