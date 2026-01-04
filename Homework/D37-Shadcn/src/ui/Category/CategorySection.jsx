import React from "react";
import CategoryCard from "./CategoryCard";

const categories = [
  {title: 'Burgers & Fast food', amount: 21, img: '/images/burgerCate.png'},
  {title: 'Salads', amount: 32, img: '/images/salads.png'},
  {title: 'Pasta & Casuals', amount: 4, img: '/images/pasta.png'},
  {title: 'Pizza', amount: 32, img: '/images/pizaakkk.png'},
  {title: 'Breakfast', amount: 4, img: '/images/breakfast.png'},
  {title: 'Soups', amount: 32, img: '/images/soups.png'},
]
export default function CategorySection() {
  return (
    <div>
      <div className="container">
        <div className="text-3xl font-bold font-poppins">
          <h2 className="mb-8">Order.uk Popular Categories 🤩</h2>

          <div
          className="
          grid 
          gap-6
          [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]">
            {categories.map((item, index) => (
              <CategoryCard key={index} {...item}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
