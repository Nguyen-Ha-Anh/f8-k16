import { useSelector, useDispatch } from "react-redux";
import {
  toggleCart,
  increQuantity,
  decreQuantity,
  removeCart,
} from "../store/cartActions";

export default function Cart() {
  //lay state toan bo redux
  const { items, isOpen } = useSelector((state) => state);
  const dispatch = useDispatch();

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
    >
      <div className="flex justify-between items-center p-3 border-b">
        <h3 className="font-bold text-lg">Your Cart</h3>
        <button onClick={() => dispatch(toggleCart())}>
          <svg
            fill="#000000"
            width="24px"
            height="24px"
            viewBox="0 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM21.657 10.344c-0.39-0.39-1.023-0.39-1.414 0l-4.242 4.242-4.242-4.242c-0.39-0.39-1.024-0.39-1.415 0s-0.39 1.024 0 1.414l4.242 4.242-4.242 4.242c-0.39 0.39-0.39 1.024 0 1.414s1.024 0.39 1.415 0l4.242-4.242 4.242 4.242c0.39 0.39 1.023 0.39 1.414 0s0.39-1.024 0-1.414l-4.242-4.242 4.242-4.242c0.391-0.391 0.391-1.024 0-1.414z"></path>
          </svg>
        </button>
      </div>

      {items.length === 0 ? (
        <p>No products in cart</p>
      ) : (
        <>
          <div>
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-4"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-20 h-20"
                />
                <div>
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-gray-500">
                    {" "}
                    {item.price * item.quantity}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="px-2 border"
                    onClick={() => dispatch(decreQuantity(item.id))}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="px-2 border"
                    onClick={() => dispatch(increQuantity(item.id))}
                  >
                    +
                  </button>
                </div>

                <button
                  className="p-5"
                  onClick={() => dispatch(removeCart(item.id))}
                >
                  x
                </button>
              </div>
            ))}
          </div>

          <div className="bg-gray-300">
            <h3>Total: {totalPrice}</h3>
          </div>
        </>
      )}
    </div>
  );
}
