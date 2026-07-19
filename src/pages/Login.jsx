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
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import { auth, db } from "../firebase/firebase";

const GOOGLE_PROVIDER = new GoogleAuthProvider();

GOOGLE_PROVIDER.setCustomParameters({
  prompt: "select_account",
});

const pageVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.35,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function saveStudentSession(
  studentIdValue,
  student,
  firebaseUser = null
) {
  const realStudentName =
    student.name ||
    firebaseUser?.displayName ||
    "Student";

  const realStudentEmail =
    student.email ||
    firebaseUser?.email ||
    "";

  const studentCourses = Array.isArray(
    student.courses
  )
    ? student.courses
    : [];

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
    realStudentEmail
  );

  localStorage.setItem(
    "studentCourses",
    JSON.stringify(studentCourses)
  );
}

function getPasswordLoginError(error) {
  if (
    error.code === "auth/invalid-credential" ||
    error.code === "auth/user-not-found" ||
    error.code === "auth/wrong-password"
  ) {
    return "Incorrect Student ID or password.";
  }

  if (error.code === "auth/too-many-requests") {
    return "Too many attempts. Please try again later.";
  }

  if (
    error.code === "auth/network-request-failed"
  ) {
    return "Network error. Check your internet connection.";
  }

  return error.message || "Login failed.";
}

function getGoogleLoginError(error) {
  if (
    error.code === "auth/popup-closed-by-user"
  ) {
    return "Google Sign-In was cancelled.";
  }

  if (error.code === "auth/popup-blocked") {
    return "The browser blocked the Google login window.";
  }

  if (
    error.code === "auth/unauthorized-domain"
  ) {
    return "This website domain is not authorized in Firebase Authentication.";
  }

  if (
    error.code === "auth/network-request-failed"
  ) {
    return "Network error. Check your internet connection.";
  }

  if (
    error.code === "permission-denied" ||
    error.code ===
      "firestore/permission-denied"
  ) {
    return "Firestore permission denied. Please check your Firestore security rules.";
  }

  return (
    error.message ||
    "Google Sign-In failed."
  );
}

export default function Login() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const [studentId, setStudentId] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] = useState("");

  const [loadingType, setLoadingType] =
    useState("");

  const isLoading = loadingType !== "";

  const handlePasswordLogin = async (
    event
  ) => {
    event.preventDefault();

    const cleanStudentId =
      studentId.trim();

    if (!cleanStudentId) {
      setError(
        "Please enter your Student ID."
      );

      return;
    }

    if (!password) {
      setError(
        "Please enter your password."
      );

      return;
    }

    setError("");
    setLoadingType("password");

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

        setError(
          "Student account was not found."
        );

        return;
      }

      const student =
        studentSnapshot.data();

      if (student.active !== true) {
        await signOut(auth);

        setError(
          "Your account has been disabled."
        );

        return;
      }

      if (
        student.loginMethod &&
        student.loginMethod !== "password"
      ) {
        await signOut(auth);

        setError(
          "This student account is configured for Google Login."
        );

        return;
      }

      if (
        student.uid &&
        student.uid !==
          userCredential.user.uid
      ) {
        await signOut(auth);

        setError(
          "This account does not match the Student ID."
        );

        return;
      }

      if (!student.uid) {
        await updateDoc(
          studentReference,
          {
            uid: userCredential.user.uid,
          }
        );
      }

      saveStudentSession(
        cleanStudentId,
        {
          ...student,
          uid: userCredential.user.uid,
        },
        userCredential.user
      );

      navigate("/courses", {
        replace: true,
      });
    } catch (loginError) {
      console.error(
        "Password login error:",
        loginError
      );

      setError(
        getPasswordLoginError(loginError)
      );
    } finally {
      setLoadingType("");
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoadingType("google");

    try {
      const userCredential =
        await signInWithPopup(
          auth,
          GOOGLE_PROVIDER
        );

      const user = userCredential.user;

      const googleEmail = String(
        user.email || ""
      )
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
        where(
          "email",
          "==",
          googleEmail
        ),
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

      if (
        student.loginMethod !== "google"
      ) {
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

      navigate("/courses", {
        replace: true,
      });
    } catch (loginError) {
      console.error(
        "Google login error:",
        loginError
      );

      setError(
        getGoogleLoginError(loginError)
      );
    } finally {
      setLoadingType("");
    }
  };

  return (
    <motion.main
      variants={
        reduceMotion
          ? undefined
          : pageVariants
      }
      initial={
        reduceMotion
          ? false
          : "hidden"
      }
      animate={
        reduceMotion
          ? undefined
          : "visible"
      }
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-green-100 via-white to-green-50 px-4 py-12"
    >
      {/* Background decoration */}

      <div
        aria-hidden="true"
        className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-green-200/40 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-green-300/30 blur-3xl"
      />

      <motion.section
        variants={
          reduceMotion
            ? undefined
            : cardVariants
        }
        initial={
          reduceMotion
            ? false
            : "hidden"
        }
        animate={
          reduceMotion
            ? undefined
            : "visible"
        }
        aria-labelledby="student-login-title"
        className="relative z-10 w-full max-w-md rounded-3xl border border-white/70 bg-white/95 p-7 shadow-2xl backdrop-blur-sm sm:p-8"
        style={{
          willChange: reduceMotion
            ? "auto"
            : "transform, opacity",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      >
        <div className="mb-5 flex justify-center">
          <img
            src="/logo.png"
            alt="Paradise Sweets Academy"
            decoding="async"
            draggable="false"
            className="h-24 w-24 object-contain"
          />
        </div>

        <h1
          id="student-login-title"
          className="text-center text-3xl font-bold text-green-700"
        >
          Student Login
        </h1>

        <p className="mb-6 mt-2 text-center text-gray-500">
          Welcome to Paradise Sweets Academy
        </p>

        {error && (
          <div
            role="alert"
            aria-live="polite"
            className="mb-4 break-words rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
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
              autoCapitalize="none"
              spellCheck="false"
              placeholder="Enter Student ID"
              value={studentId}
              disabled={isLoading}
              onChange={(event) => {
                setStudentId(
                  event.target.value
                );

                if (error) {
                  setError("");
                }
              }}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-200 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-70"
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
              disabled={isLoading}
              onChange={(event) => {
                setPassword(
                  event.target.value
                );

                if (error) {
                  setError("");
                }
              }}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-200 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-70"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition duration-200 active:scale-[0.98] active:bg-green-700 md:hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loadingType === "password"
              ? "Signing in..."
              : "Login"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />

          <span className="text-sm font-medium text-gray-400">
            OR
          </span>

          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white py-3 font-semibold text-gray-700 transition duration-200 active:scale-[0.98] active:bg-gray-50 md:hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span
            aria-hidden="true"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-lg font-bold text-blue-600"
          >
            G
          </span>

          {loadingType === "google"
            ? "Connecting..."
            : "Continue with Google"}
        </button>

        <p className="mt-8 text-center text-sm leading-6 text-gray-500">
          Existing students can use Student ID
          and password. Students enrolled with a
          Gmail account can use Google Sign-In.
        </p>
      </motion.section>
    </motion.main>
  );
}