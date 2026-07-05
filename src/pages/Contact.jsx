import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-pink-50 via-green-50 to-white py-20 px-6">
      
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-green-700">
          Contact Paradise Sweet House
        </h1>
        <p className="text-gray-600 mt-3">
          We are always happy to help you with orders, classes, and inquiries.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

        {/* WhatsApp */}
        <motion.a
          whileHover={{ scale: 1.05 }}
          href="https://wa.me/94706963617"
          target="_blank"
          className="bg-green-500 text-white p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-bold">💬 WhatsApp</h2>
          <p className="mt-2">Chat with us instantly</p>
          <p className="mt-3 font-semibold">+94 70 696 3617</p>
        </motion.a>

        {/* Call */}
        <motion.a
          whileHover={{ scale: 1.05 }}
          href="tel:0764184781"
          className="bg-blue-500 text-white p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-bold">📞 Call Now</h2>
          <p className="mt-2">Speak directly with us</p>
          <p className="mt-3 font-semibold">076 418 4781</p>
        </motion.a>

      </div>

      {/* Social Media */}
      <div className="max-w-5xl mx-auto mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Follow Our Mother Brand
        </h2>

        <div className="flex flex-wrap justify-center gap-4">

          <a
            href="https://web.facebook.com/ParadiseSweetHouse/"
            target="_blank"
            className="bg-blue-600 text-white px-6 py-3 rounded-full shadow"
          >
            Facebook
          </a>

          <a
            href="https://www.instagram.com/paradise_sweet_house/"
            target="_blank"
            className="bg-pink-500 text-white px-6 py-3 rounded-full shadow"
          >
            Instagram
          </a>

          <a
            href="https://www.tiktok.com/@paradise_sweet_house"
            target="_blank"
            className="bg-black text-white px-6 py-3 rounded-full shadow"
          >
            TikTok
          </a>

        </div>
      </div>

    </section>
  );
}