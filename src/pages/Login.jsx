import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function Login() {
  const navigate = useNavigate();

  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    alert("Step 1 - Login button clicked");
    console.log("Step 1");

    try {
      alert("Step 2 - Creating Firestore reference");
      console.log("Step 2");

      const studentRef = doc(db, "students", studentId);

      alert("Step 3 - Reading Firestore");
      console.log("Step 3");

      const studentSnap = await getDoc(studentRef);

      alert("Step 4 - Firestore replied");
      console.log("Step 4", studentSnap);

      if (!studentSnap.exists()) {
        setError("Student ID not found.");
        alert("Student document not found");
        return;
      }

      const student = studentSnap.data();

      alert("Step 5 - Student found");
      console.log(student);

      if (!student.active) {
        setError("Your account has been disabled.");
        alert("Account disabled");
        return;
      }

      if (student.password !== password) {
        setError("Incorrect password.");
        alert("Wrong password");
        return;
      }

      alert("Step 6 - Login successful");

      localStorage.setItem("studentLoggedIn", "true");
      localStorage.setItem("studentId", studentId);
      localStorage.setItem("studentName", student.name);
      localStorage.setItem(
        "studentCourses",
        JSON.stringify(student.courses || [])
      );

      navigate("/courses");

    } catch (err) {
      console.error("Firebase Error:", err);
      alert("ERROR: " + err.message);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

        <div className="flex justify-center mb-5">
          <img
            src="/logo.png"
            alt="Paradise Sweets Academy"
            className="w-24 h-24 object-contain"
          />
        </div>

        <h1 className="text-3xl font-bold text-center text-green-700">
          Student Login
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Welcome to Paradise Sweets Academy
        </p>

        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
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
              value={studentId}
              onChange={(e) => {
                setStudentId(e.target.value);
                setError("");
              }}
              placeholder="Enter Student ID"
              className="w-full border border-gray-300 rounded-xl px-4 py-3"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter Password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
          >
            Login
          </button>

        </form>

      </div>
    </div>
  );
}