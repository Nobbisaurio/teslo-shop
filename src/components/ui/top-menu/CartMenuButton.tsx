'use client';

import { useCartStore } from '@/store/cart/cart-store';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoCartOutline } from 'react-icons/io5';



export const CartMenuButton = () => {

  const [ isLoaded, setIsLoaded ] = useState( false );

  useEffect( () => {

    setIsLoaded( true );

  }, [] );


  const totalItems = useCartStore( state => state.getTotalItems() );


  return (
    <Link href={ (totalItems === 0) && isLoaded ? '/empty' : '/cart' } className='mx-2'>
      <div className='relative'>
        {
          // el isLoaded es para prevenir el error de hidratacion

          ( isLoaded && totalItems > 0 ) && (
            <span className='absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white'>
              { totalItems }
            </span>
          )
        }
        <IoCartOutline className='w-5 h-5' />
      </div>
    </Link>
  );
};