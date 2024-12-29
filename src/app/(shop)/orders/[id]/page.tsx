import { QuantitySelector, Title } from '@/components';
import { initialData } from '@/seed/seed';
import Image from 'next/image';
import Link from 'next/link';
import { IoCardOutline } from 'react-icons/io5';


const productsInCart = [
  initialData.products[ 0 ],
  initialData.products[ 1 ],
  initialData.products[ 2 ],
];

interface Props { 
  params: Promise<{
    id:string
  }>
}

export default async function ({params}:Props) {

    const {id} = await params;

  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>

      <div className='flex flex-col w-[1000] '>
        <Title
          title={`Orden #${id}`}
        />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>

          {/* carrito */ }

          <div className='flex flex-col mt-5'>
            <div className='flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5'>
              <IoCardOutline  size={30}/>
              <span className='mx-2'>Prendiente de pago</span>
              <span className='mx-2'>Orden pagada</span>
            </div>


            {/* Items */ }

            {
              productsInCart.map( product => (
                <div key={ product.slug } className='flex'>
                  <Image
                    src={ `/products/${ product.images[ 0 ] }` }
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
                    <p>{ product.title }</p>
                    <p>{ product.price } x3</p>
                    <p className='font-bold'>Subtotal: ${product.price * 3 }</p>
                    <button className='underline mt-3'>
                      Remover
                    </button>
                  </div>
                </div>
              ) )
            }
          </div>

          {/* Resumen de orden */ }

          <div className='bg-white rounded-xl shadow-xl p-7'>

            <h2 className='text-2xl'>Direccion de la entrega </h2>
            <div className='mb-10'>
              <p>David Castro</p>
              <p>Guatemala oe9387 y agusto martinez</p>
              <p>Calle primaria</p>
              <p>Sector 2</p>
              <p>Quito</p>
              <p>CP 17064</p>
              <p>0979301325</p>
            </div>

            {/* divider */}

            <div className='w-full h-0.5 rounded bg-gray-200 mb-10' />


            <h2 className='text-2xl mb-2'>Resumen de orden</h2>
            <div className='grid grid-cols-2'>
              <span>No. Productos</span>
              <span className='text-right'>3 Articulos</span>

              <span>Subtotal</span>
              <span className='text-right'>$ 100</span>

              <span>impuestos (15%)</span>
              <span className='text-right'>$ 50</span>

              <span className='text-2xl mt-5'>Total:</span>
              <span className='text-right text-2xl mt-5'>$ 50</span>
            </div>
            
          </div>



        </div>

      </div>


    </div>
  );
}