import React from 'react'

export default function CategoryCard({title, amount, img}) {
  return (
    <div>
        <img src={img} alt={title}
        className='w-[238px] h-[203px] object-cover rounded-t-2xl' 
        />

        <div className='p-5 bg-[#F5F5F5] rounded-b-2xl'>
            <h3 className='font-semibold text-sm'>{title}</h3>
            <p className='text-[#FC8A06] text-xs mt-1'>{amount} Restaurants</p>
        </div>
    </div>
  )
}
