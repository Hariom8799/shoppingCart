'use client'
import { useCart } from '@/context/CartcontextProvider';
import Link from 'next/link';
import React, { FormEvent, useState } from 'react'
import {ShoppingCart} from 'lucide-react'

interface navBarProp {
    onSearch : (searchText : string) => void
}

const NavBar = ({onSearch} : navBarProp) => {
    const [searchText, setSearchText] = useState('');
    const {cart} = useCart();
    

    const handleSearch = (e : FormEvent)=>{
        e.preventDefault();
        onSearch(searchText);
    }

  return (
    
    <div className='w-full bg-slate-900'>
      <div className='flex justify-between items-center mx-5 py-5'>
        <Link href='/'>
            <h1 className='text-2xl text-white font-bold cursor-pointer'>Ecommerce</h1>
        </Link>

        <div className='flex gap-5 items-center relative'>
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              placeholder="Search products..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Search
            </button>
          </form>

          <Link href='/'>
            <span className="text-md text-white hover:text-green-500 transition-all duration-200">Home</span>
          </Link>

          <Link href='/cart'>
            <div className='relative'>
              <ShoppingCart className='text-2xl text-white hover:text-green-500 transition-all duration-200'/>
              {cart.length > 0 && 
                <span className='absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex 
                justify-center items-center animate-bounce rounded-full text-white'>
                  {cart.length}
                </span>
              }
            </div>
          </Link>
        </div>
      </div>
    </div>
    
  )
}

export default NavBar
