import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaFacebookF,
  FaInstagram,
  FaTiktok
} from "react-icons/fa";

export default function Contact() {
  const cards = [
    {
      icon: <FaWhatsapp />,
      title: "WhatsApp",
      subtitle: "Chat with us instantly",
      value: "+94 70 696 3617",
      color: "from-green-500 to-green-600",
      link: "https://wa.me/94706963617",
      button: "Chat Now"
    },
    {
      icon: <FaPhoneAlt />,
      title: "Call Us",
      subtitle: "Speak directly",
      value: "076 418 4781",
      color: "from-blue-500 to-cyan-500",
      link: "tel:0764184781",
      button: "Call Now"
    },
    {
      icon: <FaFacebookF />,
      title: "Facebook",
      subtitle: "Follow Paradise",
      value: "Paradise Sweet House",
      color: "from-blue-600 to-indigo-600",
      link: "https://web.facebook.com/ParadiseSweetHouse/",
      button: "Visit Page"
    },
    {
      icon: <FaInstagram />,
      title: "Instagram",
      subtitle: "Latest Creations",
      value: "@paradise_sweet_house",
      color: "from-pink-500 to-purple-600",
      link: "https://www.instagram.com/paradise_sweet_house/",
      button: "Follow"
    }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100 py-24">

      {/* Background Glow */}

      <div className="absolute -top-40 -left-40 w-96 h-96 bg-green-300 blur-3xl rounded-full opacity-20 animate-pulse"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-200 blur-3xl rounded-full opacity-20 animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}

        <motion.div
          initial={{opacity:0,y:40}}
          whileInView={{opacity:1,y:0}}
          viewport={{once:true}}
          transition={{duration:.8}}
          className="text-center mb-20"
        >

          <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold">
            Contact Paradise Sweets Academy
          </span>

          <h1 className="text-5xl md:text-6xl font-black mt-8 text-gray-900">
            We'd Love To
            <span className="text-green-600"> Hear From You</span>
          </h1>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-6">
            Whether you have questions about our courses or need assistance,
            our team is always ready to help.
          </p>

        </motion.div>

        {/* Contact Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {cards.map((card,index)=>(

            <motion.a
              key={index}
              href={card.link}
              target="_blank"
              rel="noreferrer"
              initial={{opacity:0,y:60}}
              whileInView={{opacity:1,y:0}}
              viewport={{once:true}}
              transition={{delay:index*0.15}}
              whileHover={{
                y:-10,
                scale:1.03
              }}
              className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition border border-green-100"
            >

              <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${card.color} flex items-center justify-center text-white text-4xl mx-auto`}>

                {card.icon}

              </div>

              <h2 className="text-2xl font-bold text-center mt-6">
                {card.title}
              </h2>

              <p className="text-gray-500 text-center mt-3">
                {card.subtitle}
              </p>

              <p className="font-semibold text-center mt-4">
                {card.value}
              </p>

              <div
                className={`mt-8 text-center rounded-full py-3 text-white font-semibold bg-gradient-to-r ${card.color}`}
              >
                {card.button}
              </div>

            </motion.a>

          ))}

        </div>

        {/* Support Banner */}

        <motion.div
          initial={{opacity:0,y:50}}
          whileInView={{opacity:1,y:0}}
          viewport={{once:true}}
          transition={{duration:.8}}
          className="mt-24 rounded-[40px] bg-gradient-to-r from-green-600 to-green-500 text-white p-14 text-center shadow-2xl"
        >

          <h2 className="text-4xl font-black">
            Need Help Choosing a Course?
          </h2>

          <p className="mt-6 text-lg text-green-100">
            Contact us on WhatsApp and we'll help you choose the right course.
          </p>

          <a
            href="https://wa.me/94706963617"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 mt-10 bg-white text-green-600 px-8 py-4 rounded-full font-bold hover:scale-105 transition"
          >
            <FaWhatsapp className="text-2xl"/>
            Chat on WhatsApp
          </a>

        </motion.div>

        {/* Social Media */}

        <div className="flex justify-center gap-6 mt-20 text-4xl">

          <a
            href="https://web.facebook.com/ParadiseSweetHouse/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:scale-125 transition"
          >
            <FaFacebookF/>
          </a>

          <a
            href="https://www.instagram.com/paradise_sweet_house/"
            target="_blank"
            rel="noreferrer"
            className="text-pink-500 hover:scale-125 transition"
          >
            <FaInstagram/>
          </a>

          <a
            href="https://www.tiktok.com/@paradise_sweet_house"
            target="_blank"
            rel="noreferrer"
            className="text-black hover:scale-125 transition"
          >
            <FaTiktok/>
          </a>

        </div>

      </div>

    </section>
  );
}