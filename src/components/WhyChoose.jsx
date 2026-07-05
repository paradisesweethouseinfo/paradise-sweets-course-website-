import { Award, Laptop, PlayCircle, Clock } from "lucide-react";

export default function WhyChoose(){

const items=[

{
icon:<Award size={42}/>,
title:"Professional Instructor"
},

{
icon:<Laptop size={42}/>,
title:"Study Anywhere"
},

{
icon:<PlayCircle size={42}/>,
title:"HD Video Lessons"
},

{
icon:<Clock size={42}/>,
title:"Lifetime Access"
}

];

return(

<section className="section">

<div className="container">

<h2 className="text-center text-5xl font-bold">

Why Choose Paradise?

</h2>

<div className="grid lg:grid-cols-4 gap-8 mt-16">

{

items.map((item,index)=>

<div key={index} className="card text-center p-10">

<div className="text-primary flex justify-center">

{item.icon}

</div>

<h3 className="mt-6 text-xl font-semibold">

{item.title}

</h3>

</div>

)

}

</div>

</div>

</section>

)

}