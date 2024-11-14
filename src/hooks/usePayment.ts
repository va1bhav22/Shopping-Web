//? RazorPay Payment Logic

import { useEffect, useState } from 'react'
import useAuth from './useAuth'

export default () => {
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()
  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = src
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

  useEffect(() => {
    loadScript('https://checkout.razorpay.com/v1/checkout.js')
  })
  const openRazorpay = async (
    amount: number,
    orderId: string,
    handelPaymentResponse: any
  ) => {
    const options = {
      key: 'rzp_live_dbvX3TkSPNs2eu',
      currency: 'INR',
      amount: amount,
      name: 'Prizen',
      description: 'Prizen Wallet Transaction',
      image:
        'https://res.cloudinary.com/dtwwogxxp/image/upload/v1676376418/main_logo_svkjdh.png',
      order_id: orderId,
      handler: handelPaymentResponse(orderId),
      prefill: {
        name: user?.displayName,
        email: user?.email,
        contact: user?.phoneNumber,
      },
      options: {
        theme: {
          color: '#f15a24',
        },
        checkout: {
          theme: {
            color: '#f15a24',
          },
        },
      },
    }
    const paymentObject = new (window as any).Razorpay(options)
    await paymentObject.open()
  }
  return { openRazorpay }
}
