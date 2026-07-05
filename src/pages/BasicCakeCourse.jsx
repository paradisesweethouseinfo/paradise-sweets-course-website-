import { useState } from "react";
import Navbar from "../components/Navbar";

const lessons = [
  {
    day: "Day 01",
    video: "https://www.youtube.com/embed/3YHxr-kNPHM",
  },
  {
    day: "Day 02",
    video: "https://www.youtube.com/embed/3yybjhMuUFM",
  },
  {
    day: "Day 03",
    video: "https://www.youtube.com/embed/HDuCbD6XrRE",
  },
  {
    day: "Day 04",
    video: "https://www.youtube.com/embed/YOUR_VIDEO_ID_4",
  },
  {
    day: "Day 05",
    video: "https://www.youtube.com/embed/YOUR_VIDEO_ID_5",
  },
  {
    day: "Day 06",
    video: "https://www.youtube.com/embed/YOUR_VIDEO_ID_6",
  },
  {
    day: "Day 07",
    video: "https://www.youtube.com/embed/YOUR_VIDEO_ID_7",
  },
  {
    day: "Day 08",
    video: "https://www.youtube.com/embed/YOUR_VIDEO_ID_8",
  },
];

export default function BasicCakeCourse() {
  const [selectedLesson, setSelectedLesson] = useState(0);

  return (
    <>
      <Navbar />

      <section className="bg-gray-50 min-h-screen pt-32 pb-20">

        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}

          <div className="mb-10">

            <span className="text-green-600 font-semibold uppercase tracking-widest">
              Paradise Sweets Academy
            </span>

            <h1 className="text-5xl font-black mt-3">
              Basic Cake Course
            </h1>

            <p className="text-gray-600 mt-4 max-w-3xl text-lg leading-8">
              Welcome to the Basic Cake Course.
              Complete all eight lessons in order.
              Click any day from the sidebar to start learning.
            </p>

          </div>

          <div className="grid lg:grid-cols-4 gap-8">

            {/* Sidebar */}

            <div className="bg-white rounded-3xl shadow-xl p-6 h-fit">

              <h2 className="text-2xl font-bold mb-6">
                Course Lessons
              </h2>

              <div className="space-y-3">

                {lessons.map((lesson, index) => (

                  <button
                    key={index}
                    onClick={() => setSelectedLesson(index)}
                    className={`w-full text-left px-5 py-4 rounded-2xl transition font-semibold
                    ${
                      selectedLesson === index
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 hover:bg-green-100"
                    }`}
                  >
                    🎥 {lesson.day}
                  </button>

                ))}

              </div>

            </div>

            {/* Video Section */}

            <div className="lg:col-span-3">

              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

                <iframe
                  className="w-full aspect-video"
                  src={lessons[selectedLesson].video}
                  title={lessons[selectedLesson].day}
                  allowFullScreen
                ></iframe>

                <div className="p-8">

                  <h2 className="text-4xl font-bold">

                    {lessons[selectedLesson].day}

                  </h2>

                  <p className="text-gray-600 mt-5 leading-8">

                    Watch the complete lesson before continuing to the next day.

                  </p>

                  <div className="mt-8 flex gap-4 flex-wrap">

                    <button
                      disabled={selectedLesson === 0}
                      onClick={() =>
                        setSelectedLesson(selectedLesson - 1)
                      }
                      className="px-6 py-3 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-40"
                    >
                      ← Previous
                    </button>

                    <button
                      disabled={selectedLesson === lessons.length - 1}
                      onClick={() =>
                        setSelectedLesson(selectedLesson + 1)
                      }
                      className="px-6 py-3 rounded-full bg-green-600 text-white hover:bg-green-700 disabled:opacity-40"
                    >
                      Next →
                    </button>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}