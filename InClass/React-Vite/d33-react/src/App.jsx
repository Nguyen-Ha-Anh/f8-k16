import React, { useEffect, useState } from "react";
import Header from "./component/Header";

// let a = 0;
export default function App() {
  const [count, setCount] = useState(0);
  const [isLogin, setLogin] = useState(false);
  const [isLoading, setLoading] = useState(true)
  const handleIncrement = () => {
    setCount(count + 1);
    // if (a < 5) a++;
  };
  console.log(`re-render ${count}`);
  // useEffect(() => {
  //   window.addEventListener('scroll', () => {
  //     console.log(count);
  //   })
  // }, [a]);

  // useEffect(() => {
  //   console.log(`effect : ${count}`);
  //   //cleanup
  //   return () => {
  //     console.log(`cleanup: ${count}`);
  //   }
  // })

  useEffect(() => {
    console.log("effect", count);
    const setLoginStatus = () => {
      setTimeout(() => {
        setLogin(localStorage.getItem("is_login") === "true" ? true : false);
        setLoading(false);
      }, 1000);
    };
    setLoginStatus();
  }, []);

  return (
    <div style={{ height: "2000px" }}>
      {console.log("UI update", count)}
      <Header />
      {isLogin ? (
        <>
          <h1>Count: {count}</h1>
          <button onClick={handleIncrement}>+</button>
        </>
      ) : (
        <div>
          <h2>Vui long dang nhap</h2>
        </div>
      )}
    </div>
  );
}

//an de hien thi func: rfc + tab

//useEffect(callback, depedencies)

//Flow React: State -> Trigger -> Re-render -> UI Update
//Side Effect: Cac logic khong nam trong luong chinh cua viec update giao dien
// - storage
// - http request
// - timer: setTimeout, setInterval,..
// - eventListener
// => cac cong viec side effect phai duoc thuc hien sau render

//Hook useEffect dung de quan ly cac side effect
// TH1: depedencies = null || undefined --> KHi component re-render ---> callback effect se chay
// TH2: depedencies = [] --> call back effect chi chay sau first render
// TH3: depedencies = [bien1, bien2,...] --> Khi 1 trong cac bien duoc khai bao chay --> callback effect se chay

//moi truong func chi chay 1 lan
// StrictMode: / che doo nghiem ngat/: giup phat hien loi

//so sanh nguyen thuy chi so sanh gia tri
// object so sanh theo kieu tham chieu

//snapshot

//Thu tu chay useEffect
// 1. State thay doi
// 2. Component Re-render
// 3. UI update
// 4. cleanup (neu co): chi bat dau chay tu lan thu 2
// 5. callback effect

//defer

//Thu tu chay useLayoutEffect
// 1. State thay doi
// 2. Component Re-render
// 3. cleanup (neu co): chi bat dau chay tu lan thu 2
// 5. callback effect
// 4. UI update (Browser Repaint)
