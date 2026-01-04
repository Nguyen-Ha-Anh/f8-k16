import React from 'react'
import { discountData } from './discountData'
import DiscountCard from './DiscountCard'

export default function DiscountSection({activeTab}) {
  return (
    <div>
        <div className='grid grid-cols-3 gap-6'>
            {discountData[activeTab]?.map(item => (
                <DiscountCard key={item.id} item={item}/>
            ))}
        </div>
    </div>
  )
}
