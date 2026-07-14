import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

export default function AdminProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        const savedAdminId =
          localStorage.getItem("adminId");

        if (!user || !savedAdminId) {
          localStorage.removeItem("adminLoggedIn");
          localStorage.removeItem("adminId");
          localStorage.removeItem("adminName");

          setAllowed(false);
          setChecking(false);
          return;
        }

        try {
          const adminRef = doc(
            db,
            "admins",
            savedAdminId
          );

          const adminSnap = await getDoc(adminRef);

          if (
            adminSnap.exists() &&
            adminSnap.data().active === true &&
            adminSnap.data().uid === user.uid
          ) {
            setAllowed(true);
          } else {
            await signOut(auth);

            localStorage.removeItem("adminLoggedIn");
            localStorage.removeItem("adminId");
            localStorage.removeItem("adminName");

            setAllowed(false);
          }
        } catch (err) {
          console.error(
            "Admin verification error:",
            err
          );

          localStorage.removeItem("adminLoggedIn");
          localStorage.removeItem("adminId");
          localStorage.removeItem("adminName");

          setAllowed(false);
        } finally {
          setChecking(false);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-green-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-green-200 border-t-green-600" />

          <p className="mt-4 text-gray-600">
            Checking administrator access...
          </p>
        </div>
      </div>
    );
  }

  if (!allowed) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}