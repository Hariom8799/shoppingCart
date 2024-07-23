import React from 'react'
// import {Product} from '@/types/Product';
import { useCart } from '@/context/CartcontextProvider'



const Card = ({product} : any) => {

  const {addToCart } = useCart();

  return (
    <div className=' p-3 flex flex-col items-center justify-between rounded-lg hover:scale-110 transition-all duration-500 group card-shadow-1 '>
        <div className='space-y-2 py-2 px-5'>
          <h2 className='text-md font-bold'>{product.name}</h2>
          
          <div className='h-[180px]'>
            <img src={product.image} alt="" className='h-full w-full object-contain'/>
          </div>
        </div>
        <div className='w-full flex justify-between px-3 py-2'>
            <p className='text-md font-bold text-green-500 '>${product.price}</p>
            <div>       
                <button onClick={()=>addToCart(product,1)} className='border-2 border-black opacity-70 rounded-full px-3 py-1 text-sm font-bold  group-hover:bg-black group-hover:opacity-70 group-hover:text-white transition-all duration-200 '>
                Add to Cart
                </button>              
            </div>
                
            
        </div>
        
    </div>
  )
}

export default Card
