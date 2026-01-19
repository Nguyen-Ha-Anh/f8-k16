import { verifyEmailApi } from "@/api/verifyEmail";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function VerifyEmail() {
  const { token } = useParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) return;

    verifyEmailApi(token)
      .then((res) => {
        setStatus("success");
        setMessage(res.message || "email verified successfully");
      })
      .catch((err) => {
        setStatus("error");
        setMessage(
          err.response?.data?.message ||
            "verification failed"
        );
      });
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="max- text-center">
        {status === "loading" && <p>verifying your email...</p>}

        {status === "success" && (
          <>
            <h1 className="text-2xl font-semibold mb-4">
              Email Verified
            </h1>
            <p className="text-gray-400 mb-6">{message}</p>
            <Link
              to="/home"
              className="inline-block px-6 py-2 bg-blue-500 rounded"
            >
              go to Login
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-2xl font-semibold mb-4 text-red-500">
              verification failed
            </h1>
            <p className="text-gray-400 mb-6">{message}</p>
            <Link
              to="/register"
              className="inline-block px-6 py-2 bg-blue-500 rounded"
            >
              register again
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
