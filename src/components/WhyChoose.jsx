import { motion } from "framer-motion";

const features = [
  {
    icon: "▶",
    title: "HD Video Lessons",
    text: "Easy-to-follow, step-by-step professional video lessons."
  },
  {
    icon: "📱",
    title: "Learn Anywhere",
    text: "Access your lessons on mobile, tablet or desktop."
  },
  {
    icon: "🧁",
    title: "Practical Learning",
    text: "Learn by following real baking demonstrations."
  },
  {
    icon: "⭐",
    title: "Beginner Friendly",
    text: "Designed for beginners with simple explanations."
  }
];

export default function WhyChoose() {
  return (
    <section className="relative py-28 bg-white overflow-hidden">

      {/* Background Glow */}

      <div className="absolute -left-40 top-20 w-80 h-80 bg-green-100 rounded-full blur-3xl opacity-40"></div>

      <div className="absolute -right-32 bottom-0 w-96 h-96 bg-green-50 rounded-full blur-3xl opacity-60"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          className="text-center mb-16"
        >

          <span className="text-green-600 font-semibold tracking-widest uppercase">
            Why Choose Us
          </span>

          <h2 className="text-4xl md:text-5xl font-black mt-4 text-gray-900">
            Why Choose Paradise Sweets Academy?
          </h2>

          <p className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto">
            Professional online baking education designed to help you learn with confidence from anywhere.
          </p>

        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: .6,
                delay: index * .15
              }}
              whileHover={{
                y: -12,
                scale: 1.03
              }}
              className="bg-white rounded-3xl shadow-xl border border-green-100 p-8 text-center transition-all duration-300 hover:shadow-2xl"
            >

              <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center text-4xl">

                {item.icon}

              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-900">

                {item.title}

              </h3>

              <p className="mt-4 text-gray-600 leading-7">

                {item.text}

              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}