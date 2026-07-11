import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      username === "admin" &&
      password === "#ParadiseAdmin2026"
    ) {
      localStorage.setItem("adminLoggedIn", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid Administrator Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 flex items-center justify-center px-4">

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">

        <div className="flex justify-center mb-6">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-24"
          />
        </div>

        <h1 className="text-3xl font-bold text-center text-green-700">
          Administrator Login
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Authorized Personnel Only
        </p>

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 rounded-lg p-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">

          <input
            type="text"
            placeholder="Administrator Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
          />

          <input
            type="password"
            placeholder="Administrator Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
          />

          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}