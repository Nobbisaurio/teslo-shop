import { QuantitySelector, Title } from '@/components';
import { initialData } from '@/seed/seed';
import Image from 'next/image';
import Link from 'next/link';


const productsInCart = [
  initialData.products[ 0 ],
  initialData.products[ 1 ],
  initialData.products[ 2 ],
];

export default function () {
  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>

      <div className='flex flex-col w-[1000] '>
        <Title
          title='Verificar Orden'
        />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>

          {/* carrito */ }

          <div className='flex flex-col mt-5'>
            <span className='text-xl'>Ajustar elementos</span>
            <Link href='/cart' className='underline mb-5'>
              Editar carrito
            </Link>


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
            <div className='mt-5 mb-2 w-full'>
              <Link
                className='flex btn-primary justify-center'
                href='/orders/123'>
                Colocar orden
              </Link>
            </div>
          </div>



        </div>

      </div>


    </div>
  );
}