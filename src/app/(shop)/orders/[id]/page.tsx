import { getOrderById } from '@/actions/order/getOrderById';
import { Title } from '@/components';
import { initialData } from '@/seed/seed';
import Image from 'next/image';
import { IoCardOutline } from 'react-icons/io5';
import { currencyFormater } from '../../../../utils/currencyFormater';
import { auth } from '@/authConfig';
import Link from 'next/link';
import { redirect } from 'next/navigation';


const productsInCart = [
  initialData.products[ 0 ],
  initialData.products[ 1 ],
  initialData.products[ 2 ],
];

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ( { params }: Props ) {

  const { id } = await params;
  const session = await auth();
  const user = session?.user;

  if ( !user ) {
    redirect( `/auth/login?callbackUrl=/orders/${ id }` );
  }

  const { ok, order, error } = await getOrderById( id );


  if ( !ok ) {
    return (
      <div className='flex flex-col justify-center items-center h-[500px]'>
        <p className='flex  text-red-600 text-2xl'>*{ error }</p>
        <Link href={ '/' } className='flex  justify-center items-center underline text-blue-600 text-2xl'>Regresar</Link>
      </div>
    );
  }




  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>

      <div className='flex flex-col w-[1000] '>
        <Title
          title={ `Orden #${ id.split( '-' ).at( -1 ) }` }
        />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>

          {/* carrito */ }

          <div className='flex flex-col mt-5'>
            <div className={ `flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5 ${ order?.isPaid ? 'bg-green-700' : 'bg-red-500' } ` }>
              <IoCardOutline size={ 30 } />
              {
                !order?.isPaid
                  ? (
                    <span className='mx-2'>Prendiente de pago</span>

                  )
                  : (
                    <span className='mx-2'>Orden pagada</span>

                  )
              }
            </div>


            {/* Items */ }

            {
              order?.OrderItem.map( item => (
                <div key={ `${ item.product.slug } - ${ item.size }` } className='flex mb-2'>
                  <Image
                    src={ `/products/${ item.product.ProductImage[ 0 ].url }` }
                    alt={ item.product.title }
                    width={ 100 }
                    height={ 100 }
                    style={ {
                      width: '100px',
                      height: '100px',
                    } }
                    className='mr-5 rounded'
                  />
                  <div>
                    <p>{ `${ item.product.title } - ${ item.size } ` }</p>
                    <p>{ currencyFormater( item.product.price ) } x { item.quantity }</p>
                    <p className='font-bold'>Subtotal: { currencyFormater( item.product.price * item.quantity ) }</p>
                  </div>
                </div>
              ) )
            }
          </div>

          {/* Resumen de orden */ }

          <div className='bg-white rounded-xl shadow-xl p-7'>

            <h2 className='text-2xl'>Direccion de la entrega </h2>
            <div className='mb-10'>
              <p>{ order?.OrderAddress!.firstName } { order?.OrderAddress!.lastName }</p>
              <p>{ order?.OrderAddress!.address }</p>
              <p>{ order?.OrderAddress!.address2 }</p>
              <p>{ order?.OrderAddress!.postalCode }</p>
              <p> { order?.OrderAddress!.city }, { order?.OrderAddress!.countryId } </p>
              <p>{ order?.OrderAddress!.phone }</p>
            </div>

            {/* divider */ }

            <div className='w-full h-0.5 rounded bg-gray-200 mb-10' />


            <h2 className='text-2xl mb-2'>Resumen de orden</h2>
            <div className='grid grid-cols-2'>
              <span>No. Productos</span>
              <span className='text-right'>{ order?.itemsInOrder } { ( order!.itemsInOrder > 1 ) ? 'Articulos' : 'Articulo' }</span>

              <span>Subtotal</span>
              <span className='text-right'>{ currencyFormater( order!.subtotal ) }</span>

              <span>impuestos (15%)</span>
              <span className='text-right'>{ currencyFormater( order!.taxes ) }</span>

              <span className='text-2xl mt-5'>Total:</span>
              <span className='text-right text-2xl mt-5'>{ currencyFormater( order!.total ) }</span>
            </div>

            <div className={ ` mt-6 flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5 ${ order?.isPaid ? 'bg-green-700' : 'bg-red-500' } ` }>
              <IoCardOutline size={ 30 } />
              {
                !order?.isPaid
                  ? (
                    <span className='mx-2'>Prendiente de pago</span>

                  )
                  : (
                    <span className='mx-2'>Orden pagada</span>

                  )
              }
            </div>

          </div>



        </div>

      </div>


    </div>
  );
}