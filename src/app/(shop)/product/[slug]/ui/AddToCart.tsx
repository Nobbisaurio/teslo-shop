'use client';

import { QuantitySelector, SizeSelector } from '@/components';
import { Product } from '@/interfaces';
import { useState } from 'react';
import { CartProduct, Sizes } from '../../../../../interfaces/product.interface';
import { useCartStore } from '@/store/cart/cart-store';


interface Props {
  product: Product;



}



export const AddToCart = ( { product }: Props ) => {


  const addProductToCart = useCartStore( ( state ) => state.addProductToCart );

  const [ sizes, setSizes ] = useState<Sizes | undefined>();
  const [ quantity, setQuantity ] = useState<number>( 1 );
  const [ posted, setPosted ] = useState<boolean>( false );


  const addToCart = () => {
    setPosted( true );
    if ( !sizes ) return;

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: sizes,
      image: product.images[ 0 ],
    };

    addProductToCart( cartProduct );

    setPosted( false );
    setSizes( undefined );
    setQuantity( 1 );

  };






  return (
    <>
      {
        posted && !sizes && (

          <span className={ `text-red-500 mb-8 w-full animate-fade-in font-bold` }>
            Selecciona una talla *
          </span>
        )
      }

      {/* selector de tallas  */ }

      <SizeSelector
        selectedSize={ sizes }
        availableSizes={ product.sizes }
        onSelectSize={ ( size ) => setSizes( size ) }
      />

      {/* selector de cantidad */ }

      <QuantitySelector
        quantity={ quantity }
        availableQuantity={ 5 }
        onQuantityChange={ ( quantity ) => setQuantity( quantity ) }
      />

      {/* boton agregar al carrito */ }

      <button className='btn-primary my-5' onClick={ addToCart }>
        Agregar al carrito
      </button>





    </>
  );
};