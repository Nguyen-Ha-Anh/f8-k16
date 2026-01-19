import { forgotPassword } from "@/api/forgotPassword";
import SubmitButton from "@/components/form/SubmitButton";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    try {
      setStatus("loading");
      const res = await forgotPassword(email);

      if (res.success) {
        setStatus("success");
        setMessage(res.message);
      } else {
        setStatus("error");
        setMessage(res.message);
      }
    } catch (err: any) {
      setStatus("error");
      setMessage(err.response?.data?.message || "wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="w-[380px] border border-gray-700 rounded-md p-8 bg-black text-center">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 border border-gray-500 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V7.5a4.5 4.5 0 10-9 0v3m-.75 0h10.5A1.5 1.5 0 0118.75 12v7.5A1.5 1.5 0 0117.25 21H6.75A1.5 1.5 0 015.25 19.5V12A1.5 1.5 0 016.75 10.5z"
              />
            </svg>
          </div>
        </div>

        <h2 className="font-semibold text-lg mb-2">Trouble logging in?</h2>

        <p className="text-sm text-gray-400 mb-6">
          Enter your email, phone, or username and we'll send you a link to get
          back into your account.
        </p>

        {status !== "success" && (
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <Input
                id="email"
                type="text"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer h-[44px] w-full bg-[#121212] text-white 
                    border border-[#363636]
                    text-sm px-3 pt-5 pb-2 rounded-sm
                    focus:outline-none focus:border-gray-500
                    placeholder-transparent mb-3"
              />

              <label
                htmlFor="email"
                className="absolute left-3 top-3 text-[#a8a8a8] text-sm
                    transition-all duration-200 cursor-text
                    peer-focus:top-1 peer-focus:text-xs
                    peer-not-placeholder-shown:top-1
                    peer-not-placeholder-shown:text-xs"
              >
                Email or username
              </label>

              <SubmitButton
                label={status === "loading" ? "Sending..." : "Send login link"}
                disabled={!email || status === "loading"}
              />
            </div>
          </form>
        )}

        {status === "success" && (
          <p className="text-green-400 text-sm mt-4">{message}</p>
        )}

        {status === "error" && (
          <p className="text-red-400 text-sm mt-4">{message}</p>
        )}

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-700" />
          <span className="px-3 text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-700" />
        </div>

        <NavLink
          to="/register"
          className="text-sm text-foreground font-semibold hover:underline"
        >
          Create new account
        </NavLink>

        <div className="border-gray-700 pt-4">
          <NavLink to="/" className="text-sm text-gray-400 hover:text-white">
            Back to login
          </NavLink>
        </div>
      </div>
    </div>
  );
}
