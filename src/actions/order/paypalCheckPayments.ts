"use server";

import { PaypalOrderStatusResponse } from "@/interfaces/paypal";
import { prisma } from '@/lib/prisma';
import { error } from 'console';

export const paypalCheckPayments = async (transactionId: string) => {
  const authToken = await getPaypalBearerToken();

  if (!authToken) {
    return {
      ok: false,
      error: "Paypal auth token not found",
    };
  }

  const resp = await verifyPaypalPayment(transactionId, authToken);

  if (!resp) {
    return {
      ok: false,
      error: "Error al verificar el pago",
    };
  }

  const {purchase_units, status} = resp;
  // const {} = purchase_units[0];


  if(status !== "COMPLETED") {
    return{
      ok:false,
      error : "El pago no se ha completado"
    }
  }


  try {

   await prisma.order.update({
      where:{
        id:'0b2fcb47-7de1-4340-a199-52b6e7fd84e2'
      },
      data:{
        isPaid: true,
        paidAt: new Date(),
      }
    })

    
  } catch (error) {
    return {
      ok: false,
      error: "Error al verificar el pago",
    };
  }

  console.log({purchase_units, status});



};

const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  const PAYPAL_SECRET = process.env.PAYPAL_SECTRET;
  const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? "";

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const response = await fetch(oauth2Url, {
      ...requestOptions,
      cache:'no-store'
    }).then((response) =>
      response.json()
    );

    return response.access_token;
  } catch (error) {
    return null;
  }
};

const verifyPaypalPayment = async (
  transactionId: string,
  authToken: string
): Promise<PaypalOrderStatusResponse | null | undefined> => {
  const requestURL = `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const res = await fetch(requestURL, requestOptions).then((response) =>
      response.json()
    );

    return res;
  } catch (error) {
    return null;
  }
};
