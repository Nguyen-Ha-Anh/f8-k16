import { useDispatch } from "react-redux";
import { addCart } from "../store/cartActions";
import { useState } from "react";

export default function ProductItem({ product }) {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    dispatch(addCart(product));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="border rounded-lg p-4">
      <img className="" src={product.thumbnail} />
      <h3 className="font-semibold text-center">{product.title}</h3>
      <p className="text-gray-500 mt-4 text-center">${product.price}</p>
      <button className="border w-full rounded-md" onClick={handleAdd} disabled={added}>
        {added ? "Added" : "Add To Cart"}
      </button>
    </div>
  );
}
