'use server';

import { auth } from '@/authConfig';
import { prisma } from '@/lib/prisma';

export const getOrderByUser = async () => {

  try {

    const session =  await auth();

    if(!session?.user) throw new Error('Iniciar sesion para ver las ordenes');

    const orders = await prisma.order.findMany({
      where:{
        userId: session.user.id
      },
      include:{
        OrderAddress:{
          select:{
            firstName: true,
            lastName: true,
          }
        }
      }
    })

    if(orders.length === 0) throw new Error('No se registraron ordenes');

    return{
      ok: true,
      orders
    }
    
  } catch (error : any) {
    return{
      ok: false,
      error: error.message
    }
  }



}