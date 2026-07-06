import { FaWhatsapp } from "react-icons/fa";
import Hero from "../components/Hero";
import Courses from "../components/Courses";
import WhyChoose from "../components/WhyChoose";

export default function Home(){

return(

<>



<Hero />

<WhyChoose />

<Courses />

<a
  href="https://wa.me/94706963617"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white text-4xl shadow-2xl hover:bg-green-600 hover:scale-110 transition-all duration-300"
>
  <FaWhatsapp />
</a>

</>

)

}