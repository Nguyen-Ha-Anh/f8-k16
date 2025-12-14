import React, { useEffect, useState } from "react";

export default function Content() {
  const [count, setCount] = useState(localStorage.getItem("count") ?? 0);

  const handleIncrement = () => {
    setCount(+count + 1);
  };

  useEffect(() => {
    localStorage.setItem("count", count);
    // const countLocal = +localStorage.getItem("count");
    // if (countLocal) setCount(countLocal);
  }, [count]);
  useEffect(() => {
    return () => {
        localStorage.removeItem('count');
    }
  }, []);

  // useEffect(() => {
  //     console.log('Content Mounting');

  //     return () => {
  //         console.log('COntent Unmounting');

  //     }
  // }, []);
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleIncrement}>+</button>
      <hr />
    </div>
  );
}

//Component Lifecycle
// 1. Mounting --> ln render dau tien(Component duoc dua vao DOM)
// 2. Updating --> tu lan re-render thu 2 tro di
// 3. Unmounting --> COmponent bi loai khoi DOM
