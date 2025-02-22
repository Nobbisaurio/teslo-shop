'use server';

import { auth } from '@/authConfig';
import { prisma } from '@/lib/prisma';




export const getOrderById = async (orderId: string) => {
  try {
    const session = await auth()

    const order  = await prisma.order.findUnique({
      where:{
        id: orderId
      },
      include:{
        OrderItem:{
          include:{
            product:{
              include:{
                ProductImage:true
              }
            }
          }
        },
        OrderAddress:true,
        
      }
    })

    //verificar si existe la orden
    if(!order){
      throw new Error('No se encontro la orden con id: ' + orderId)
    }

    //verificar si el usuario es el dueño de la orden
    if(session?.user.role === 'user' && session?.user.id !== order.userId){
      throw new Error('No se encontro la orden con id: ' + orderId)
    }

    return{
      ok: true,
      order,
    }


    
  } catch (error:any) {
   return {
    ok: false,
    error: error.message
   }
  }
}