import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebase";

const AVAILABLE_COURSES = [
  {
    id: "basic-cake",
    name: "Basic Cake Course",
  },
  {
    id: "advanced-cake",
    name: "Advanced Cake Course",
  },
  {
    id: "traditional-sweets",
    name: "Traditional Sweets",
  },
  {
    id: "bakery-essentials",
    name: "Bakery Essentials",
  },
];

export default function Admin() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadStudents = async () => {
    setLoading(true);
    setError("");

    try {
      const studentsRef = collection(db, "students");
      const snapshot = await getDocs(studentsRef);

      const studentList = snapshot.docs.map((studentDoc) => ({
        documentId: studentDoc.id,
        ...studentDoc.data(),
      }));

      studentList.sort((a, b) =>
        String(a.studentId || a.documentId).localeCompare(
          String(b.studentId || b.documentId),
          undefined,
          { numeric: true }
        )
      );

      setStudents(studentList);
    } catch (err) {
      console.error("Student loading error:", err);
      setError(err.message || "Unable to load students.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const showSuccess = (text) => {
    setMessage(text);
    setError("");

    window.setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const toggleStudentStatus = async (student) => {
    setSavingId(student.documentId);
    setError("");

    try {
      const newStatus = student.active !== true;

      await updateDoc(
        doc(db, "students", student.documentId),
        {
          active: newStatus,
        }
      );

      setStudents((currentStudents) =>
        currentStudents.map((currentStudent) =>
          currentStudent.documentId === student.documentId
            ? {
                ...currentStudent,
                active: newStatus,
              }
            : currentStudent
        )
      );

      showSuccess(
        newStatus
          ? "Student account activated."
          : "Student account disabled."
      );
    } catch (err) {
      console.error("Status update error:", err);
      setError(err.message || "Unable to update student.");
    } finally {
      setSavingId("");
    }
  };

  const toggleCourse = async (student, courseId) => {
    setSavingId(student.documentId);
    setError("");

    try {
      const currentCourses = Array.isArray(student.courses)
        ? student.courses
        : [];

      const alreadyAssigned = currentCourses.includes(courseId);

      const newCourses = alreadyAssigned
        ? currentCourses.filter((id) => id !== courseId)
        : [...currentCourses, courseId];

      await updateDoc(
        doc(db, "students", student.documentId),
        {
          courses: newCourses,
        }
      );

      setStudents((currentStudents) =>
        currentStudents.map((currentStudent) =>
          currentStudent.documentId === student.documentId
            ? {
                ...currentStudent,
                courses: newCourses,
              }
            : currentStudent
        )
      );

      showSuccess("Course access updated.");
    } catch (err) {
      console.error("Course update error:", err);
      setError(err.message || "Unable to update course access.");
    } finally {
      setSavingId("");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Admin logout error:", err);
    }

    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminName");

    navigate("/admin");
  };

  const activeStudents = students.filter(
    (student) => student.active === true
  ).length;

  const googleStudents = students.filter(
    (student) => student.loginMethod === "google"
  ).length;

  const passwordStudents = students.filter(
    (student) => student.loginMethod === "password"
  ).length;

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="Paradise Sweets Academy"
              className="h-14 w-14 object-contain"
            />

            <div>
              <p className="text-sm font-semibold text-green-600">
                Paradise Sweets Academy
              </p>

              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 font-semibold text-red-700 transition hover:bg-red-100"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Total Students"
            value={students.length}
          />

          <DashboardCard
            title="Active Students"
            value={activeStudents}
          />

          <DashboardCard
            title="Google Students"
            value={googleStudents}
          />

          <DashboardCard
            title="Password Students"
            value={passwordStudents}
          />
        </section>

        {message && (
          <div className="mb-6 rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-green-800">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-gray-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Student Manager
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Activate students and control course access.
              </p>
            </div>

            <button
              type="button"
              onClick={loadStudents}
              className="rounded-xl bg-green-600 px-5 py-2.5 font-semibold text-white transition hover:bg-green-700"
            >
              Refresh Students
            </button>
          </div>

          {loading ? (
            <div className="py-20 text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-green-200 border-t-green-600" />

              <p className="mt-4 text-gray-500">
                Loading students...
              </p>
            </div>
          ) : students.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
              No student documents were found.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {students.map((student) => {
                const studentId =
                  student.studentId || student.documentId;

                const courses = Array.isArray(student.courses)
                  ? student.courses
                  : [];

                const isSaving =
                  savingId === student.documentId;

                return (
                  <article
                    key={student.documentId}
                    className="p-6"
                  >
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-xl font-bold text-gray-900">
                            {student.name || "Unnamed Student"}
                          </h3>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              student.active === true
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {student.active === true
                              ? "Active"
                              : "Disabled"}
                          </span>
                        </div>

                        <p className="mt-2 text-sm text-gray-600">
                          Student ID:{" "}
                          <span className="font-semibold text-gray-900">
                            {studentId}
                          </span>
                        </p>

                        {student.email && (
                          <p className="mt-1 break-all text-sm text-gray-600">
                            Gmail: {student.email}
                          </p>
                        )}

                        <p className="mt-1 text-sm text-gray-600">
                          Login method:{" "}
                          <span className="capitalize">
                            {student.loginMethod || "Not set"}
                          </span>
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          toggleStudentStatus(student)
                        }
                        disabled={isSaving}
                        className={`rounded-xl px-5 py-2.5 font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                          student.active === true
                            ? "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                            : "border border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                        }`}
                      >
                        {isSaving
                          ? "Saving..."
                          : student.active === true
                            ? "Disable Student"
                            : "Activate Student"}
                      </button>
                    </div>

                    <div className="mt-6">
                      <h4 className="mb-3 font-semibold text-gray-900">
                        Course Access
                      </h4>

                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {AVAILABLE_COURSES.map((course) => {
                          const assigned = courses.includes(
                            course.id
                          );

                          return (
                            <label
                              key={course.id}
                              className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                                assigned
                                  ? "border-green-300 bg-green-50"
                                  : "border-gray-200 bg-white hover:bg-gray-50"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={assigned}
                                disabled={isSaving}
                                onChange={() =>
                                  toggleCourse(
                                    student,
                                    course.id
                                  )
                                }
                                className="h-5 w-5 accent-green-600"
                              />

                              <span className="text-sm font-medium text-gray-800">
                                {course.name}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function DashboardCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-gray-500">
        {title}
      </p>

      <p className="mt-2 text-4xl font-bold text-green-700">
        {value}
      </p>
    </div>
  );
}