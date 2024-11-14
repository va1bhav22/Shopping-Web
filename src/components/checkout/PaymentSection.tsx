import { CircularProgress, Collapse, Dialog, Slide } from '@mui/material'
import Radio from '@mui/material/Radio'
import { TransitionProps } from '@mui/material/transitions'
import { useCashfreePayment } from 'hooks'
import useAuthFetch from 'hooks/useAuthFetch'
import usePayment from 'hooks/usePayment'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useEffect, useState } from 'react'
import orderSummeryStore from 'store/orderSummery'
import Swal from 'sweetalert2'
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />
})

const PaymentSection = () => {
  const { openRazorpay } = usePayment()
  const { addressId, isOrderSummaryOpen } = orderSummeryStore()
  const [selectedValue, setSelectedValue] = useState<'ONLINE' | 'COD' | null>(
    null
  )
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isAnimation, setIsAnimation] = useState(false)
  const [success, setSuccess] = useState<any>()
  const { isLoading, mutate } = useAuthFetch()
  const router = useRouter()
  const { openCashfree } = useCashfreePayment()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value as 'ONLINE' | 'COD')
  }

  console.log(success)

  //TODO: COD order handler
  const handelCashOnDelivery = async () => {
    const body = {
      type: router?.query?.productId ? 'product' : 'cart',
      shippedTo: addressId,
      productId: router?.query?.productId,
      quantity: router?.query?.quantity,
      couponId: router?.query?.couponId,
    }
    !router?.query?.productId && delete body.productId
    !router?.query?.quantity && delete body.quantity
    !router?.query?.couponId && delete body.couponId
    const codResponseData = await mutate({
      path: 'order/cash-on-delivery',
      method: 'POST',
      body: JSON.stringify(body),
    })
    if (codResponseData?.error) {
      return Swal.fire({
        title: 'Oops!',
        text: codResponseData?.error,
        icon: 'error',
        confirmButtonText: 'Ok',
        allowOutsideClick: false,
      })
    }
    setIsDialogOpen(true)
    setSuccess(codResponseData)
  }

  const handelPaymentVerification =
    (OrderId: string) => async (response: any) => {
      const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
        response
      const resData = await mutate({
        path: 'checkout/payment-verify',
        method: 'POST',
        body: JSON.stringify({
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
          payment_order_id: OrderId,
        }),
      })
      if (resData?.error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: resData.error,
        })
        return
      }
      setIsDialogOpen(true)
      setSuccess(resData)

      // Swal.fire({
      //   icon: 'success',
      //   title: 'Payment Success',
      //   text: 'Your order has been placed',
      //   confirmButtonText: 'OK',
      //   didClose() {
      //     router?.push(
      //       `/my-account/my-order/${
      //         resData?.data?._id || resData?.data[0]?._id
      //       }`
      //     )
      //   },
      //   allowOutsideClick: false,
      // })
    }

  // TODO: ONLINE product order handler
  const handelOrderProductOnline = async () => {
    try {
      const resData = await mutate({
        path: 'checkout/payment/product',
        method: 'POST',
        body: JSON.stringify({
          productId: router?.query?.productId,
          quantity: router?.query?.quantity,
          addressId: addressId,
          couponId: router?.query?.couponId,
          // return_url: `${window.location.origin}/checkout/verify-payment?order_id={order_id}`,
        }),
      })

      if (resData?.error) throw new Error(resData?.error)

      openRazorpay(
        resData?.data?.amount,
        resData?.data?.paymentOrderId,
        handelPaymentVerification
      )

      // if (productResponseData?.error)
      // throw new Error(productResponseData?.error)

      // openCashfree(productResponseData?.data?.paymentSessionId)
    } catch (error) {
      const err = error as Error
      Swal.fire({
        title: 'Oops!',
        text: err?.message,
        icon: 'error',
        confirmButtonText: 'Ok',
        allowOutsideClick: false,
      })
    }
  }

  //TODO: ONLINE cart order handler
  const handleOrderCartOnline = async () => {
    try {
      const resData = await mutate({
        path: 'checkout/payment/cart',
        method: 'POST',
        body: JSON.stringify({
          shippedTo: addressId,
          couponId: router?.query?.couponId,
          // return_url: `${window.location.origin}/checkout/verify-payment?order_id={order_id}`,
        }),
      })
      console.log({ data: resData?.data?.amount })
      console.log({ data: resData?.data?.paymentOrderId })
      // alert(JSON.stringify(resData))
      // return
      openRazorpay(
        resData?.data?.amount,
        resData?.data?.paymentOrderId,
        handelPaymentVerification
      )
      // if (cartResponseData?.error) throw new Error(cartResponseData?.error)
      // openCashfree(cartResponseData?.data?.paymentSessionId)
    } catch (error) {
      const err = error as Error
      Swal.fire({
        title: 'Oops!',
        text: err?.message,
        icon: 'error',
        confirmButtonText: 'Ok',
        allowOutsideClick: false,
      })
    }
  }

  //TODO: ONLINE order handler
  const handelOnlinePayment = () => {
    switch (router?.query?.type?.toString()?.toUpperCase()) {
      case 'PRODUCT':
        handelOrderProductOnline()
        break
      default:
        handleOrderCartOnline()
        break
    }
  }

  //TODO: payment method handler (Online/COD)
  const handelConfirmOrder = () => {
    switch (selectedValue) {
      case 'ONLINE':
        handelOnlinePayment()
        break
      case 'COD':
        handelCashOnDelivery()
        break
      default:
        Swal.fire({
          text: 'Please Select Payment Option',
          icon: 'error',
          confirmButtonText: 'Ok',
          allowOutsideClick: false,
        })
        break
    }
  }

  return (
    <>
      <div className={`mb-2 flex items-center gap-2`}>
        <p className="font-semibold uppercase text-gray-600">PAYMENT OPTIONS</p>
      </div>
      <Collapse timeout="auto" unmountOnExit>
        <div className="flex gap-2">
          <Radio
            checked={selectedValue === 'ONLINE'}
            onChange={handleChange}
            size="small"
            value="ONLINE"
            name="radio-buttons"
            inputProps={{ 'aria-label': 'ONLINE' }}
            className="!p-0"
          />
          <p className="tracking-wider">Online Payment</p>
        </div>

        <div className="mt-4 flex gap-2">
          <Radio
            checked={selectedValue === 'COD'}
            onChange={handleChange}
            size="small"
            value="COD"
            name="radio-buttons"
            inputProps={{ 'aria-label': 'COD' }}
            className="!p-0"
          />
          <p className="tracking-wider">Cash On Delivery</p>
        </div>
        <div className="mt-4 flex justify-end ">
          <button
            className="discount-card relative overflow-hidden rounded bg-theme px-6 py-3 tracking-wide text-white"
            onClick={handelConfirmOrder}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={21} /> : 'CONFIRM ORDER'}
          </button>
        </div>
      </Collapse>
      <Dialog
        open={isDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <article className="flex h-[75vh] w-full flex-col items-center justify-center gap-4 p-10">
          <div className="h-48 w-48">
            <img src="/success.gif" alt="success-icon" className="w-full" />
          </div>
          <h1 className="text-2xl font-semibold text-green-600">Thank you.</h1>
          <p className="text-center text-lg font-semibold ">
            Your order has been placed successfully.
          </p>
          {success?.voucher?.code ? (
            <section className="scratch-card text-center">
              <h1 className="text-lg font-medium text-slate-800">
                <span className="font-semibold text-theme">Congrats 🎉!</span>{' '}
                You have won a scratch card.
              </h1>
              <aside
                className="relative my-4 h-10 w-full cursor-pointer overflow-hidden rounded-md border border-theme_light"
                onClick={() => setIsAnimation(true)}
              >
                <p className="z-1 grid h-full w-full  place-items-center text-center font-semibold uppercase text-theme">
                  {success?.voucher?.code}
                </p>
                <div
                  className={`z-5 absolute  top-0 h-10 w-1/4 bg-theme_light transition-all duration-[400ms] ease-in ${
                    isAnimation ? '-left-1/4 opacity-50' : 'left-0 opacity-100'
                  }`}
                ></div>
                <div
                  className={`z-5 absolute left-1/4 h-10 w-1/4 bg-theme_light transition-all duration-[500ms] ease-in-out ${
                    isAnimation ? 'top-full opacity-40' : 'top-0 opacity-100'
                  }`}
                ></div>
                <div
                  className={`z-5 absolute right-1/4 h-10 w-1/4 bg-theme_light transition-all duration-[500ms] ease-in-out ${
                    isAnimation
                      ? 'bottom-full opacity-40'
                      : 'bottom-0 opacity-100'
                  }`}
                ></div>
                <div
                  className={`z-5 absolute top-0 h-10 w-1/4 bg-theme_light transition-all duration-[400ms] ease-out ${
                    isAnimation
                      ? '-right-1/4 opacity-50'
                      : 'right-0 opacity-100'
                  }`}
                ></div>
              </aside>
              <p className="text-slate-800">
                <span className="text-theme">Note: </span>Click the above card
                to see the code.
              </p>
            </section>
          ) : null}
          <section>
            <button
              className="discount-card relative overflow-hidden rounded-md bg-green-600 px-6 py-3 text-lg font-semibold tracking-wide text-white"
              onClick={() =>
                router?.push(
                  `/my-account/my-order/${
                    success?.data?._id || success?.data[0]?._id
                  }`
                )
              }
            >
              OK
            </button>
          </section>
        </article>
      </Dialog>
    </>
  )
}

export default PaymentSection
