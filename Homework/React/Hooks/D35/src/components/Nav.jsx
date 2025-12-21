import React from "react";
import { Link, NavLink } from "react-router-dom";
import './Nav.css'

export default function Nav() {
  return (
    <div className="w-full border-b">
      <div className="mx-auto max-w-6xl px-5 h-15 flex justify-center items-center gap-10">
        <NavLink to="/" className='font-medium text-gray-400'>Home</NavLink>
        <NavLink to="/introduction" className='font-medium text-gray-400'>About</NavLink>
        <NavLink to="/products" className='font-medium text-gray-400'>Products</NavLink>
        <NavLink to="/contact" className='font-medium text-gray-400'>Contact</NavLink>
      </div>
    </div>
  );
}
