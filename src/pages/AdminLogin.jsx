import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const cleanAdminId = adminId.trim().toLowerCase();

    try {
      const adminEmail =
        `${cleanAdminId}@paradisesweetsacademy.com`;

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          adminEmail,
          password
        );

      const adminRef = doc(
        db,
        "admins",
        cleanAdminId
      );

      const adminSnap = await getDoc(adminRef);

      if (!adminSnap.exists()) {
        await signOut(auth);
        setError("Admin ID was not found.");
        return;
      }

      const adminData = adminSnap.data();

      if (adminData.active !== true) {
        await signOut(auth);
        setError("This administrator account is disabled.");
        return;
      }

      if (adminData.uid !== userCredential.user.uid) {
        await signOut(auth);
        setError(
          "This Authentication account does not match the Admin ID."
        );
        return;
      }

      localStorage.setItem(
        "adminLoggedIn",
        "true"
      );

      localStorage.setItem(
        "adminId",
        cleanAdminId
      );

      localStorage.setItem(
        "adminName",
        adminData.name || "Administrator"
      );

      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Admin login error:", err);

      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/wrong-password" ||
        err.code === "auth/user-not-found"
      ) {
        setError("Incorrect Admin ID or password.");
      } else if (
        err.code === "auth/too-many-requests"
      ) {
        setError(
          "Too many login attempts. Please try again later."
        );
      } else if (
        err.code === "auth/network-request-failed"
      ) {
        setError(
          "Network error. Check your internet connection."
        );
      } else if (
        err.code === "permission-denied"
      ) {
        setError(
          "Firestore permission denied. Check your Firestore rules."
        );
      } else {
        setError(
          err.message || "Admin login failed."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 px-4 py-16">
      <div className="mx-auto w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

        <div className="mb-5 flex justify-center">
          <img
            src="/logo.png"
            alt="Paradise Sweets Academy"
            className="h-24 w-24 object-contain"
          />
        </div>

        <h1 className="text-center text-3xl font-bold text-gray-900">
          Admin Login
        </h1>

        <p className="mb-7 mt-2 text-center text-gray-500">
          Paradise Sweets Academy administration
        </p>

        {error && (
          <div className="mb-5 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleAdminLogin}
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="adminId"
              className="mb-2 block font-medium text-gray-700"
            >
              Admin ID
            </label>

            <input
              id="adminId"
              name="adminId"
              type="text"
              autoComplete="username"
              value={adminId}
              onChange={(e) => {
                setAdminId(e.target.value);
                setError("");
              }}
              placeholder="Enter Admin ID"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
              required
            />
          </div>

          <div>
            <label
              htmlFor="adminPassword"
              className="mb-2 block font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="adminPassword"
              name="adminPassword"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter password"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Verifying..."
              : "Login to Admin Panel"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Authorized administrators only
        </p>
      </div>
    </main>
  );
}