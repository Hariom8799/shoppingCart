// components/CartItem.tsx
'use client'
import { useCart } from '@/context/CartcontextProvider'
import React from 'react'
import {Trash} from 'lucide-react'


const CartItem = ({ item } : any) => {
  const { removeFromCart, updateQuantity } = useCart()

  function handleRemoveFromCart() {
    removeFromCart(item._id)
  }

  return (
    <div className='border-b-2 border-gray-700'>
      <div className='w-full flex justify-between gap-10 items-center py-5 px-3'>
        <img src={item.product.image} alt={item.product.name} width={"150px"} />
        <div className='flex flex-col gap-3 '>
          <h2 className='text-xl text-gray-700 font-semibold'>{item.product.name}</h2>
          <div className='flex justify-between items-center'>
            <p className='text-md font-bold text-green-600'>${item.product.price.toFixed(2)}</p>
            <div className='flex items-center gap-2'>
              <button
                onClick={() => updateQuantity(item, item.quantity - 1)}
                className='px-2 py-1 bg-gray-200 rounded'
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item, item.quantity + 1)}
                className='px-2 py-1 bg-gray-200 rounded'
              >
                +
              </button>
            </div>
            <button
              className='p-2 rounded-full flex justify-center items-center bg-red-300'
              onClick={handleRemoveFromCart}
            >
              <Trash className='text-red-900' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem