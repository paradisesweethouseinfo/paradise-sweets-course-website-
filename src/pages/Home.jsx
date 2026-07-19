import { FaWhatsapp } from "react-icons/fa";
import Hero from "../components/Hero";
import Courses from "../components/Courses";
import WhyChoose from "../components/WhyChoose";

export default function Home() {
  return (
    <>
      <Hero />

      <WhyChoose />

      <Courses />

      {/* Floating WhatsApp Button */}

      <a
        href="https://wa.me/94706963617"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Paradise Sweets Academy on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-4xl text-white shadow-2xl transition-transform duration-300 active:scale-95 md:hover:scale-110 md:hover:bg-green-600"
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        <FaWhatsapp aria-hidden="true" />
      </a>
    </>
  );
}