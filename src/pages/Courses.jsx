import { Link } from "react-router-dom";

export default function Courses() {
  return (
    <>
      

      <section className="bg-green-50 py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">
            <h1 className="text-5xl font-bold text-gray-900">
              Our Courses
            </h1>

            <p className="text-gray-600 mt-4 text-lg">
              Learn professional cake, bakery and sweets making from home.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Basic Cake Course */}

            <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:-translate-y-2 transition">

              <img
                src="/images/basic-cake.png"
                className="w-full h-56 object-cover"
                alt="Basic Cake Course"
              />

              <div className="p-6">

                <h2 className="text-2xl font-bold">
                  Basic Cake Course
                </h2>

                <p className="mt-3 text-gray-600">
                  Learn cake making from beginner to professional.
                </p>

                <div className="mt-5 space-y-2 text-sm text-gray-500">

                  <p>🎥 8 Days Video Lessons</p>

                  <p>📱 Lifetime Access</p>

                  <p>⭐ Beginner Friendly</p>

                </div>

                <Link
                  to="/courses/basic-cake"
                  className="block text-center mt-6 bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition"
                >
                  View Course
                </Link>

              </div>

            </div>

            {/* Coming Soon */}

            {[
              "Advanced Cake",
              "Bakery Course",
              "Traditional Sweets"
            ].map((course) => (

              <div
                key={course}
                className="bg-white rounded-3xl shadow-lg p-8 flex flex-col justify-center items-center text-center"
              >

                <div className="text-6xl mb-5">
                  🚧
                </div>

                <h2 className="text-2xl font-bold">
                  {course}
                </h2>

                <p className="text-gray-500 mt-4">
                  Coming Soon
                </p>

              </div>

            ))}

          </div>

        </div>
      </section>

    </>
  );
}