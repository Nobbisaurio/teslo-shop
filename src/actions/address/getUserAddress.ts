'use server'

import { prisma } from '@/lib/prisma';


export const getUserAddress = async (userId: string)=>{
  try {

    const userAddress  = await prisma.userAddress.findFirst({
      where:{
        userId
      },
    })

    if(!userAddress) return null

    const {address2 ,countryId,...rest } = userAddress

    

    return {
      address2:  address2 || "",
      country: countryId,
      ...rest
    }

    
  } catch (error) {
    return null
  }
}