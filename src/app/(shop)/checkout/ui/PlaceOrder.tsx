'use client';

import { useAddressStore } from '@/store/address/address-store';
import { useCartStore } from '@/store/cart/cart-store';
import { useEffect, useState } from 'react';
import { currencyFormater } from '../../../../utils/currencyFormater';
import { placeOrder } from '@/actions';
import { useRouter } from 'next/navigation';



export const PlaceOrder = () => {

  const router = useRouter();
  const [ loaded, setLoaded ] = useState( false );
  const [ errorMsg, setErrorMsg ] = useState( '' );
  const [ isPlacingOrder, setIsPlacingOrder ] = useState( false );

  const address = useAddressStore( state => state.address );

  const { getSumaryInformation, cart,clearCart } = useCartStore();

  const { itemsInCart, subTotal, taxes, total } = getSumaryInformation();

  useEffect( () => {
    setLoaded( true );
  }, [] );

  if ( !loaded ) {
    return <p>Loading...</p>;
  }

  const onPlaceOrder = async () => {
    setIsPlacingOrder( true );

    const productsToOrder = cart.map( product => ( {
      id: product.id,
      quantity: product.quantity,
      size: product.size,
    } ) );

    //! Server Action
    const res = await placeOrder( productsToOrder, address );

    if(!res.ok){
      setErrorMsg( res.message );
      setIsPlacingOrder( false );
      return;
    }

    //* if todo sale bien

    clearCart();
    router.replace( `/orders/${ res.order!.id }` );

    
  };




  return (
    <div className='bg-white rounded-xl shadow-xl p-7'>

      <h2 className='text-2xl'>Direccion de la entrega </h2>
      <div className='mb-10'>
        <p>{ address.firstName } { address.lastName }</p>
        <p>{ address.address }</p>
        <p>{ address.address2 }</p>
        <p>{ address.postalCode }</p>
        <p> { address.city }, { address.country } </p>
        <p>{ address.phone }</p>
      </div>

      {/* divider */ }

      <div className='w-full h-0.5 rounded bg-gray-200 mb-10' />


      <h2 className='text-2xl mb-2'>Resumen de orden</h2>
      <div className='grid grid-cols-2'>
        <span>No. Productos</span>
        <span className='text-right'>{ itemsInCart } { ( itemsInCart > 1 ) ? 'Articulos' : 'Articulo' }</span>

        <span>Subtotal</span>
        <span className='text-right'>{ currencyFormater( subTotal ) }</span>

        <span>impuestos (15%)</span>
        <span className='text-right'>{ currencyFormater( taxes ) }</span>

        <span className='text-2xl mt-5'>Total:</span>
        <span className='text-right text-2xl mt-5'>{ currencyFormater( total ) }</span>
      </div>
      <div className='mt-5 mb-2 w-full'>
        <span className={`text-red-500  ${errorMsg.length === 0 ? 'hidden':'block' } `}>* {errorMsg}</span>
        <button
          className={ `${ !isPlacingOrder && 'btn-primary' } ${ isPlacingOrder && 'btn-secondary' } w-full` }
          onClick={ onPlaceOrder }
        // href='/orders/123'
        >
          Colocar orden
        </button>
      </div>
    </div>
  );
};
