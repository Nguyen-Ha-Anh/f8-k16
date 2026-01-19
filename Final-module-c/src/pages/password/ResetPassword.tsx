import { resetPassword } from "@/api/resetPassword";
import PasswordInput from "@/components/form/PasswordInput";
import SubmitButton from "@/components/form/SubmitButton";
import type { ResetFormData } from "@/types/Password";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useParams } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();


  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const [message, setMessage] = useState("");

  const { 
    register, 
    watch, 
    handleSubmit, 
    formState: {isValid} 
  } = useForm<ResetFormData>({mode: 'onChange'})

  const password = watch('password') || ''
  const confirmPassword = watch('confirmPassword') || ''

  const onSubmit = async (data: ResetFormData) => {
    if (status === "loading") return;

    if (data.password.length < 6) {
      setStatus("error");
      setMessage("Password must be at least 6 characters");
    }

    if (data.password !== data.confirmPassword) {
      setStatus("error");
      setMessage("Passwords do not match");
      return;
    }

    try {
      setStatus("loading");

      const res = await resetPassword(
        token as string,
        data.password,
        data.confirmPassword,
      );

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
        <h2 className="font-semibold text-lg mb-2">Create a strong password</h2>

        <p className="text-sm text-gray-400 mb-6">
          Your password must be at least 6 characters and should include a
          combination of numbers, letters and special characters ($@%).
        </p>

        {status !== "success" && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative mb-3">
              <PasswordInput<ResetFormData>
                register={register}
                name='password'
                label='New password'
                value={password}
                />
            </div>

            {/* confirm pass */}
            <div className="relative mb-4">
              <PasswordInput<ResetFormData>
                register={register}
                name='confirmPassword'
                label='New password, again'
                value={confirmPassword}
                />
            </div>

            <SubmitButton
              label={status === "loading" ? "Resetting..." : "Reset password"}
              disabled={!isValid || status === "loading"}
            />
          </form>
        )}

        {status === "success" && (
          <>
            <p className="text-green-400 text-sm mt-4">{message}</p>

            <NavLink
              to="/"
              className="block mt-4 text-sm text-blue-400 hover:underline"
            >
              Back to login
            </NavLink>
          </>
        )}

        {status === "error" && (
          <p className="text-red-400 text-sm mt-4">{message}</p>
        )}
      </div>
    </div>
  );
}
