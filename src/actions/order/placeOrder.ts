"use server";

import { auth } from "@/authConfig";
import { Address, Sizes } from "@/interfaces";
import { prisma } from "@/lib/prisma";

interface ProductsToOrder {
  id: string;
  quantity: number;
  size: Sizes;
}

export const placeOrder = async (
  productsIds: ProductsToOrder[],
  address: Address
) => {
  const sesion = await auth();
  const userId = sesion?.user.id;

  //verificar si hay sesion de usuario
  if (!userId) {
    return {
      ok: false,
      message: "no hay sesion de usuario",
    };
  }

  //obtener la inforamacion de los productos

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productsIds.map((p) => p.id),
      },
    },
  });

  // calcular los montos //encabezado

  const itemsInOrder = productsIds.reduce((count, p) => count + p.quantity, 0);

  //totales taxes, subtotal, total

  const { total, subtotal, taxes } = productsIds.reduce(
    (totals, items) => {
      const productQuantity = items.quantity;
      const product = products.find((p) => p.id === items.id);

      if (!product) throw new Error(` product with id ${items.id} not found`);

      const subtotal = product.price * productQuantity;

      totals.subtotal += subtotal;
      totals.taxes += subtotal * 0.15;
      totals.total += subtotal * 1.15;

      return totals;
    },
    { total: 0, subtotal: 0, taxes: 0 }
    
  );

  try {

    //crear la transaccion en la base de datos

  const prismaTransaction = await prisma.$transaction(async (tx) => {
    //actualizar el stock de los productos

    const updatedPropductsPromises = products.map(async (product) => {
      //acumular la cantidad de productos en la orden
      const productQuantity = productsIds
        .filter((p) => p.id === product.id)
        .reduce((count, p) => count + p.quantity, 0);

      if (productQuantity === 0) {
        throw new Error(`product with id ${product.id} has quantity 0`);
      }

      return tx.product.update({
        where: {
          id: product.id,
        },
        data: {
          inStock: {
            decrement: productQuantity,
          },
        },
      });
    });

    const updatedProducts = await Promise.all(updatedPropductsPromises);

    //verificar valores negativos
    updatedProducts.forEach((product) => {
      if (product.inStock < 0) {
        throw new Error(`product  ${product.title} has negative stock`);
      }
    });

    // crear la orden (encabezado- detalle)
    const order = await tx.order.create({
      data: {
        userId,
        itemsInOrder,
        taxes,
        subtotal,
        total,

        OrderItem: {
          createMany: {
            data: productsIds.map((p) => ({
              productId: p.id,
              quantity: p.quantity,
              size: p.size,
              price:
                products.find((product) => product.id === p.id)?.price ?? 0,
            })),
          },
        },

        OrderAddress: {
          create: {
            firstName: address.firstName,
            lastName: address.lastName,
            address: address.address,
            address2: address.address2,
            postalCode: address.postalCode,
            city: address.city,
            phone: address.phone,
            countryId: address.country,
          },
        },
      },
    });

    return {
      order,
      updatedProducts
    };


  });
  
    return{
      ok: true,
      order: prismaTransaction.order,
      prismaTransaction
    }
    
  } catch (error:any) {
    return {
      ok: false,
      message: error.message,
    }
  }

  
};
