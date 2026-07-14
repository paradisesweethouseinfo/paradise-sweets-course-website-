import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebase";

const ADMIN_API_URL = "http://localhost:8788";

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

const EMPTY_FORM = {
  studentId: "",
  name: "",
  loginMethod: "google",
  gmailUsername: "",
  password: "",
  active: true,
  courses: [],
};

export default function Admin() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [showStudentForm, setShowStudentForm] =
    useState(false);

  const [editingDocumentId, setEditingDocumentId] =
    useState("");

  const [studentForm, setStudentForm] =
    useState(EMPTY_FORM);

  const [searchText, setSearchText] = useState("");

  const loadStudents = async () => {
    setLoading(true);
    setError("");

    try {
      const studentsReference = collection(
        db,
        "students"
      );

      const snapshot = await getDocs(
        studentsReference
      );

      const studentList = snapshot.docs.map(
        (studentDocument) => ({
          documentId: studentDocument.id,
          ...studentDocument.data(),
        })
      );

      studentList.sort((firstStudent, secondStudent) => {
        const firstId = String(
          firstStudent.studentId ||
            firstStudent.documentId
        );

        const secondId = String(
          secondStudent.studentId ||
            secondStudent.documentId
        );

        return firstId.localeCompare(
          secondId,
          undefined,
          {
            numeric: true,
          }
        );
      });

      setStudents(studentList);
    } catch (err) {
      console.error("Student loading error:", err);

      setError(
        err.message || "Unable to load students."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const showSuccessMessage = (text) => {
    setMessage(text);
    setError("");

    window.setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  const resetStudentForm = () => {
    setStudentForm(EMPTY_FORM);
    setEditingDocumentId("");
    setShowStudentForm(false);
  };

  const openAddStudentForm = () => {
    setError("");
    setMessage("");
    setEditingDocumentId("");
    setStudentForm(EMPTY_FORM);
    setShowStudentForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openEditStudentForm = (student) => {
    setError("");
    setMessage("");

    const savedEmail = String(
      student.email || ""
    ).toLowerCase();

    const gmailUsername = savedEmail.endsWith(
      "@gmail.com"
    )
      ? savedEmail.replace("@gmail.com", "")
      : "";

    setEditingDocumentId(student.documentId);

    setStudentForm({
      studentId:
        student.studentId ||
        student.documentId ||
        "",
      name: student.name || "",
      loginMethod:
        student.loginMethod || "google",
      gmailUsername,
      password: "",
      active: student.active === true,
      courses: Array.isArray(student.courses)
        ? student.courses
        : [],
    });

    setShowStudentForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const selectLoginMethod = (loginMethod) => {
    if (editingDocumentId) {
      return;
    }

    setStudentForm((currentForm) => ({
      ...currentForm,
      loginMethod,
      gmailUsername: "",
      password: "",
    }));

    setError("");
  };

  const handleFormCourseChange = (courseId) => {
    setStudentForm((currentForm) => {
      const currentCourses = Array.isArray(
        currentForm.courses
      )
        ? currentForm.courses
        : [];

      const alreadySelected =
        currentCourses.includes(courseId);

      return {
        ...currentForm,
        courses: alreadySelected
          ? currentCourses.filter(
              (currentCourseId) =>
                currentCourseId !== courseId
            )
          : [...currentCourses, courseId],
      };
    });
  };

  const callAdminApi = async (
    endpoint,
    requestBody
  ) => {
    const currentAdmin = auth.currentUser;

    if (!currentAdmin) {
      throw new Error(
        "Your admin login session has expired. Please log in again."
      );
    }

    const idToken =
      await currentAdmin.getIdToken(true);

    const response = await fetch(
      `${ADMIN_API_URL}${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

    const result = await response.json();

    if (!response.ok || result.success !== true) {
      throw new Error(
        result.message ||
          "The admin API request failed."
      );
    }

    return result;
  };

  const createNewStudent = async () => {
    const cleanStudentId =
      studentForm.studentId.trim();

    const cleanName = studentForm.name.trim();

    const courses = Array.isArray(
      studentForm.courses
    )
      ? studentForm.courses
      : [];

    const commonStudentData = {
      studentId: cleanStudentId,
      name: cleanName,
      active: studentForm.active === true,
      courses,
    };

    if (
      studentForm.loginMethod === "password"
    ) {
      const cleanPassword =
        studentForm.password.trim();

      if (cleanPassword.length < 6) {
        throw new Error(
          "Password must contain at least 6 characters."
        );
      }

      return callAdminApi(
        "/students/password",
        {
          ...commonStudentData,
          password: cleanPassword,
        }
      );
    }

    const cleanGmailUsername =
      studentForm.gmailUsername
        .trim()
        .toLowerCase()
        .replace("@gmail.com", "")
        .replace(/\s/g, "");

    if (!cleanGmailUsername) {
      throw new Error(
        "Gmail username is required."
      );
    }

    const email =
      `${cleanGmailUsername}@gmail.com`;

    return callAdminApi(
      "/students/google",
      {
        ...commonStudentData,
        email,
      }
    );
  };

  const updateExistingStudent = async () => {
    const cleanName = studentForm.name.trim();

    const studentReference = doc(
      db,
      "students",
      editingDocumentId
    );

    const updatedData = {
      name: cleanName,
      active: studentForm.active === true,
      courses: Array.isArray(
        studentForm.courses
      )
        ? studentForm.courses
        : [],
    };

    if (
      studentForm.loginMethod === "google"
    ) {
      const cleanGmailUsername =
        studentForm.gmailUsername
          .trim()
          .toLowerCase()
          .replace("@gmail.com", "")
          .replace(/\s/g, "");

      if (!cleanGmailUsername) {
        throw new Error(
          "Gmail username is required."
        );
      }

      updatedData.email =
        `${cleanGmailUsername}@gmail.com`;
    }

    await updateDoc(
      studentReference,
      updatedData
    );
  };

  const saveStudent = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");

    const cleanStudentId =
      studentForm.studentId.trim();

    const cleanName =
      studentForm.name.trim();

    if (!cleanStudentId) {
      setError("Student ID is required.");
      return;
    }

    if (!/^[A-Za-z0-9_-]+$/.test(cleanStudentId)) {
      setError(
        "Student ID can contain only letters, numbers, hyphens and underscores."
      );
      return;
    }

    if (!cleanName) {
      setError("Student name is required.");
      return;
    }

    setSavingId(
      editingDocumentId || cleanStudentId
    );

    try {
      if (editingDocumentId) {
        await updateExistingStudent();

        showSuccessMessage(
          "Student updated successfully."
        );
      } else {
        const result =
          await createNewStudent();

        showSuccessMessage(result.message);
      }

      resetStudentForm();
      await loadStudents();
    } catch (err) {
      console.error("Student save error:", err);

      setError(
        err.message ||
          "Unable to save student."
      );
    } finally {
      setSavingId("");
    }
  };

  const toggleStudentStatus = async (student) => {
    setSavingId(student.documentId);
    setError("");

    try {
      const newStatus =
        student.active !== true;

      const studentReference = doc(
        db,
        "students",
        student.documentId
      );

      await updateDoc(studentReference, {
        active: newStatus,
      });

      setStudents((currentStudents) =>
        currentStudents.map(
          (currentStudent) =>
            currentStudent.documentId ===
            student.documentId
              ? {
                  ...currentStudent,
                  active: newStatus,
                }
              : currentStudent
        )
      );

      showSuccessMessage(
        newStatus
          ? "Student account activated."
          : "Student account disabled."
      );
    } catch (err) {
      console.error(
        "Student status update error:",
        err
      );

      setError(
        err.message ||
          "Unable to update student status."
      );
    } finally {
      setSavingId("");
    }
  };

  const toggleCourseAccess = async (
    student,
    courseId
  ) => {
    setSavingId(student.documentId);
    setError("");

    try {
      const currentCourses = Array.isArray(
        student.courses
      )
        ? student.courses
        : [];

      const alreadyAssigned =
        currentCourses.includes(courseId);

      const newCourses = alreadyAssigned
        ? currentCourses.filter(
            (currentCourseId) =>
              currentCourseId !== courseId
          )
        : [...currentCourses, courseId];

      const studentReference = doc(
        db,
        "students",
        student.documentId
      );

      await updateDoc(studentReference, {
        courses: newCourses,
      });

      setStudents((currentStudents) =>
        currentStudents.map(
          (currentStudent) =>
            currentStudent.documentId ===
            student.documentId
              ? {
                  ...currentStudent,
                  courses: newCourses,
                }
              : currentStudent
        )
      );

      showSuccessMessage(
        "Course access updated successfully."
      );
    } catch (err) {
      console.error(
        "Course access update error:",
        err
      );

      setError(
        err.message ||
          "Unable to update course access."
      );
    } finally {
      setSavingId("");
    }
  };

  const deleteStudent = async (student) => {
    const displayedStudentId =
      student.studentId ||
      student.documentId;

    const confirmed = window.confirm(
      `Delete student ${displayedStudentId} - ${
        student.name || "Unnamed Student"
      }?\n\nThis removes the Firestore student record.`
    );

    if (!confirmed) {
      return;
    }

    setSavingId(student.documentId);
    setError("");

    try {
      await deleteDoc(
        doc(
          db,
          "students",
          student.documentId
        )
      );

      setStudents((currentStudents) =>
        currentStudents.filter(
          (currentStudent) =>
            currentStudent.documentId !==
            student.documentId
        )
      );

      showSuccessMessage(
        "Student record deleted successfully."
      );
    } catch (err) {
      console.error(
        "Student deletion error:",
        err
      );

      setError(
        err.message ||
          "Unable to delete student."
      );
    } finally {
      setSavingId("");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(
        "Admin logout error:",
        err
      );
    }

    localStorage.removeItem(
      "adminLoggedIn"
    );
    localStorage.removeItem("adminId");
    localStorage.removeItem("adminName");

    navigate("/admin");
  };

  const filteredStudents = useMemo(() => {
    const cleanSearch =
      searchText.trim().toLowerCase();

    if (!cleanSearch) {
      return students;
    }

    return students.filter((student) => {
      const displayedStudentId = String(
        student.studentId ||
          student.documentId ||
          ""
      ).toLowerCase();

      const name = String(
        student.name || ""
      ).toLowerCase();

      const email = String(
        student.email || ""
      ).toLowerCase();

      return (
        displayedStudentId.includes(
          cleanSearch
        ) ||
        name.includes(cleanSearch) ||
        email.includes(cleanSearch)
      );
    });
  }, [students, searchText]);

  const activeStudents = students.filter(
    (student) => student.active === true
  ).length;

  const googleStudents = students.filter(
    (student) =>
      student.loginMethod === "google"
  ).length;

  const passwordStudents = students.filter(
    (student) =>
      student.loginMethod === "password"
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

              <p className="mt-1 text-sm text-gray-500">
                Logged in as{" "}
                {localStorage.getItem(
                  "adminName"
                ) || "Administrator"}
              </p>
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

        {showStudentForm && (
          <section className="mb-8 rounded-3xl border border-green-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingDocumentId
                    ? "Edit Student"
                    : "Add New Student"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Create Google or Student ID and
                  password accounts.
                </p>
              </div>

              <button
                type="button"
                onClick={resetStudentForm}
                className="rounded-xl border border-gray-300 px-5 py-2.5 font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>

            {!editingDocumentId && (
              <div className="mb-6 grid grid-cols-2 gap-3 rounded-2xl bg-gray-100 p-2">
                <button
                  type="button"
                  onClick={() =>
                    selectLoginMethod("google")
                  }
                  className={`rounded-xl px-4 py-3 font-semibold transition ${
                    studentForm.loginMethod ===
                    "google"
                      ? "bg-white text-green-700 shadow-sm"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  Google Login
                </button>

                <button
                  type="button"
                  onClick={() =>
                    selectLoginMethod("password")
                  }
                  className={`rounded-xl px-4 py-3 font-semibold transition ${
                    studentForm.loginMethod ===
                    "password"
                      ? "bg-white text-green-700 shadow-sm"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  ID + Password
                </button>
              </div>
            )}

            <form
              onSubmit={saveStudent}
              className="space-y-6"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="newStudentId"
                    className="mb-2 block font-semibold text-gray-700"
                  >
                    Student ID
                  </label>

                  <input
                    id="newStudentId"
                    name="newStudentId"
                    type="text"
                    value={
                      studentForm.studentId
                    }
                    disabled={Boolean(
                      editingDocumentId
                    )}
                    onChange={(event) =>
                      setStudentForm(
                        (currentForm) => ({
                          ...currentForm,
                          studentId:
                            event.target.value,
                        })
                      )
                    }
                    placeholder="Example: 1428"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200 disabled:bg-gray-100"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="newStudentName"
                    className="mb-2 block font-semibold text-gray-700"
                  >
                    Student Name
                  </label>

                  <input
                    id="newStudentName"
                    name="newStudentName"
                    type="text"
                    value={studentForm.name}
                    onChange={(event) =>
                      setStudentForm(
                        (currentForm) => ({
                          ...currentForm,
                          name: event.target.value,
                        })
                      )
                    }
                    placeholder="Student full name"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                    required
                  />
                </div>

                {studentForm.loginMethod ===
                "google" ? (
                  <div className="md:col-span-2">
                    <label
                      htmlFor="gmailUsername"
                      className="mb-2 block font-semibold text-gray-700"
                    >
                      Gmail Address
                    </label>

                    <div className="flex overflow-hidden rounded-xl border border-gray-300 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-200">
                      <input
                        id="gmailUsername"
                        name="gmailUsername"
                        type="text"
                        value={
                          studentForm.gmailUsername
                        }
                        onChange={(event) =>
                          setStudentForm(
                            (currentForm) => ({
                              ...currentForm,
                              gmailUsername:
                                event.target.value,
                            })
                          )
                        }
                        placeholder="sanithuudaneth"
                        className="min-w-0 flex-1 px-4 py-3 outline-none"
                        required
                      />

                      <span className="flex items-center border-l border-gray-300 bg-gray-100 px-4 font-medium text-gray-600">
                        @gmail.com
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="md:col-span-2">
                    <label
                      htmlFor="studentPassword"
                      className="mb-2 block font-semibold text-gray-700"
                    >
                      Student Password
                    </label>

                    <input
                      id="studentPassword"
                      name="studentPassword"
                      type="password"
                      value={
                        studentForm.password
                      }
                      onChange={(event) =>
                        setStudentForm(
                          (currentForm) => ({
                            ...currentForm,
                            password:
                              event.target.value,
                          })
                        )
                      }
                      placeholder="Minimum 6 characters"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                      minLength={6}
                      required={
                        !editingDocumentId
                      }
                    />

                    <p className="mt-2 text-sm text-gray-500">
                      The student will log in using
                      Student ID and this password.
                    </p>
                  </div>
                )}
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-gray-900">
                  Purchased Courses
                </h3>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {AVAILABLE_COURSES.map(
                    (course) => {
                      const selected =
                        studentForm.courses.includes(
                          course.id
                        );

                      return (
                        <label
                          key={course.id}
                          className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                            selected
                              ? "border-green-300 bg-green-50"
                              : "border-gray-200 bg-white hover:bg-gray-50"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() =>
                              handleFormCourseChange(
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
                    }
                  )}
                </div>
              </div>

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4">
                <input
                  type="checkbox"
                  checked={studentForm.active}
                  onChange={(event) =>
                    setStudentForm(
                      (currentForm) => ({
                        ...currentForm,
                        active:
                          event.target.checked,
                      })
                    )
                  }
                  className="h-5 w-5 accent-green-600"
                />

                <span className="font-medium text-gray-800">
                  Student account is active
                </span>
              </label>

              <button
                type="submit"
                disabled={savingId !== ""}
                className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-8"
              >
                {savingId
                  ? "Saving..."
                  : editingDocumentId
                    ? "Save Changes"
                    : studentForm.loginMethod ===
                        "password"
                      ? "Create Password Student"
                      : "Create Google Student"}
              </button>
            </form>
          </section>
        )}

        <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Student Manager
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Add, edit, delete and control
                  student access.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={openAddStudentForm}
                  className="rounded-xl bg-green-600 px-5 py-2.5 font-semibold text-white transition hover:bg-green-700"
                >
                  + Add Student
                </button>

                <button
                  type="button"
                  onClick={loadStudents}
                  className="rounded-xl border border-gray-300 bg-white px-5 py-2.5 font-semibold text-gray-700 transition hover:bg-gray-100"
                >
                  Refresh
                </button>
              </div>
            </div>

            <div className="mt-5">
              <input
                id="studentSearch"
                name="studentSearch"
                type="search"
                value={searchText}
                onChange={(event) =>
                  setSearchText(
                    event.target.value
                  )
                }
                placeholder="Search by Student ID, name or Gmail..."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
              />
            </div>
          </div>

          {loading ? (
            <div className="py-20 text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-green-200 border-t-green-600" />

              <p className="mt-4 text-gray-500">
                Loading students...
              </p>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
              No matching students were found.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredStudents.map(
                (student) => {
                  const displayedStudentId =
                    student.studentId ||
                    student.documentId;

                  const assignedCourses =
                    Array.isArray(
                      student.courses
                    )
                      ? student.courses
                      : [];

                  const isSaving =
                    savingId ===
                    student.documentId;

                  return (
                    <article
                      key={student.documentId}
                      className="p-6"
                    >
                      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-xl font-bold text-gray-900">
                              {student.name ||
                                "Unnamed Student"}
                            </h3>

                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                student.active
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {student.active
                                ? "Active"
                                : "Disabled"}
                            </span>
                          </div>

                          <p className="mt-2 text-sm text-gray-600">
                            Student ID:{" "}
                            <strong>
                              {displayedStudentId}
                            </strong>
                          </p>

                          {student.email && (
                            <p className="mt-1 text-sm text-gray-600">
                              Gmail: {student.email}
                            </p>
                          )}

                          <p className="mt-1 text-sm text-gray-600">
                            Login method:{" "}
                            <span className="capitalize">
                              {student.loginMethod ||
                                "Not set"}
                            </span>
                          </p>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row">
                          <button
                            type="button"
                            onClick={() =>
                              openEditStudentForm(
                                student
                              )
                            }
                            disabled={isSaving}
                            className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 font-semibold text-blue-700 hover:bg-blue-100"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              toggleStudentStatus(
                                student
                              )
                            }
                            disabled={isSaving}
                            className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-2.5 font-semibold text-orange-700 hover:bg-orange-100"
                          >
                            {student.active
                              ? "Disable"
                              : "Activate"}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              deleteStudent(student)
                            }
                            disabled={isSaving}
                            className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 font-semibold text-red-700 hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {AVAILABLE_COURSES.map(
                          (course) => {
                            const assigned =
                              assignedCourses.includes(
                                course.id
                              );

                            return (
                              <label
                                key={course.id}
                                className={`flex items-center gap-3 rounded-xl border p-4 ${
                                  assigned
                                    ? "border-green-300 bg-green-50"
                                    : "border-gray-200"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={assigned}
                                  disabled={isSaving}
                                  onChange={() =>
                                    toggleCourseAccess(
                                      student,
                                      course.id
                                    )
                                  }
                                  className="h-5 w-5 accent-green-600"
                                />

                                <span className="text-sm font-medium">
                                  {course.name}
                                </span>
                              </label>
                            );
                          }
                        )}
                      </div>
                    </article>
                  );
                }
              )}
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