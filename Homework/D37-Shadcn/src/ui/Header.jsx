import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import RegisterForm from "./Form/RegisterForm";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/authSlice";

export default function Header() {
  const [openLogin, setOpenLogin] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className="container">
      <div className="px-6 flex justify-between items-center">
        <div>
          <img
            src="/images/logo.png"
            alt="Logo Order UK"
            className="h-[53px] w-[215px]"
          />
        </div>
        <div className="flex gap-20 font-medium font-poppins text-lg cursor-pointer">
          <div className="flex gap-15 items-center">
            <Button
              className="
          bg-[#FC8A06]
          rounded-full
          w-[127px]
          h-[45px]
          text-lg
          hover:bg-orange-500
          "
            >
              <a href="/">Home</a>
            </Button>
            <a>Browse Menu</a>
            <a>Special Offers</a>
            <a>Restaurants</a>
            <a>Track Order</a>
          </div>
          <div>
            {!user ? (
              <Button
                onClick={() => setOpenLogin(true)}
                className="
          flex
          items-center
          w-[234px]
          h-[61px]
          gap-5
          rounded-full
          text-lg
          cursor-pointer"
              >
                <img
                  className="w-[30.97px] h-[27px]"
                  src="/images/user.png"
                  alt="User image"
                />

                <span>Login / Signup</span>
              </Button>
            ) : (
              <div className="flex gap-4 items-center">
                <span>Hi, {user.name}</span>
                <Button
                  onClick={handleLogout}
                  className="
                  flex
                  items-center
                  w-[234px]
                  h-[61px]
                  gap-5
                  rounded-full
                  text-lg
                  cursor-pointer"
                >
                  Logout
                </Button>
                
              </div>
            )}
          </div>
        </div>
      </div>
      <RegisterForm open={openLogin} onClose={() => setOpenLogin(false)} />
    </div>
  );
}
