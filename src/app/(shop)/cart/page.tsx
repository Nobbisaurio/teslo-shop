import { Title } from '@/components';
import Link from 'next/link';
import { ProductsInCart } from './ui/ProductsInCart';
import { OrderSummary } from './ui/OrderSummary';




export default function () {



  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>

      <div className='flex flex-col w-[1000] '>
        <Title
          title='Carrito'
        />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>

          {/* carrito */ }

          <div className='flex flex-col mt-5'>
            <span className='text-xl mb-5'>Agregar mas items</span>
            <Link href='/' className='underline mb-5'>
              Contunia comprando
            </Link>


            {/* Items */ }

            <ProductsInCart  />


          </div>

          {/* Resumen de orden */ }

          <OrderSummary  />



        </div>

      </div>


    </div>
  );
}