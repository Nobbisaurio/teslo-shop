'use server'

import { prisma } from '@/lib/prisma';



export const removeAddress = async (userId: string)=>{

  try {

    const deleteUserAddress  = await prisma.userAddress.delete({
      where:{
        userId
      }
    })

    return{
      ok:true,
      message:"direccion eliminada"
    }


    
  } catch (error) {
    return{
      ok:false,
      message:"no se pudo eliminar la direccion"
    }
  }

}