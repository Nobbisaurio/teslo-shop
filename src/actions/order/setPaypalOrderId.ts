'use server';

import { prisma } from '@/lib/prisma';

export const setPaypalOrderId = async ( orderId: string, transactionId: string ) => {
  try {

    const updatedOrder = await prisma.order.update({
      where:{
        id:orderId
      },
      data:{
        transactionId
      }
    })

    if(!updatedOrder){
      throw new Error('No se pudo actualizar el pedido')
    }

    return{
      ok:true,
      order:updatedOrder
    }


    
  } catch (error:any) {
    

    return{
      ok:false,
      error:error.message
    }
  }
}