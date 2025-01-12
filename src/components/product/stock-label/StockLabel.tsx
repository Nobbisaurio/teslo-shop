'use client';

import { getStockBySlug } from '@/actions';
import { titleFont } from '@/config/fonts';
import { useEffect, useState } from 'react';

interface Props {
  slug: string;
}

export const StockLabel = ( { slug }: Props ) => {

  const [ stock, setStock ] = useState<number | null>( 0 );
  const [ loading, setLoading ] = useState( true );

  useEffect( () => {
    getstock();


  }, [] );

  const getstock = async () => {
    const inStock = await getStockBySlug( slug );
    setStock( inStock );
    setLoading( false );

  };


  // const stock  = await getStockBySlug(slug);


  return (
    <>
      { loading 
        ? 
        <div className='bg-gray-100 w-full h-8 rounded animate-pulse'></div>
        : 
      <h1 className={ `${ titleFont.className } antialiased font-bold text-xl` }>
        Stock: { stock ? stock : 'Producto no disponible' }
      </h1>
      }
    </>
  );
};