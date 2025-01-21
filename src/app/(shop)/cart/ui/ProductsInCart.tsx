'use client';

import { QuantitySelector } from '@/components';
import { useCartStore } from '@/store/cart/cart-store';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';





export const ProductsInCart = () => {

  const productsInCart = useCartStore( state => state.cart );
  const updatedProductQuentity = useCartStore( state => state.updateProductQuantityInCart );
  const removeProduct = useCartStore( state => state.removeProductInCart );

  if( productsInCart.length === 0 ) redirect( '/empty' );


  return (
    <>

      {


        productsInCart.map( ( product, i ) => (
          <div key={ product.slug + i } className='flex'>
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

              <Link
                className='underline hover:text-blue-700 cursor-pointer'
                href={ `/product/${ product.slug }` }
              >
                { `${ product.title } - ${ product.size }` }
              </Link>

              <p>{ product.price }</p>
              <QuantitySelector
                quantity={ product.quantity }
                availableQuantity={ 5 }
                onQuantityChange={ ( quantity ) => updatedProductQuentity( product, quantity ) }
              />
              <button
                className='underline mt-3 mb-5'
                onClick={ () => removeProduct( product ) }
              >
                Remover
              </button>
            </div>
          </div>
        ) )
      }

    </>
  );
};