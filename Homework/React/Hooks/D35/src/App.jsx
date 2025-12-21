import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Nav from "./components/Nav";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
export default function App() {
  return (
    <>
      <Nav />
      <div className="w-full">
        <div className="mx-auto max-w-6xl p-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/introduction" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </div>
      </div>
    </>
  );
}
