import { motion, useReducedMotion } from "framer-motion";

const features = [
  {
    icon: "▶",
    title: "HD Video Lessons",
    text: "Easy-to-follow, step-by-step professional video lessons.",
  },
  {
    icon: "📱",
    title: "Learn Anywhere",
    text: "Access your lessons on mobile, tablet or desktop.",
  },
  {
    icon: "🧁",
    title: "Practical Learning",
    text: "Learn by following real baking demonstrations.",
  },
  {
    icon: "⭐",
    title: "Beginner Friendly",
    text: "Designed for beginners with simple explanations.",
  },
];

const headingVariants = {
  hidden: {
    opacity: 0,
    y: 32,
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

const cardsContainerVariants = {
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
    y: 48,
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

export default function WhyChoose() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-white py-28">
      {/* Background glow */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-green-100 opacity-40 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-green-50 opacity-60 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
          className="mb-16 text-center"
          style={{
            willChange: "transform, opacity",
          }}
        >
          <span className="font-semibold uppercase tracking-widest text-green-600">
            Why Choose Us
          </span>

          <h2 className="mt-4 text-4xl font-black text-gray-900 md:text-5xl">
            Why Choose Paradise Sweets Academy?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Professional online baking education designed to help you learn
            with confidence from anywhere.
          </p>
        </motion.div>

        <motion.div
          variants={cardsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.12,
          }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -8,
                      scale: 1.02,
                    }
              }
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 22,
              }}
              className="rounded-3xl border border-green-100 bg-white p-8 text-center shadow-xl transition-shadow duration-300 md:hover:shadow-2xl"
              style={{
                willChange: "transform, opacity",
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
              }}
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
                {item.icon}
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-900">
                {item.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {item.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}