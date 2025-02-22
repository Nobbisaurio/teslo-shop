'use client';

import { useCartStore } from '@/store/cart/cart-store';
import { currencyFormater } from '@/utils/currencyFormater';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';





export const ProductsInCart = () => {

  const [loaded, setLoaded] = useState(false)

  const productsInCart = useCartStore( state => state.cart );

  useEffect(() => {
    setLoaded(true);
    if ( productsInCart.length === 0  ) redirect( '/empty' );
  }, []);



  return (
    <>

      {


        productsInCart.map( ( product, i ) => (
          <div key={ product.slug + i } className='flex my-2'>
            <Image
              src={ `/products/${ product.image }` }
              alt={ product.title }
              width={ 100 }
              height={ 100 }
              style={ {
                width: '100px',
                height: '100px',
              } }
              className='mr-5 rounded'
            />
            <div>

              <div className='text-xl'>
                { ` ${ product.size } - ${ product.title } (${product.quantity}) ` }
              </div>

              <p className='font-bold mt-2'>{ currencyFormater( product.price * product.quantity ) }</p>

            </div>
          </div>
        ) )
      }

    </>
  );
};