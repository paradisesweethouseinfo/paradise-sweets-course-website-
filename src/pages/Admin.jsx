import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaBook,
  FaVideo,
  FaBullhorn,
  FaCog,
  FaSignOutAlt,
  FaKey,
  FaChartBar,
} from "react-icons/fa";

export default function Admin() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="flex">

        {/* Sidebar */}

        <div className="w-72 bg-green-800 text-white min-h-screen p-6">

          <div className="text-center">

            <img
              src="/logo.png"
              className="w-24 mx-auto mb-4"
              alt=""
            />

            <h2 className="text-2xl font-bold">
              Paradise Sweets Academy
            </h2>

            <p className="text-green-200 mt-2">
              Administrator
            </p>

          </div>

          <div className="mt-10 space-y-5">

            <button className="flex items-center gap-3 hover:text-green-300">
              <FaChartBar />
              Dashboard
            </button>

            <button className="flex items-center gap-3 hover:text-green-300">
              <FaUsers />
              Students
            </button>

            <button className="flex items-center gap-3 hover:text-green-300">
              <FaBook />
              Courses
            </button>

            <button className="flex items-center gap-3 hover:text-green-300">
              <FaVideo />
              Videos
            </button>

            <button className="flex items-center gap-3 hover:text-green-300">
              <FaKey />
              Passwords
            </button>

            <button className="flex items-center gap-3 hover:text-green-300">
              <FaBullhorn />
              Announcements
            </button>

            <button className="flex items-center gap-3 hover:text-green-300">
              <FaCog />
              Settings
            </button>

          </div>

          <button
            onClick={logout}
            className="mt-16 flex items-center gap-3 bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl w-full justify-center"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

        {/* Main */}

        <div className="flex-1 p-10">

          <h1 className="text-4xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Welcome back, Administrator.
          </p>

          <div className="grid md:grid-cols-4 gap-6 mt-10">

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-gray-500">Students</h3>
              <p className="text-4xl font-bold mt-2">1</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-gray-500">Courses</h3>
              <p className="text-4xl font-bold mt-2">4</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-gray-500">Videos</h3>
              <p className="text-4xl font-bold mt-2">8</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-gray-500">Status</h3>
              <p className="text-2xl font-bold mt-2 text-green-600">
                Online
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}