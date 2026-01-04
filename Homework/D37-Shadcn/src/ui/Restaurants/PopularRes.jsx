import React from 'react'
import RestaurantCard from './RestaurantCard'

const restaurants = [
    {title: 'McDonald’s London ', img: '/images/mcDonald.png'},
    {title: 'Papa Johns', img: '/images/papa.png'},
    {title: 'KFC West London', img: '/images/kfc.png'},
    {title: 'Texas Chicken', img: '/images/texas.png'},
    {title: 'Burger King', img: '/images/king.png'},
    {title: 'Shaurma 1', img: '/images/shaurma.png'},
]

export default function PopularRes() {
  return (
    <div>
        <div className='container'>
            <h2 className='text-3xl font-bold font-poppins mb-8'>Popular Restaurants</h2>

            <div
            className='
            grid
            gap-6
            [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]'>
                {restaurants.map((res, index) => (
                    <RestaurantCard key={index} {...res}/>
                ))}
            </div>
        </div>
    </div>
  )
}
