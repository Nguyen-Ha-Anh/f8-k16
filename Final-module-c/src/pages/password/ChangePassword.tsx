import { useState } from "react";
import { changePassword } from "@/api/changePassword";
import SubmitButton from "@/components/form/SubmitButton";
import { Input } from "@/components/ui/input";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword || status === "loading") return;

    if (newPassword.length < 6) {
      setStatus("error");
      setMessage("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatus("error");
      setMessage("Passwords do not match");
      return;
    }

    try {
      setStatus("loading");

      const res = await changePassword(
        currentPassword,
        newPassword,
        confirmPassword
      );

      if (res.success) {
        setStatus("success");
        setMessage(res.message);

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setStatus("error");
        setMessage(res.message);
      }
    } catch (err: any) {
      setStatus("error");
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="w-[380px] border border-gray-700 rounded-md p-8 bg-black text-center">
        <h2 className="font-semibold text-lg mb-4">
          Change Password
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="relative mb-3">
            <Input
              id="currentPassword"
              type="password"
              placeholder=" "
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="peer h-[44px] w-full bg-[#121212] text-white 
                border border-[#363636]
                text-sm px-3 pt-5 pb-2 rounded-sm
                focus:outline-none focus:border-gray-500
                placeholder-transparent"
            />
            <label
              htmlFor="currentPassword"
              className="absolute left-3 top-3 text-[#a8a8a8] text-sm
                transition-all duration-200 cursor-text
                peer-focus:top-1 peer-focus:text-xs
                peer-not-placeholder-shown:top-1
                peer-not-placeholder-shown:text-xs"
            >
              Current password
            </label>
          </div>

          <div className="relative mb-3">
            <Input
              id="newPassword"
              type="password"
              placeholder=" "
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="peer h-[44px] w-full bg-[#121212] text-white 
                border border-[#363636]
                text-sm px-3 pt-5 pb-2 rounded-sm
                focus:outline-none focus:border-gray-500
                placeholder-transparent"
            />
            <label
              htmlFor="newPassword"
              className="absolute left-3 top-3 text-[#a8a8a8] text-sm
                transition-all duration-200 cursor-text
                peer-focus:top-1 peer-focus:text-xs
                peer-not-placeholder-shown:top-1
                peer-not-placeholder-shown:text-xs"
            >
              New password
            </label>
          </div>

          <div className="relative mb-4">
            <Input
              id="confirmPassword"
              type="password"
              placeholder=" "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="peer h-[44px] w-full bg-[#121212] text-white 
                border border-[#363636]
                text-sm px-3 pt-5 pb-2 rounded-sm
                focus:outline-none focus:border-gray-500
                placeholder-transparent"
            />
            <label
              htmlFor="confirmPassword"
              className="absolute left-3 top-3 text-[#a8a8a8] text-sm
                transition-all duration-200 cursor-text
                peer-focus:top-1 peer-focus:text-xs
                peer-not-placeholder-shown:top-1
                peer-not-placeholder-shown:text-xs"
            >
              Confirm new password
            </label>
          </div>

          <SubmitButton
            label={status === "loading" ? "Updating..." : "Change password"}
            disabled={
              !currentPassword ||
              !newPassword ||
              !confirmPassword ||
              status === "loading"
            }
          />
        </form>

        {status === "success" && (
          <p className="text-green-400 text-sm mt-4">
            {message}
          </p>
        )}

        {status === "error" && (
          <p className="text-red-400 text-sm mt-4">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
