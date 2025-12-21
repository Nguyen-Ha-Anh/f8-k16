import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(true)

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setLoadingDetail(true)

    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setCurrentIndex(0);
        setLoadingDetail(false)
      })

      .catch(() => {
        setProduct(null)
        setLoadingDetail(false)
      });
  }, [id]);


  if (loadingDetail) {
    return (
      <div className="p-6 text-center text-gray-500">Loading product..</div>
    )
  }
  
  if (!product) return <NotFound />;

  const images = product.images;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev === images.length - 1 ? 0 : prev + 1)
  }

  return (
    <div>
      <div className="p-6 mx-auto select-none">
        <h1 className="text-2xl font-bold mb-3">Product Detail</h1>

        {/* images */}
        <div className="relative w-full bg-gray-100">
          <img
            src={images[currentIndex]}
            className="w-full h-full object-contain"
          />

          {/* button */}
          <button
            onClick={handlePrev}
            className="absolute bg-black left-2 top-1/2 -translate-y-1/2 text-white px-3 py-1 rounded-md"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            className="absolute bg-black right-2 top-1/2 -translate-y-1/2 text-white px-3 py-1 rounded-md"
          >
            Next
          </button>
        </div>

        {/* thumb */}
        <div className="flex gap-3 mt-4 justify-center">
          {images.map((img, index) => (
            <img
            key={index}
              src={img}
              onClick={() => setCurrentIndex(index)}
              className={`w-30 h-30 object-cover cursor-pointer border${index === currentIndex ? '' : 'border-gray-500'}`}
            />
          ))}
        </div>
        <h1 className="text-2xl font-bold mt-5">{product.title}</h1>
        <p className="text-gray-500 mt-2">{product.description}</p>
        <p className="text-red-500 mt-2 text-xl">{product.price}</p>

        <p className="mt-2">Brand: {product.brand}</p>
        <p>Category: {product.category}</p>
      </div>
    </div>
  );
}
