import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import PasswordInput from "../form/PasswordInput";
import { useForm } from "react-hook-form";
import type { RegisterFormData } from "@/types/AuthType";
import SubmitButton from "../form/SubmitButton";
import { registerApi } from "@/api/registerAPI";
import { useState } from "react";

export default function RegisterForm() {
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterFormData) => {
    setServerError("");
    setSuccessMessage("");
    // console.log("login", data);

    const payload = {
      ...data,
      username: data.username.toLowerCase().trim(),
      email: data.email.trim(),
    };

    try {
      const result = await registerApi(payload);
      setSuccessMessage(
        "Sign up successful! Please check your email to verify your account."
      );
    } catch (error: any) {
      setServerError(error.response?.data?.message || "Register failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen w-full flex items-center justify-center bg-background text-foreground"
    >
      <div className="w-[350px]">
        <div className="border border-[#262626] bg-[#0C1014] px-10 py-8 text-center">
          {/* logo */}
          <h1
            style={{ fontFamily: "Lobster, cursive" }}
            className="text-white text-4xl mb-4"
          >
            Instagram
          </h1>

          <p className="text-[#a8a8a8] text-sm font-semibold mb-5">
            Sign up to see photos and videos from your friends.
          </p>

          {/* facebook */}
          <Button className="w-full bg-[#4A5DF9] hover:bg-[#4451c7] text-white">
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Layer_2" data-name="Layer 2">
                <g id="invisible_box" data-name="invisible box">
                  <rect width="48" height="48" fill="none" />
                  <rect width="48" height="48" fill="none" />
                </g>
                <g id="icons_Q2" data-name="icons Q2">
                  <path
                    d="M44,6.1V41.9a.3.3,0,0,1-.1.2,1.9,1.9,0,0,1-1.8,1.8H31.6V28.5h4.9c.3,0,.3,0,.4-.3l.3-2.5c.1-1,.2-2,.4-3s0-.3-.2-.3H31.6V18.5c0-.3.1-.7.1-1a1.8,1.8,0,0,1,1.6-1.6l1.3-.2h3c.2,0,.2,0,.2-.2V10.4c0-.1,0-.2-.2-.2H33a7.2,7.2,0,0,0-3.3.7A6,6,0,0,0,26.2,14a7.3,7.3,0,0,0-.8,3.6c-.1,1.5,0,3.1,0,4.7H20.3c-.2,0-.2.1-.2.2v5.7c0,.2,0,.2.2.2h5.1V43.8a.3.3,0,0,0-.1.2H5.9a1.9,1.9,0,0,1-1.8-1.8c-.1,0-.1-.1-.1-.2V6.1c0-.1,0-.2.1-.2A1.9,1.9,0,0,1,5.9,4.1H42.1a1.9,1.9,0,0,1,1.8,1.8Z"
                    fill="white"
                  />
                </g>
              </g>
            </svg>
            Log in with Facebook
          </Button>

          {/* or */}
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-[#262626]" />
            <span className="mx-4 text-xs text-[#a8a8a8] font-semibold">
              OR
            </span>
            <div className="flex-1 h-px bg-[#262626]" />
          </div>

          {/* inputs */}
          <div>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder=" "
                {...register("email", {
                  required: "Email is required",
                })}
                className="peer h-[40px] w-full bg-[#25292E] border border-[#363636]
                text-white text-sm px-3 pt-6 pb-2 rounded-sm 
                focus:outline-none mb-1
                placeholder-transparent"
              />
              <label
                htmlFor="usernameRegister"
                className="absolute left-3 top-3 text-[#a8a8a8] text-sm
                transition-all duration-200
                peer-focus:top-1 peer-focus:text-xs
                peer-not-placeholder-shown:top-1 cursor-text
                peer-not-placeholder-shown:text-xs"
              >
                Enter your email
              </label>
            </div>

            <PasswordInput<RegisterFormData>
              register={register}
              name="password"
              label="Password"
              error={errors.password?.message}
              value={watch("password") || ""}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              }}
            />

            <PasswordInput<RegisterFormData>
              register={register}
              name="confirmPassword"
              label="Confirm password"
              error={errors.confirmPassword?.message}
              value={watch("confirmPassword") || ""}
              rules={{
                required: "Confirm password is required",
                validate: (value: string) => {
                  if (!watch("password")) return true;
                  return (
                    value === watch("password") || "Passwords do not match"
                  );
                },
              }}
            />

            <div className="relative">
              <Input
                id="fullName"
                type="text"
                placeholder=" "
                {...register("fullName", {
                  required: "Full name is required",
                })}
                className="peer h-[40px] w-full bg-[#25292E] border border-[#363636]
              text-white text-sm px-3 pt-6 pb-2 rounded-sm 
             focus:outline-none mb-1
              placeholder-transparent"
              />
              <label
                htmlFor="fullName"
                className="absolute left-3 top-3 text-[#a8a8a8] text-sm
                transition-all duration-200
                peer-focus:top-1 peer-focus:text-xs
                peer-not-placeholder-shown:top-1 cursor-text
                peer-not-placeholder-shown:text-xs"
              >
                Full name
              </label>
            </div>

            <div className="relative">
              <Input
                id="username"
                type="text"
                placeholder=" "
                {...register("username", {
                  required: "Username is required",
                  pattern: {
                    value: /^[a-z0-9_]+$/,
                    message:
                      "Username can only contain lowercase letters, numbers and _",
                  },
                })}
                className="peer h-[40px] w-full bg-[#25292E] border border-[#363636]
                text-white text-sm px-3 pt-6 pb-2 rounded-sm 
                focus:outline-none
                placeholder-transparent"
              />
              <label
                htmlFor="username"
                className="absolute left-3 top-3 text-[#a8a8a8] text-sm
                transition-all duration-200
                peer-focus:top-1 peer-focus:text-xs
                peer-not-placeholder-shown:top-1 cursor-text
                peer-not-placeholder-shown:text-xs"
              >
                Username
              </label>
            </div>
          </div>

          <p className="text-xs text-[#a8a8a8] mt-4 leading-4">
            People who use our service may have uploaded your contact
            information to Instagram.{" "}
            <span className="text-[#708DFF] cursor-pointer">Learn More</span>
          </p>

          <p className="text-xs text-[#a8a8a8] mt-3 leading-4 mb-3">
            By signing up, you agree to our{" "}
            <span className="text-[#708DFF]">Terms</span>,{" "}
            <span className="text-[#708DFF]">Privacy Policy</span> and{" "}
            <span className="text-[#708DFF]">Cookies Policy</span>.
          </p>

          {/* sign up */}
          <SubmitButton label="Sign up" disabled={!isValid} />
          {successMessage && (
            <p className="text-sm text-green-500 text-center mt-3">
              {successMessage}
            </p>
          )}

          {serverError && (
            <p className="text-sm text-red-500 text-center mb-3">
              {serverError}
            </p>
          )}
        </div>

        {/* footer */}
        <div className="border border-[#262626] bg-[#0C1014] py-4 mt-3 text-center">
          <p className="text-white text-sm">
            Have an account?{" "}
            <Link to="/" className="text-[#708DFF] font-semibold">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}
