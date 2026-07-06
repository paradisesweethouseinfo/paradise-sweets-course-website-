import { Link } from "react-router-dom";

export default function Courses() {
  return (
    <section id="courses" className="bg-gray-50 py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold text-gray-900">
            Featured Courses
          </h2>

          <p className="text-gray-600 mt-4 text-lg">
            Start learning with our professional online courses.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Basic Cake Course */}

          <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:-translate-y-2 transition">

            <img
              src="/images/basic-cake.png"
              alt="Basic Cake Course"
              className="w-full h-56 object-cover"
            />

            <div className="p-6">

              <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                Available Now
              </span>

              <h3 className="text-2xl font-bold mt-4">
                Basic Cake Course
              </h3>

              <p className="text-gray-600 mt-3">
                8 Days of professional cake lessons for beginners.
              </p>

              <Link
                to="/courses/basic-cake"
                className="block mt-6 text-center bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition"
              >
                View Course
              </Link>

            </div>

          </div>

          {/* Coming Soon Cards */}

          {[
            "Advanced Cake Course",
            "Bakery Course",
            "Traditional Sweets",
          ].map((course) => (

            <div
              key={course}
              className="bg-white rounded-3xl shadow-lg p-8 flex flex-col justify-center items-center text-center hover:-translate-y-2 transition"
            >

              <div className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center text-6xl">
                🚧
              </div>

              <h3 className="text-2xl font-bold mt-6">
                {course}
              </h3>

              <p className="text-gray-500 mt-3">
                Coming Soon
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}