import { titleFont } from '@/config/fonts';
import Link from 'next/link';
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5';
import { MenuButton } from './MenuButton';

export const TopMenu = () => {
  return (
    <nav className='w-full flex  justify-between px-5 items-center'>


      {/* {logo} */ }
      <div>
        <Link
          href='/'  >
          <span className={ `${ titleFont.className } antialiased font-bold` }>Teslo</span>
          <span> | Shop</span>
        </Link>
      </div>


      {/* center menu */ }
      <div className='hidden sm:block' >

        <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' href='/category/men'>Hombres</Link>
        <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' href='/category/women'>Mujeres</Link>
        <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' href='/category/kid'>Niños</Link>

      </div>

      {/* search, cart , Menu */ }
      <div className='flex items-center'>

        <Link href='/search' className='mx-2'>
          <IoSearchOutline className='w-5 h-5' />
        </Link>

        <Link href='/cart' className='mx-2'>
          <div className='relative'>
            <span className='absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white'>
              3
            </span>
            <IoCartOutline className='w-5 h-5' />
          </div>
        </Link>

        <MenuButton />

      </div>




    </nav>
  );
};