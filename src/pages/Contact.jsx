import {
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";

const CONTACT_CARDS = [
  {
    icon: FaWhatsapp,
    title: "WhatsApp",
    subtitle: "Chat with us instantly",
    value: "+94 70 696 3617",
    color: "from-green-500 to-green-600",
    link: "https://wa.me/94706963617",
    button: "Chat Now",
    ariaLabel: "Chat with Paradise Sweets Academy on WhatsApp",
  },
  {
    icon: FaPhoneAlt,
    title: "Call Us",
    subtitle: "Speak directly",
    value: "076 418 4781",
    color: "from-blue-500 to-cyan-500",
    link: "tel:+94764184781",
    button: "Call Now",
    ariaLabel: "Call Paradise Sweets Academy",
  },
  {
    icon: FaFacebookF,
    title: "Facebook",
    subtitle: "Follow Paradise",
    value: "Paradise Sweet House",
    color: "from-blue-600 to-indigo-600",
    link: "https://web.facebook.com/ParadiseSweetHouse/",
    button: "Visit Page",
    ariaLabel: "Visit Paradise Sweet House on Facebook",
  },
  {
    icon: FaInstagram,
    title: "Instagram",
    subtitle: "Latest Creations",
    value: "@paradise_sweet_house",
    color: "from-pink-500 to-purple-600",
    link: "https://www.instagram.com/paradise_sweet_house/",
    button: "Follow",
    ariaLabel: "Follow Paradise Sweet House on Instagram",
  },
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

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 35,
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

export default function Contact() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100 py-24">
      {/* Optimized background glows */}

      <motion.div
        aria-hidden="true"
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0.15,
                scale: 0.95,
              }
        }
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: 0.22,
                scale: 1,
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-green-300 blur-3xl"
        style={{
          willChange: reduceMotion
            ? "auto"
            : "transform, opacity",
          transform: "translateZ(0)",
        }}
      />

      <motion.div
        aria-hidden="true"
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0.15,
                scale: 1,
              }
        }
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: 0.22,
                scale: 0.96,
              }
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-green-200 blur-3xl"
        style={{
          willChange: reduceMotion
            ? "auto"
            : "transform, opacity",
          transform: "translateZ(0)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}

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
            amount: 0.25,
          }}
          className="mb-20 text-center"
        >
          <span className="inline-block rounded-full bg-green-100 px-5 py-2 font-semibold text-green-700">
            Contact Paradise Sweets Academy
          </span>

          <h1 className="mt-8 text-5xl font-black text-gray-900 md:text-6xl">
            We&apos;d Love To
            <span className="text-green-600">
              {" "}
              Hear From You
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Whether you have questions about our courses or need assistance,
            our team is always ready to help.
          </p>
        </motion.div>

        {/* Contact cards */}

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
          whileInView={
            reduceMotion
              ? undefined
              : "visible"
          }
          viewport={{
            once: true,
            amount: 0.12,
          }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {CONTACT_CARDS.map((card) => {
            const Icon = card.icon;

            return (
              <motion.a
                key={card.title}
                href={card.link}
                target={
                  card.link.startsWith("http")
                    ? "_blank"
                    : undefined
                }
                rel={
                  card.link.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                aria-label={card.ariaLabel}
                variants={
                  reduceMotion
                    ? undefined
                    : cardVariants
                }
                className="rounded-3xl border border-green-100 bg-white p-8 shadow-xl transition duration-300 active:scale-[0.98] md:hover:-translate-y-2 md:hover:scale-[1.02] md:hover:shadow-2xl"
                style={{
                  willChange: reduceMotion
                    ? "auto"
                    : "transform, opacity",
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden",
                }}
              >
                <div
                  className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r ${card.color} text-4xl text-white`}
                >
                  <Icon aria-hidden="true" />
                </div>

                <h2 className="mt-6 text-center text-2xl font-bold">
                  {card.title}
                </h2>

                <p className="mt-3 text-center text-gray-500">
                  {card.subtitle}
                </p>

                <p className="mt-4 text-center font-semibold">
                  {card.value}
                </p>

                <div
                  className={`mt-8 rounded-full bg-gradient-to-r ${card.color} py-3 text-center font-semibold text-white`}
                >
                  {card.button}
                </div>
              </motion.a>
            );
          })}
        </motion.div>
                {/* Support banner */}

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
          className="mt-24 rounded-[40px] bg-gradient-to-r from-green-600 to-green-500 p-10 text-center text-white shadow-2xl md:p-14"
          style={{
            willChange: reduceMotion
              ? "auto"
              : "transform, opacity",
            transform: "translateZ(0)",
          }}
        >
          <h2 className="text-4xl font-black">
            Need Help Choosing a Course?
          </h2>

          <p className="mt-6 text-lg text-green-100">
            Contact us on WhatsApp and we&apos;ll help you choose the right
            course.
          </p>

          <a
            href="https://wa.me/94706963617"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Paradise Sweets Academy on WhatsApp"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-bold text-green-600 transition-transform duration-300 active:scale-95 md:hover:scale-105"
          >
            <FaWhatsapp
              className="text-2xl"
              aria-hidden="true"
            />

            Chat on WhatsApp
          </a>
        </motion.div>

        {/* Social media */}

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
            amount: 0.3,
          }}
          className="mt-20 flex justify-center gap-6 text-4xl"
        >
          <a
            href="https://web.facebook.com/ParadiseSweetHouse/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Paradise Sweet House on Facebook"
            className="rounded-full p-2 text-blue-600 transition-transform duration-300 active:scale-95 md:hover:scale-110"
          >
            <FaFacebookF aria-hidden="true" />
          </a>

          <a
            href="https://www.instagram.com/paradise_sweet_house/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Paradise Sweet House on Instagram"
            className="rounded-full p-2 text-pink-500 transition-transform duration-300 active:scale-95 md:hover:scale-110"
          >
            <FaInstagram aria-hidden="true" />
          </a>

          <a
            href="https://www.tiktok.com/@paradise_sweet_house"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Paradise Sweet House on TikTok"
            className="rounded-full p-2 text-black transition-transform duration-300 active:scale-95 md:hover:scale-110"
          >
            <FaTiktok aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

