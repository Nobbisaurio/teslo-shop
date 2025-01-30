'use client';

import { authenticate } from '@/actions';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useActionState } from 'react';
import { IoWarningOutline } from 'react-icons/io5';

export const LoginForm = () => {


  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get( 'callbackUrl' ) || '/';
  const [ errorMessage, formAction, isPending ] = useActionState(
    authenticate,
    undefined,
  );




  return (
    <form action={ formAction } className="flex flex-col">

      { errorMessage && (
        <div className='flex justify-center items-center my-8 bg-red-100 h-12 gap-4'>
          <IoWarningOutline className=" text-red-500" size={ 20 } />
          <p className="text-sm text-red-500">{ errorMessage }</p>
        </div>
      ) }

      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name='email'
      />


      <label htmlFor="password">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name='password'
      />
      <input type="hidden" name="redirectTo" value={ callbackUrl } />

      <button
        disabled={ isPending }
        aria-disabled={ isPending}
        type='submit'
        className="btn-primary">
        Ingresar
      </button>


      {/* divisor l ine */ }
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/new-account"
        className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>

    </form>
  );
};