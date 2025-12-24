import React from 'react'
import { products } from '../data/products'
import ProductItem from './ProductItem'

export default function ProductList() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6'>
        {products.map((product) => (
            <ProductItem key={product.id}
            product={product}/>
        ))}
    </div>
  )
}
