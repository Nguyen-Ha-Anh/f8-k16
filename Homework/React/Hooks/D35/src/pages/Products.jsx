import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import NotFound from "./NotFound";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 30;
  // const [skip, setSkip] = useState(0);

  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [totalPage, setTotalPage] = useState(0);

  const [search, setSearch] = useSearchParams();
  //neu url khong co page --> set page = 1 la mac dinh
  const page = Number(search.get("page") || 1);
  if (page < 1) return <NotFound />;

  const skip = (page - 1) * limit;

  const keyword = search.get("search") || "";

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch({
        page: 1,
        search: inputValue,
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    setLoading(true);

    const url = keyword
      ? `https://dummyjson.com/products/search?q=${keyword}&limit=${limit}&skip=${skip}`
      : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setTotalProducts(data.total);

        const pages = Math.ceil(data.total / limit);
        setTotalPage(pages);
        setLoading(false)
      });
  }, [page, keyword]);

  if (!loading && totalPage > 0 && page > totalPage) return <NotFound/>

  const handleChangePage = (p) => {
    // setSkip(page - 1) * limit
    // const newSkip = (page - 1) * limit;

    setSearch({
      page: p,
      search: keyword,
    });
  };

  return (
    <div className="p-6 select-none">
      <h1 className="text-2xl font-bold mb-3">Products</h1>
      {/* search */}
      <div>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          name="search"
          type="text"
          placeholder="Search.."
          className="w-full mb-6 p-2 border rounded focus:outline-none"
        />
      </div>

      {loading && (
        <div className="text-gray-500 py-10 text-center">Loading...</div>
      )}

      {!loading && (
        <div className="grid grid-cols-4 gap-4">
          {products.map((item) => (
            <div key={item.id} className="border rounded p-3">
              <img src={item.thumbnail} className="h-32 w-full object-cover" />
              <h2 className="font-semibold mt-2">{item.title}</h2>
              <p className="text-red-500">${item.price}</p>
              <div className="mt-2">
                <Link
                  to={`/products/${item.id}`}
                  className="border rounded-md p-1 cursor-pointer hover:bg-gray-400 hover:text-[#fff] font-serif"
                >
                  More
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Pagination */}
      <div className=" flex gap-2 mt-6 justify-center">
        {Array.from({ length: totalPage }).map((item, i) => {
          const pageNum = i + 1;
          const isActive = pageNum === page;

          return (
            <button
              key={pageNum}
              onClick={() => handleChangePage(pageNum)}
              className={`px-3 py-1 border rounded-md
                ${isActive ? "bg-gray-400 text-[#fff]" : ""}`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
