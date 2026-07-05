export default function CourseCard({ image, title, description }) {

    return (

        <div className="card overflow-hidden">

            <img
                src={image}
                className="w-full h-64 object-cover"
                alt={title}
            />

            <div className="p-7">

                <h3 className="text-2xl font-bold">

                    {title}

                </h3>

                <p className="text-gray-600 mt-4 leading-7">

                    {description}

                </p>

                <button className="btn btn-primary mt-6">

                    View Course

                </button>

            </div>

        </div>

    );

}