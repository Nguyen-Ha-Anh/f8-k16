import { Input } from "../ui/input";
import { Link } from "react-router-dom";
import PasswordInput from "../form/PasswordInput";
import { useForm } from "react-hook-form";
import type { LoginFormData } from "@/types/AuthType";
import SubmitButton from "../form/SubmitButton";

export default function LoginForm() {
  // const [password, setPassword] = useState<string>('')

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm<LoginFormData>({
    mode: "onChange",
  });

  const passwordValue = watch("password") || "";

  const onSubmit = (data: LoginFormData) => {
    console.log("login", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen w-full bg-background text-foreground flex items-center justify-center"
    >
      <div className="w-full flex max-w-[935px]">
        {/* left */}
        <div className="flex w-1/2 items-center justify-center">
          <img
            src="/theme.png"
            alt="Instagram preview"
            className="max-w-[380px]"
          />
        </div>

        {/* right */}
        <div className="w-1/2 flex items-center justify-center">
          <div className="w-[300px]">
            <h1
              style={{ fontFamily: "Lobster, cursive" }}
              className="font-instagram bg-background text-foreground text-[48px] text-center mb-8"
            >
              Instagram
            </h1>

            {/* username */}
            <div className="relative">
              <Input
                id="username"
                type="text"
                placeholder=" "
                {...register("identifier", {
                  required: true,
                })}
                className="peer h-[40px] w-full bg-background text-foreground border border-[#363636]
              text-white text-sm px-3 pt-6 pb-2 rounded-sm 
             focus:outline-none <mb-1></mb-1>
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
                Phone number, username, or email
              </label>
              <p className="min-h-[10px] text-sm text-red-500">
                {errors?.identifier?.message || ""}
              </p>
            </div>

            {/* password */}
            <div className="relative mb-2">
              <PasswordInput<LoginFormData>
                register={register}
                name="password"
                error={errors.password?.message}
                value={passwordValue}
              />
            </div>

            {/* login button */}

            <SubmitButton label="Log in" disabled={!isValid} />

            {/* or */}
            <div className="flex items-center my-5">
              <div className="flex-1 h-px bg-background text-foreground " />
              <span className="mx-4 text-xs font-semibold text-foreground">
                OR
              </span>
              <div className="flex-1 h-px bg-[#262626]" />
            </div>

            {/* facebook login */}
            <div className="flex items-center justify-center gap-1 text-[#0095F6] font-semibold text-sm cursor-pointer">
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 12.05C19.9813 10.5255 19.5273 9.03809 18.6915 7.76295C17.8557 6.48781 16.673 5.47804 15.2826 4.85257C13.8921 4.2271 12.3519 4.01198 10.8433 4.23253C9.33473 4.45309 7.92057 5.10013 6.7674 6.09748C5.61422 7.09482 4.77005 8.40092 4.3343 9.86195C3.89856 11.323 3.88938 12.8781 4.30786 14.3442C4.72634 15.8103 5.55504 17.1262 6.69637 18.1371C7.83769 19.148 9.24412 19.8117 10.75 20.05V14.38H8.75001V12.05H10.75V10.28C10.7037 9.86846 10.7483 9.45175 10.8807 9.05931C11.0131 8.66687 11.23 8.30827 11.5161 8.00882C11.8022 7.70936 12.1505 7.47635 12.5365 7.32624C12.9225 7.17612 13.3368 7.11255 13.75 7.14003C14.3498 7.14824 14.9482 7.20173 15.54 7.30003V9.30003H14.54C14.3676 9.27828 14.1924 9.29556 14.0276 9.35059C13.8627 9.40562 13.7123 9.49699 13.5875 9.61795C13.4627 9.73891 13.3667 9.88637 13.3066 10.0494C13.2464 10.2125 13.2237 10.387 13.24 10.56V12.07H15.46L15.1 14.4H13.25V20C15.1399 19.7011 16.8601 18.7347 18.0985 17.2761C19.3369 15.8175 20.0115 13.9634 20 12.05Z"
                  fill="#0095F6"
                />
              </svg>
              Log in with Facebook
            </div>

            {isSubmitted && isValid && (
              <div className="text-red-500 text-sm mt-2 text-center">
                <p>Sorry, your password was incorrect.</p>
                <p> Please double-check your password.</p>
              </div>
            )}

            {/* forgot password */}
            <p className="text-center font-semibold text-sm hover:underline text-white mt-6 cursor-pointer">
              Forgot password?
            </p>

            {/* sign up */}
            <p className="text-center text-sm text-white mt-10">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-[#708DFF] font-semibold cursor-pointer"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
