import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/store/authSlice";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export default function RegisterForm({ open, onClose }) {
  if (!open) return null;

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    console.log('data', data);
    
    dispatch(login(data)).then((res) => {
      console.log('result', res);
      
      if (res.meta.requestStatus === "fulfilled") {
        onClose();
      }
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const onSubmit = async (data) => {
  //   console.log(data);

  //   try {
  //     const res = await axios.post(
  //       "https://api.escuelajs.co/api/v1/auth/login",
  //       {
  //         email: data.email,
  //         password: data.password,
  //       }
  //     );

  //     localStorage.setItem("access_token", res.data.access_token);
  //     localStorage.setItem("refresh_token", res.data.refresh_token);

  //     alert("Login success");
  //     onClose();
  //   } catch (error) {
  //     alert("Email or password incorrect");
  //   }
  // };
  // console.log(errors);

  return (
    <div className="fixed inset-0 z-99999 flex items-center justify-center">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative bg-white w-[420px] rounded-xl shadow-lg p-6 z-10 mb-5"
      >
        <div>
          <h2 className="text-xl font-bold text-center mb-5">Login</h2>
          <Button
            onClick={onClose}
            className="absolute text-gray-400 bg-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-black top-3 right-3 text-xl"
          >
            &times;
          </Button>
        </div>
        <div>
          <p className="text-sm mb-1">Email</p>
          <Input
            type="text"
            placeholder="Enter ur email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "The email is not in the correct format",
              },
            })}
          />
          {/* {errors?.email?.message && <p className="text-red-500">{errors.email.message}</p>} */}
          <p className="min-h-[10px] text-sm text-red-500">
            {errors?.email?.message || ""}
          </p>
        </div>
        <div className="mt-3">
          <p className="text-sm mb-1">Password</p>
          <Input
            type="password"
            placeholder="Enter ur password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be 8 characters or more",
              },
            })}
          />
          {/* {errors?.password?.message && <p className="text-red-500">{errors.password.message}</p>} */}
          <p className="min-h-[10px] text-sm text-red-500">
            {errors?.password?.message || ""}
          </p>
        </div>
        <Button type="submit" disabled={loading} className="w-full mt-2">
          {loading ? "Loading.." : "Login"}
        </Button>

        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}
      </form>
    </div>
  );
}
