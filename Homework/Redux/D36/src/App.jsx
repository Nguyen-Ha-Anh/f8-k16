import Header from "./components/Header";
// import ProductItem from "./components/ProductItem";
import Cart from "./components/Cart";
import { products } from "./data/products";
import ProductList from "./components/ProductList";

export default function App() {
  return (
    <>
      <Header />
      <ProductList />
      <Cart/>
    </>
  );
}
