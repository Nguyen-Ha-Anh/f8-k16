import React from "react";
import Header from "./ui/Header";
import HeroSection from "./ui/HeroSection/HeroSection";
import Discount from "./ui/Discount/Discount";
import RegisterForm from "./ui/Form/RegisterForm";
import CategorySection from "./ui/Category/CategorySection";
import PopularRes from "./ui/Restaurants/PopularRes";
import Download from "./ui/Download/Download";
import Signup from "./ui/SignupPartner/Signup";

export default function App() {
  return (
    <div>
      <Header />
      <RegisterForm/>
      <HeroSection />
      <Discount />
      <CategorySection/>
      <PopularRes/>
      <Download/>
      <Signup/>
    </div>
  );
}
