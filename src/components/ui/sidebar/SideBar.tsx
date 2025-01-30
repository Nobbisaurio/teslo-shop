'use client';

import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5';
import Link from 'next/link';
import { useUIStore } from '@/store/ui/ui-store';

export const SideBar = () => {


  const isSidebarOpen =useUIStore( state => state.isSidebarOpen)
  const toggleSidebar =useUIStore( state => state.toggleSidebar)

  const menuAnimation = !isSidebarOpen ? 'translate-x-full' : '';


  return (
    <div>

      {/* background */ }
      {
        isSidebarOpen && (
          <div
            className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30'
          />
        )
      }






      {/* blur */ }
      {
        isSidebarOpen && (
          <div
            onClick={ toggleSidebar}
            className='fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm '
          />
        )
      }


      {/* sidebar */ }

      <nav className={ `fixed p-5 right-0 top-0 w-full sm:w-[450px] h-screen bg-white z-20 shadow-2xl  transform transition-all duration-300 ${menuAnimation}` }>

        <IoCloseOutline
          size={ 50 }
          className='absolute top-5 right-5 cursor-pointer'
          onClick={ toggleSidebar }
        />

        {/* input */ }

        <div className='relative mt-14'>

          <IoSearchOutline
            size={ 20 }
            className='absolute top-2 left-2'
          />
          <input
            type="text"
            placeholder='Search'
            className='w-full bg-gray-50 rounded pl-10 py-1 pr-10  border-b-2 text-xl border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>


        <Link
          href='/profile'
          className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all '
        >
          <IoPersonOutline
            size={ 30 }
          />
          <span className='ml-3 text-xl'>Perfil</span>
        </Link>

        <Link
          href='/'
          className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all '
        >
          <IoTicketOutline
            size={ 30 }
          />
          <span className='ml-3 text-xl'>Ordenes</span>
        </Link>

        <Link
          href='/'
          className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all '
        >
          <IoLogInOutline
            size={ 30 }
          />
          <span className='ml-3 text-xl'>Ingresar</span>
        </Link>

        <Link
          href='/'
          className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all '
        >
          <IoLogOutOutline
            size={ 30 }
          />
          <span className='ml-3 text-xl'>Salir</span>
        </Link>


        {/* line separator */}


        <div className='w-full h-px bg-gray-200 my-10'/>

        <Link
          href='/'
          className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all '
        >
          <IoShirtOutline
            size={ 30 }
          />
          <span className='ml-3 text-xl'>Productos</span>
        </Link>


        <Link
          href='/'
          className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all '
        >
          <IoTicketOutline
            size={ 30 }
          />
          <span className='ml-3 text-xl'>Ordenes</span>
        </Link>

        <Link
          href='/'
          className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all '
        >
          <IoPeopleOutline
            size={ 30 }
          />
          <span className='ml-3 text-xl'>Usuarios</span>
        </Link>


      </nav>


    </div>
  );
};