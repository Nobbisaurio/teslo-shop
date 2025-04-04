// https://tailwindcomponents.com/component/hoverable-table
import { getOrderByUser } from '@/actions/order/getOrderByUser';
import { auth } from '@/authConfig';
import { Title } from '@/components';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IoCardOutline } from 'react-icons/io5';

export default async function () {

  const session = await auth();

  if ( !session?.user ) {
    return redirect( '/auth/login?callbackUrl=/orders' );
  }


  const { orders, ok, error } = await getOrderByUser();

  if ( !ok ) {
    return (
      <div className='flex flex-col justify-center items-center h-[500px]'>
        <p className='flex  text-red-600 text-2xl'>*{ error }</p>
        <Link href={ '/' } className='flex  justify-center items-center underline text-blue-600 text-2xl'>Regresar</Link>
      </div>
    );
  }


  return (
    <>
      <Title title="Orders" />

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">

            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                #ID
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Nombre completo
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Estado
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Opciones
              </th>
            </tr>

          </thead>
          <tbody>

            {
              orders?.map( order => (
                <tr key={order.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ order.id.split( '-' ).at( -1 ) }</td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    { order.OrderAddress?.firstName } { order.OrderAddress?.lastName }
                  </td>
                  <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">

                    <IoCardOutline className={ `${ order.isPaid ? 'text-green-800' : 'text-red-800' }` } />
                    <span className={ `mx-2 ${ order.isPaid ? 'text-green-800' : 'text-red-800' }` }>{ `${ order.isPaid ? 'Pagada' : 'No Pagada' }` }</span>

                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 ">
                    <Link href={ `/orders/${ order.id }` } className="hover:underline">
                      Ver orden
                    </Link>
                  </td>

                </tr>
              ) )
            }


          </tbody>
        </table>
      </div>
    </>
  );
}