import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../store/cartActions";

export default function Header() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const [bought, setBought] = useState(false)

  useEffect(() => {
    if (totalQuantity === 0) return
    setBought(true)
    const timer = setTimeout(() => setBought(false), 300)
    return () => clearTimeout(timer)
  }, [totalQuantity])
  return (
    <div>
      <header className="flex items-center justify-between px-6 py-5">
        <h2 className="text-2xl font-bold">Redux Shopping Cart</h2>

        <div className="cursor-pointer relative" onClick={() => dispatch(toggleCart())}>
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {totalQuantity > 0 && (
            <span className={`absolute -top-2 -right-2
              bg-gray-500 text-white text-xs
              w-5 h-5 flex items-center justify-center
              rounded-full
              ${bought ? "animate-bounce" : ""}`}>{totalQuantity}</span>
          )}
        </div>
      </header>
    </div>
  );
}
