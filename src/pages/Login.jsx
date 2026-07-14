import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

export default function Login() {
  const navigate = useNavigate();

  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loadingType, setLoadingType] = useState("");

  const saveStudentSession = (
    studentIdValue,
    student,
    firebaseUser = null
  ) => {
    const realStudentName =
      student.name ||
      student.studentName ||
      student.fullName ||
      firebaseUser?.displayName ||
      "Student";

    const studentEmail =
      student.email ||
      firebaseUser?.email ||
      "";

    localStorage.setItem(
      "studentLoggedIn",
      "true"
    );

    localStorage.setItem(
      "studentId",
      studentIdValue
    );

    localStorage.setItem(
      "studentName",
      realStudentName
    );

    localStorage.setItem(
      "studentEmail",
      studentEmail
    );

    localStorage.setItem(
      "studentCourses",
      JSON.stringify(
        Array.isArray(student.courses)
          ? student.courses
          : []
      )
    );
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoadingType("password");

    const cleanStudentId = studentId.trim();

    try {
      const loginEmail =
        `${cleanStudentId}@students.paradisesweetsacademy.com`;

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          loginEmail,
          password
        );

      const studentRef = doc(
        db,
        "students",
        cleanStudentId
      );

      const studentSnap =
        await getDoc(studentRef);

      if (!studentSnap.exists()) {
        await signOut(auth);
        setError(
          "Student account was not found."
        );
        return;
      }

      const student = studentSnap.data();

      if (student.active !== true) {
        await signOut(auth);
        setError(
          "Your account has been disabled."
        );
        return;
      }

      if (
        student.uid &&
        student.uid !== userCredential.user.uid
      ) {
        await signOut(auth);
        setError(
          "This account does not match the Student ID."
        );
        return;
      }

      saveStudentSession(
        cleanStudentId,
        student,
        userCredential.user
      );

      navigate("/courses");
    } catch (err) {
      console.error(
        "Password login error:",
        err
      );

      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        setError(
          "Incorrect Student ID or password."
        );
      } else if (
        err.code === "auth/too-many-requests"
      ) {
        setError(
          "Too many attempts. Please try again later."
        );
      } else if (
        err.code === "auth/network-request-failed"
      ) {
        setError(
          "Network error. Check your internet connection."
        );
      } else {
        setError(
          err.message || "Login failed."
        );
      }
    } finally {
      setLoadingType("");
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoadingType("google");

    const provider = new GoogleAuthProvider();

    try {
      const userCredential =
        await signInWithPopup(
          auth,
          provider
        );

      const user = userCredential.user;

      const studentRef = doc(
        db,
        "students",
        user.uid
      );

      const studentSnap =
        await getDoc(studentRef);

      if (!studentSnap.exists()) {
        await signOut(auth);

        setError(
          "Your Google account is not enrolled yet. Please contact Paradise Sweets Academy."
        );

        return;
      }

      const student = studentSnap.data();

      if (student.active !== true) {
        await signOut(auth);
        setError(
          "Your account has been disabled."
        );
        return;
      }

      const savedStudentId =
        student.studentId || user.uid;

      saveStudentSession(
        savedStudentId,
        student,
        user
      );

      navigate("/courses");
    } catch (err) {
      console.error(
        "Google login error:",
        err
      );

      if (
        err.code ===
        "auth/popup-closed-by-user"
      ) {
        setError(
          "Google Sign-In was cancelled."
        );
      } else if (
        err.code === "auth/popup-blocked"
      ) {
        setError(
          "The browser blocked the Google login window."
        );
      } else if (
        err.code ===
        "auth/account-exists-with-different-credential"
      ) {
        setError(
          "This email is already connected to another login method."
        );
      } else if (
        err.code ===
        "auth/network-request-failed"
      ) {
        setError(
          "Network error. Check your internet connection."
        );
      } else {
        setError(
          err.message ||
            "Google Sign-In failed."
        );
      }
    } finally {
      setLoadingType("");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-50 px-4 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

        <div className="mb-5 flex justify-center">
          <img
            src="/logo.png"
            alt="Paradise Sweets Academy"
            className="h-24 w-24 object-contain"
          />
        </div>

        <h1 className="text-center text-3xl font-bold text-green-700">
          Student Login
        </h1>

        <p className="mb-6 mt-2 text-center text-gray-500">
          Welcome to Paradise Sweets Academy
        </p>

        {error && (
          <div className="mb-4 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handlePasswordLogin}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="studentId"
              className="mb-2 block font-medium text-gray-700"
            >
              Student ID
            </label>

            <input
              id="studentId"
              name="studentId"
              type="text"
              autoComplete="username"
              placeholder="Enter Student ID"
              value={studentId}
              onChange={(e) => {
                setStudentId(e.target.value);
                setError("");
              }}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loadingType !== ""}
            className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loadingType === "password"
              ? "Signing in..."
              : "Login"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />

          <span className="text-sm text-gray-400">
            OR
          </span>

          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loadingType !== ""}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="text-xl font-bold text-blue-600">
            G
          </span>

          {loadingType === "google"
            ? "Connecting..."
            : "Continue with Google"}
        </button>

        <p className="mt-8 text-center text-sm text-gray-500">
          Existing students can use Student ID and
          password. New students should use Google
          Sign-In.
        </p>

      </div>
    </div>
  );
}