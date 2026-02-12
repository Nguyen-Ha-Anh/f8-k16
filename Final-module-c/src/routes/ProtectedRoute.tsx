import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { JSX } from "react";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const profile = useSelector((state: any) => state.auth.profile);
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (!profile) {
    return <div className="text-white p-10">Loading...</div>;
  }

  return children;
}
