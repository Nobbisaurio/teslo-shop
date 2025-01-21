'use client' 

import { useState } from 'react';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Props{
  quantity: number;
  availableQuantity: number;


  onQuantityChange: (quantity:number)=>void
}


export const QuantitySelector = ({availableQuantity,onQuantityChange,quantity}:Props) => {
  

  const IncreDecreCount = ( value:number )=>{
    if(quantity + value < 1 || quantity + value > availableQuantity  ) return;
    
    onQuantityChange(quantity + value)
  }
  
  return (
    <div className='flex'>
      <button
        onClick={()=>IncreDecreCount(-1)}
      >
        <IoRemoveCircleOutline size={30}/>     
      </button>

      <span className='w-20 mx-3 px-5 bg-gray-100 text-center border-2 border-black rounded'>
        {quantity}
      </span>

      <button
        onClick={()=>IncreDecreCount(+1)}
      >
        <IoAddCircleOutline size={30}/>
      </button>

    </div>
  )
}