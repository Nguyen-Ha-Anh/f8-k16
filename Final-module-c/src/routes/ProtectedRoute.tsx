import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { JSX } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const {profile,loading} = useSelector((state: any) => state.auth);
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return <div className="text-white p-10">Loading...</div>;
  }

  if (!profile) {
    return <Navigate to="/" replace />;
  }

  return children;
}
