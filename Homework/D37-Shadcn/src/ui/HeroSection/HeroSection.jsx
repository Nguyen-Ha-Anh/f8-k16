import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import Notification from "./Notification";
import RegisterForm from "../Form/RegisterForm";

export default function HeroSection() {
    const [openLogin, setOpenLogin] = useState(false)

  return (
    <div className="container relative bg-[#FBFBFB] border rounded-lg flex items-center min-h-[610px]">
      {/* left */}
      <div className="px-12 w-1/2">
        <div className="font-poppins">
          <p>Order Restaurant food, takeaway and groceries.</p>
          <p className="text-[54px] font-semibold">Feast Your Senses,</p>
          <p className="text-[#FC8A06] text-[54px] font-semibold">
            Fast and Fresh
          </p>
        </div>

        <div>
          <p className="mt-10 mb-3">Enter a postcode to see what we deliver</p>
          <div className="flex max-w-md relative">
            <Input
              className="rounded-full w-[373px] h-[57px] px-5"
              placeholder="Search.."
            />
            <Button
              className="bg-[#FC8A06] absolute right-1 rounded-full
              w-[188px] h-[57px] font-bold hover:bg-orange-500"
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* right */}
      <div className="relative w-1/2 min-h-[610px] overflow-visible">
        <div
          className="absolute bg-[#FC8A06] rounded-tl-[300px]
          top-[45px] right-0 w-[626px] h-[565px]"
        />

        <div className="absolute bottom-0 z-10 w-[377px] h-[455px]">
          <img
            src="/images/hero1.png"
            alt="Hero 1"
            className="w-full h-full object-cover object-bottom translate-x-32 rounded-t-xl"
          />
        </div>
        <Notification
          logo="/images/logo.png"
          title="We’ve Received your order!"
          content="Awaiting Restaurant acceptance"
          className="top-28 left-72"
          icon="/images/donut.png"
          iconClass="w-[12px] h-[12px] absolute top-16 left-[195px]"
        />
        <Notification
          logo="/images/logo.png"
          title="Order Accepted! "
          content="Your order will be delivered shortly"
          className="top-40 left-95"
          icon="/images/success.png"
          iconClass="w-[17px] h-[17px] top-10 left-40"
        />
        <Notification
          logo="/images/logo.png"
          title="Your rider’s nearby 🎉"
          content="They’re almost there - get ready!"
          className="top-[220px] left-80"
        />
      </div>

      {/* middle */}
      <div className="absolute w-[805px] h-[537px] bottom-0 left-1/2">
        <img
          src="/images/hero2.png"
          alt="Hero 2"
          className="absolute w-full h-full z-999 object-cover object-bottom -translate-x-1/2"
        />
      </div>

      <RegisterForm open={openLogin} onClose={() => setOpenLogin(false)}/>
    </div>
  );
}
