'use client'


import { login, registerUser } from '@/actions';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useState } from 'react';



type FormInputs = {
  name : string;
  email : string;
  password : string; 
}

export const RegisterForm = () => {

  const {register, handleSubmit, formState:{errors}} = useForm<FormInputs>();
  const [errMessage, setErrMessage] = useState<string|undefined>()
  

  const onSubmit = async (data: FormInputs) => {
    const {email,name,password} = data
    const res = await registerUser(name,email,password);
    console.log(res);
    if(!res.ok){
      setErrMessage(res.message)
      return
    }


    await login(email.toLowerCase(),password)

    window.location.replace('/')

  }




  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>

    <label >Nombre Completo</label>
    <input
      className={`px-5 py-2 border bg-gray-200 rounded mb-5 ${errors.name && 'border-red-500 focus:border-red-500'}`}
      type="text" 
      {...register('name',{required: true})}
      />

    <label>Correo Electronico</label>
    <input
      className={`px-5 py-2 border bg-gray-200 rounded mb-5 ${errors.email && 'border-red-500 focus:border-red-500'}`}
      type="email" 
      {...register('email',{required: true, pattern:/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/})}
      />


    <label >Contraseña</label>
    <input
      className={`px-5 py-2 border bg-gray-200 rounded mb-5 ${errors.password && 'border-red-500 focus:border-red-500'}`}
      type="password" 
      {...register('password',{required: true , minLength: 6})}
      />


      <span className ={`my-2 text-red-500 ${!errMessage &&'hidden'}  `}>*{errMessage}</span>

    <button
      
      className="btn-primary">
      Crear Cuenta
    </button>


    {/* divisor l ine */ }
    <div className="flex items-center my-5">
      <div className="flex-1 border-t border-gray-500"></div>
      <div className="px-2 text-gray-800">O</div>
      <div className="flex-1 border-t border-gray-500"></div>
    </div>

    <Link
      href="/auth/login" 
      className="btn-secondary text-center">
      Ingresar
    </Link>

  </form>
  )
}
