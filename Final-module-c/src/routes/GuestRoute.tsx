import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function GuestRoute({ children }: any) {
  const profile = useSelector((state: any) => state.auth.profile);
  const token = localStorage.getItem("accessToken");

  if (token && profile) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
