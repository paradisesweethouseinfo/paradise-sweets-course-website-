import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Student Login Credentials
    if (studentId === "0001" && password === "#Admin2007") {
      // Save login status
      localStorage.setItem("studentLoggedIn", "true");

      // Optional: Save Student ID
      localStorage.setItem("studentId", studentId);

      // Redirect to Courses Page
      navigate("/courses");
    } else {
      setError("Invalid Student ID or Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

        {/* Logo */}
        <div className="flex justify-center mb-5">
          <img
            src="/logo.png"
            alt="Paradise Sweet Academy"
            className="w-24 h-24 object-contain"
          />
        </div>

        <h1 className="text-3xl font-bold text-center text-green-700">
          Student Login
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Welcome to Paradise Sweet Academy
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 border border-red-300 text-red-700 px-4 py-3">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Student ID
            </label>

            <input
              type="text"
              placeholder="Enter Student ID"
              value={studentId}
              onChange={(e) => {
                setStudentId(e.target.value);
                setError("");
              }}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition duration-300"
          >
            Login
          </button>

        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          Access is available only for enrolled students.
        </p>

      </div>
    </div>
  );
}