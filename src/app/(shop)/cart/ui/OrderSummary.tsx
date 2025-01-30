'use client';
import { useCartStore } from '@/store/cart/cart-store';
import { currencyFormater } from '@/utils/currencyFormater';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export const OrderSummary = () => {


  const [ loading, setLoading ] = useState( false );
  const { getSumaryInformation } = useCartStore();

  const { itemsInCart, subTotal, taxes, total } = getSumaryInformation();

  useEffect( () => {

    setLoading( true );

  }, [] );

  if ( !loading ) {
    return <p>Loading...</p>;
  }



  return (
    <div className='bg-white rounded-xl shadow-xl p-7 h-fit'>
      <h2 className='text-2xl mb-2'>Resumen de orden</h2>
      <div className='grid grid-cols-2'>
        <span>No. Productos</span>
        <span className='text-right'>{ itemsInCart === 1 ? `${itemsInCart} Articulo` : ` ${itemsInCart} Articulos` }</span>

        <span>Subtotal</span>
        <span className='text-right'>{ currencyFormater(subTotal)  }</span>

        <span>impuestos (15%)</span>
        <span className='text-right'>{ currencyFormater(taxes) }</span>

        <span className='text-2xl mt-5'>Total:</span>
        <span className='text-right text-2xl mt-5'>{ currencyFormater(total) }</span>
      </div>
      <div className='mt-5 mb-2 w-full'>
        <Link
          className='flex btn-primary justify-center'
          href='/checkout/address'>
          Checkout
        </Link>
      </div>
    </div>
  );
};