import CourseCard from "./CourseCard";

const courses = [

{
image:"/courses/basic.jpg",
title:"Basic Cake Course",
description:"Perfect for beginners who want to master baking."
},

{
image:"/courses/advanced.jpg",
title:"Advanced Cake Course",
description:"Professional decorating and advanced techniques."
},

{
image:"/courses/sweets.jpg",
title:"Traditional Sweets",
description:"Traditional and modern sweet making."
},

{
image:"/courses/bakery.jpg",
title:"Bakery Essentials",
description:"Bread, buns, pastries and bakery recipes."
}

];

export default function Courses(){

return(

<section id="courses" className="section bg-graybg">

<div className="container">

<h2 className="text-5xl font-bold text-center">

Featured Courses

</h2>

<p className="text-center text-gray-600 mt-5">

Choose your learning path.

</p>

<div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-16">

{

courses.map((course,index)=>

<CourseCard

key={index}

{...course}

/>

)

}

</div>

</div>

</section>

)

}