import React from 'react'

export default function RestaurantCard({title, img}) {
  return (
    <div>
        <img src={img} alt={title}
        className='
        w-[238px] h-[203px] object-cover rounded-t-2xl'
        />

        <div className='p-5 bg-[#FC8A06] rounded-b-2xl'>
            <h3 className='font-bold text-white text-center font-poppins'>{title}</h3>
        </div>
    </div>
  )
}
