
'use server';

import { prisma } from '@/lib/prisma';
import bcripjs from 'bcryptjs';

export const registerUser = async (name:string, email:string, password:string)=>{
  try {

    const user  =  await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: bcripjs.hashSync(password)
      },
      select:{
        id:true,
        name:true,
        email:true 
      }
    })

    return{
      ok:true,
      user:user
    }
    
  } catch (error :any ) {
    console.log(error?.message)
    
    return {
      ok:false,
      message: 'No se pudo crear el usuario'
    }
  }
}