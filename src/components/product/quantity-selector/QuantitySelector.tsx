'use client' 

import { useState } from 'react';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Props{
  selectedQuantity: number;
  availableQuantity: number;
}


export const QuantitySelector = ({availableQuantity,selectedQuantity}:Props) => {
  
  const [count, setCount] = useState(selectedQuantity)

  const IncreDecreCount = ( value:number )=>{
    if(count + value < 1 || count + value > availableQuantity  ) return;
    setCount(count + value)
  }
  
  return (
    <div className='flex'>
      <button
        onClick={()=>IncreDecreCount(-1)}
      >
        <IoRemoveCircleOutline size={30}/>     
      </button>

      <span className='w-20 mx-3 px-5 bg-gray-100 text-center border-2 border-black rounded'>
        {count}
      </span>

      <button
        onClick={()=>IncreDecreCount(+1)}
      >
        <IoAddCircleOutline size={30}/>
      </button>

    </div>
  )
}