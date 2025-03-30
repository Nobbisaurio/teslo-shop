'use client';


import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import {CreateOrderData,CreateOrderActions, OnApproveData, OnApproveActions} from '@paypal/paypal-js';
import React from 'react'
import { paypalCheckPayments, setPaypalOrderId } from '@/actions';


interface Props{
  orderId:string
  amount:number
}

export const PaypalButtons = ({amount,orderId}:Props) => {



  const [{ isPending }] = usePayPalScriptReducer();


  const rountedAmount = Math.round(amount * 100) / 100

  if(isPending) {
    return (
      <div className='animate-pulse'>
        <div className='h-12 bg-gray-300 rounded-md' />
        <div className='h-12 mt-2 bg-gray-300 rounded-md' />
      </div>
    )
  }


  const createOrder = async (data:CreateOrderData, actions:CreateOrderActions):Promise<string>=>{

    const transactionId = await actions.order.create({
      intent: 'CAPTURE',
      
      purchase_units: [{
        invoice_id: orderId,
        amount:{
          value: `${rountedAmount}`,
          currency_code: 'USD',
        }
      }]
    })

    console.log({transactionId});

    const {ok,error,order} = await setPaypalOrderId(orderId,transactionId)

    if(!ok){
      throw new Error(error)
    }

    return transactionId
  }


  const onAprrove = async (data:OnApproveData,actions:OnApproveActions) => {

    const details = await actions.order?.capture()

    if(!details) return;

    await paypalCheckPayments(details.id!)


  }


  return (
    <PayPalButtons 
      createOrder={createOrder}
      onApprove={onAprrove}
    />
  )



}
