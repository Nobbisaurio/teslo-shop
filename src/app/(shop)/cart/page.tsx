import { QuantitySelector, Title } from '@/components';
import { initialData } from '@/seed/seed';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';


const productsInCart = [
  initialData.products[ 0 ],
  initialData.products[ 1 ],
  initialData.products[ 2 ],
];

export default function () {

  if(productsInCart.length === 0) {
    return redirect('/empty');
  }


  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>

      <div className='flex flex-col w-[1000] '>
        <Title
          title='Carrito'
        />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>

          {/* carrito */ }

          <div className='flex flex-col mt-5'>
            <span className='text-xl'>agregar mas items</span>
            <Link href='/' className='underline mb-5'>
              Contunia comprando
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
                    <p>{ product.price }</p>
                    <QuantitySelector
                      selectedQuantity={ 3 }
                      availableQuantity={ 5 }
                    />
                    <button className='underline mt-3'>
                      Remover
                    </button>
                  </div>
                </div>
              ) )
            }
          </div>

          {/* Resumen de orden */ }

          <div className='bg-white rounded-xl shadow-xl p-7 h-fit'>
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
                href='/checkout/address'>
                Checkout
              </Link>
            </div>
          </div>



        </div>

      </div>


    </div>
  );
}