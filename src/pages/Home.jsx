import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Courses from "../components/Courses";
import WhyChoose from "../components/WhyChoose";

export default function Home(){

return(

<>

<Navbar/>

<Hero/>

<Courses/>

<WhyChoose/>

<a

href="https://wa.me/94706963617"

target="_blank"

className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white text-3xl shadow-xl hover:scale-110 transition"

>

💬

</a>

</>

)

}