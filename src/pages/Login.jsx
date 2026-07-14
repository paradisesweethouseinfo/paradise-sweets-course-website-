import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
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
      firebaseUser?.displayName ||
      "Student";

    const realStudentEmail =
      student.email ||
      firebaseUser?.email ||
      "";

    localStorage.setItem("studentLoggedIn", "true");
    localStorage.setItem("studentId", studentIdValue);
    localStorage.setItem("studentName", realStudentName);
    localStorage.setItem("studentEmail", realStudentEmail);

    localStorage.setItem(
      "studentCourses",
      JSON.stringify(
        Array.isArray(student.courses)
          ? student.courses
          : []
      )
    );
  };

  const handlePasswordLogin = async (event) => {
    event.preventDefault();

    setError("");
    setLoadingType("password");

    const cleanStudentId = studentId.trim();

    try {
      const internalEmail =
        `${cleanStudentId}@students.paradisesweetsacademy.com`;

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          internalEmail,
          password
        );

      const studentReference = doc(
        db,
        "students",
        cleanStudentId
      );

      const studentSnapshot =
        await getDoc(studentReference);

      if (!studentSnapshot.exists()) {
        await signOut(auth);
        setError("Student account was not found.");
        return;
      }

      const student = studentSnapshot.data();

      if (student.active !== true) {
        await signOut(auth);
        setError("Your account has been disabled.");
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
      console.error("Password login error:", err);

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

    provider.setCustomParameters({
      prompt: "select_account",
    });

    try {
      const userCredential =
        await signInWithPopup(auth, provider);

      const user = userCredential.user;

      const googleEmail =
        String(user.email || "")
          .trim()
          .toLowerCase();

      if (!googleEmail) {
        await signOut(auth);

        setError(
          "Google did not provide an email address."
        );

        return;
      }

      const studentQuery = query(
        collection(db, "students"),
        where("email", "==", googleEmail),
        limit(1)
      );

      const studentResults =
        await getDocs(studentQuery);

      if (studentResults.empty) {
        await signOut(auth);

        setError(
          `The Gmail account ${googleEmail} is not enrolled. Check that the same Gmail address was added in the Admin Panel.`
        );

        return;
      }

      const studentDocument =
        studentResults.docs[0];

      const student =
        studentDocument.data();

      if (student.loginMethod !== "google") {
        await signOut(auth);

        setError(
          "This student account is not configured for Google Login."
        );

        return;
      }

      if (student.active !== true) {
        await signOut(auth);

        setError(
          "Your student account has been disabled."
        );

        return;
      }

      if (
        student.uid &&
        student.uid !== user.uid
      ) {
        await signOut(auth);

        setError(
          "This Gmail account is already connected to another Firebase user."
        );

        return;
      }

      if (!student.uid) {
        await updateDoc(
          doc(
            db,
            "students",
            studentDocument.id
          ),
          {
            uid: user.uid,
          }
        );
      }

      const savedStudentId =
        student.studentId ||
        studentDocument.id;

      saveStudentSession(
        savedStudentId,
        {
          ...student,
          uid: user.uid,
        },
        user
      );

      navigate("/courses");
    } catch (err) {
      console.error("Google login error:", err);

      if (
        err.code === "auth/popup-closed-by-user"
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
        err.code === "auth/unauthorized-domain"
      ) {
        setError(
          "This website domain is not authorized in Firebase Authentication."
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
          "Firestore permission denied. Replace the Firestore Rules with the rules provided below."
        );
      } else {
        setError(
          err.message || "Google Sign-In failed."
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
          <div className="mb-4 break-words rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-red-700">
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
              onChange={(event) => {
                setStudentId(event.target.value);
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
              onChange={(event) => {
                setPassword(event.target.value);
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
          password. New students can use Google
          Sign-In.
        </p>
      </div>
    </div>
  );
}