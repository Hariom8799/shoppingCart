// components/Cart.tsx
'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartcontextProvider'
import CartItem from '@/components/CartItem'
import NavBar from '@/components/NavBar'

const Cart = () => {
    const { cart, total } = useCart()
    const [totalAmount, setTotalAmount] = useState(0)

    useEffect(() => {
        setTotalAmount(total)
    }, [total])

    const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };


    return (
        <div className='min-h-[100vh] overflow-hidden'>
            <NavBar onSearch={handleSearch}/>
            {cart.length > 0 ? (
                <div className='w-10/12 max-w-[1080px] flex gap-5 justify-between mx-auto py-14'>
                    <div>
                        {cart.map((item, index) => (
                            <CartItem item={{ ...item}} key={index} />
                            
                        ))}
                    </div>
                    <div className='flex flex-col h-[100%] min-w-[450px] pl-10 justify-between'>
                        <div className='pt-10'>
                            <p className='text-xl text-green-800 font-bold'>YOUR CART</p>
                            <p className='text-5xl text-green-700 font-bold mt-3'>SUMMARY</p>
                            <p className='text-xl font-semibold text-gray-700 mt-8'>Total Items: {cart.length }</p>
                        </div>
                        <div className='w-full flex flex-col gap-5'>
                            <p className='text-xl font-semibold text-gray-700 mt-8'>Total Amount: ${totalAmount.toFixed(2)}</p>
                            <button className='text-xl font-bold text-white bg-green-600 py-3 rounded-md hover:bg-white border-2 hover:border-green-600 hover:text-green-700 transition-all duration-200'>
                                CheckOut Now
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='w-[100vw] h-[80vh] flex justify-center items-center flex-col gap-5'>
                    <p className='text-2xl font-bold opacity-80'>Cart is Empty</p>
                    <Link href='/'>
                        <button className='py-3 px-5 text-xl font-bold text-white bg-green-500 rounded-md'>Shop Now</button>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Cart