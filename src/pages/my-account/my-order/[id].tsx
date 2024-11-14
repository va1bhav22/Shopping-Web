import GradeIcon from '@mui/icons-material/Grade'
import HelpIcon from '@mui/icons-material/Help'
import { CircularProgress, Dialog, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { support } from 'assets/home'
import CommonBanner from 'components/CommonBanner'
import ProgressBar from 'components/order-details/ProgressBar'
import { PrivateRoute, PublicLayout } from 'layouts'
import React, { useEffect, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import Radio from '@mui/material/Radio'
import getInvoice from 'api/invoiceDownload'
import ResponsiveProgressBar from 'components/order-details/ResponsiveProgressBar'
import RatingAndReview from 'forms/ratingAndReview'
import SupportForm from 'forms/support'
import { useAuth } from 'hooks'
import useAuthFetch from 'hooks/useAuthFetch'
import usePayment from 'hooks/usePayment'
import useSWRAPI from 'hooks/useSWRAPI'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Skeleton from 'react-loading-skeleton'
import { SupportUsForm } from 'schemas'
import Swal from 'sweetalert2'
import OrderType from 'types/order'
import { currencyFormatter } from 'utils'
import * as Yup from 'yup'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

// console.log({ initialValues })

const supportValidationSchema = SupportUsForm().reduce(
  (
    accumulator: { [x: string]: any },
    currentValue: { name: string | number; validationSchema: any }
  ) => {
    accumulator[currentValue.name] = currentValue.validationSchema
    return accumulator
  },
  {} as { [key: string]: Yup.StringSchema }
)

const OrderDetails = () => {
  return (
    <PrivateRoute>
      <PublicLayout title="Order Details | Prizen">
        <CommonBanner title="Order Details" />
        <OrderDetailsSection />
      </PublicLayout>
    </PrivateRoute>
  )
}

const OrderDetailsSection = () => {
  const { query } = useRouter()
  const { data, isValidating, mutate } = useSWRAPI(`order/${query?.id}`)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isOpenSupport, setIsOpenSupport] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'ONLINE'>('COD')
  const [isOpenPaymentMethodOpen, setIsOpenPaymentMethodOpen] = useState(false)
  const { user, isUserLoading } = useAuth()
  const { push } = useRouter()
  useEffect(() => {
    if (!isUserLoading && !user?._id) {
      push('/signin')
    }
  }, [user?._id, isUserLoading])
  const handleClose = () => {
    setIsDialogOpen(false)
    setIsOpenSupport(false)
  }
  const [invoiceLoading, setInvoiceLoading] = useState(false)
  const handelInvoiceDownload = async () => {
    try {
      setInvoiceLoading(true)
      const resData = await getInvoice(query?.id as string)
      window.open(resData as string, '', 'width=2480,height=3508')?.print()
    } catch (error) {
      console.log(error)
    } finally {
      setInvoiceLoading(false)
    }
  }
  const { openRazorpay } = usePayment()
  const {
    isLoading: isBulkOrderPaymentLoading,
    mutate: fetchBulkOrderPayment,
  } = useAuthFetch()
  const handelOnlinePaymentVerification =
    (OrderId: string) =>
    (payment_order_id: string) =>
    async (response: any) => {
      const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
        response
      const resData = await fetchBulkOrderPayment({
        path: `order/bulk/payment/${OrderId}/verify`,
        method: 'POST',
        body: JSON.stringify({
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
          payment_order_id,
          paymentMethod: 'ONLINE',
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
      Swal.fire({
        icon: 'success',
        title: 'Payment Success',
        text: 'Your order has been placed',
        confirmButtonText: 'OK',
        didClose() {
          mutate()
        },
        allowOutsideClick: false,
      })
    }
  const handelCODBulkOrderPayment = async (OrderId: string) => {
    const resData = await fetchBulkOrderPayment({
      path: `order/bulk/payment/${OrderId}/verify`,
      method: 'POST',
      body: JSON.stringify({
        paymentMethod: 'COD',
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
    Swal.fire({
      icon: 'success',
      title: 'Payment Success',
      text: 'Your order has been placed',
      confirmButtonText: 'OK',
      didClose() {
        mutate()
      },
      allowOutsideClick: false,
    })
  }
  const handelBulkOrderPayment = async ({
    orderId,
    paymentMethod,
  }: {
    orderId: string
    paymentMethod: 'ONLINE' | 'COD'
  }) => {
    switch (paymentMethod) {
      case 'COD':
        handelCODBulkOrderPayment(orderId)
        break
      case 'ONLINE':
        const resData = await fetchBulkOrderPayment({
          path: `order/bulk/payment/${orderId}`,
          method: 'POST',
        })
        if (resData?.error) {
          return Swal?.fire({
            icon: 'error',
            title: 'Oops...',
            text: resData?.error,
          })
        }
        openRazorpay(
          resData?.data?.amount,
          resData?.data?.id,
          handelOnlinePaymentVerification(orderId)
        )
        break

      default:
        Swal?.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please select payment method',
        })
        break
    }
  }

  const { isLoading: orderCancelLoading, mutate: fetchCancelOrder } =
    useAuthFetch()
  const handelCancelOrder = async (orderId: string) => {
    const resData = await fetchCancelOrder({
      path: `order/${orderId}/cancel`,
      method: 'PUT',
    })
    if (resData?.error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: resData.error,
      })
      return
    }
    Swal.fire({
      icon: 'success',
      title: 'Order Cancelled',
      text: 'Your order has been cancelled',
      confirmButtonText: 'OK',
      didClose() {
        mutate()
      },
    })
  }

  if (isValidating) return <SkeletonSection />
  if (!data) return <div>No Orders</div>
  const OrderData: OrderType = data?.data?.data
  return (
    <section className="flex flex-col gap-5 bg-gray-100 py-16">
      <section className="main-container  flex flex-col items-center justify-between gap-6 bg-white p-8 lg:flex-row lg:items-start">
        <div className="flex items-start gap-4">#{OrderData?._id}</div>
        <div>{new Date(OrderData?.createdAt)?.toLocaleString()}</div>
      </section>
      <section className="main-container flex justify-between bg-white p-8">
        <div>
          <h1 className="text-lg font-semibold tracking-wide">
            Delivery Address
          </h1>
          <h1 className="py-3 font-semibold">{OrderData?.shippedTo?.name}</h1>
          <p className="text-sm tracking-wide text-gray-500">
            {`${OrderData?.shippedTo?.name} ,${OrderData?.shippedTo?.street}, ${OrderData?.shippedTo?.city}, ${OrderData?.shippedTo?.state}, ${OrderData?.shippedTo?.country}, ${OrderData?.shippedTo?.zip}`}
          </p>
          <h1 className="py-3 pb-1 text-lg font-semibold tracking-wide">
            Phone number
          </h1>

          <p className="text-sm tracking-wide text-gray-500">{`${
            OrderData?.shippedTo?.countryCode
              ? `+${OrderData?.shippedTo?.countryCode}`
              : ''
          } ${OrderData?.shippedTo?.phoneNumber}`}</p>
          <p className="pt-5 text-sm tracking-wide text-gray-500">
            This order is also tracked by{' '}
            {`${
              OrderData?.shippedTo?.countryCode
                ? `+${OrderData?.shippedTo?.countryCode}`
                : ''
            } ${OrderData?.shippedTo?.phoneNumber}`}
          </p>
        </div>
        {OrderData?.status === 'DELIVERED' && (
          <button
            className="border-btheme h-fit rounded border px-6 py-3"
            onClick={handelInvoiceDownload}
          >
            {invoiceLoading ? 'Loading...' : 'Download Invoice'}
          </button>
        )}
        {['PENDING', 'INITIATED', 'CONFIRMED', 'PACKED']?.includes(
          OrderData?.status
        ) && (
          <button
            className="h-fit rounded border border-red-500 px-6 py-3 text-red-500"
            onClick={() => handelCancelOrder(OrderData?._id)}
          >
            {orderCancelLoading ? 'Loading...' : 'Cancel'}
          </button>
        )}
        {OrderData?.status === 'PENDING' && OrderData?.totalPrice ? (
          <button
            className="border-btheme h-fit rounded border bg-yellow-500 px-6 py-3"
            onClick={() => setIsOpenPaymentMethodOpen(true)}
            disabled={isBulkOrderPaymentLoading}
          >
            {isBulkOrderPaymentLoading ? 'Loading...' : 'Pay Now'}
          </button>
        ) : null}
      </section>
      <section className="main-container  flex flex-col items-center justify-between gap-6 bg-white p-8 lg:flex-row lg:items-start">
        <div className="flex items-start gap-4">
          <Link legacyBehavior href={`/products/${OrderData?.product?._id}`}>
            <img
              src={OrderData?.product?.displayImage?.url}
              alt={OrderData?.product?.title}
              className="w-16 cursor-pointer"
            />
          </Link>
          <span>
            <Link legacyBehavior href={`/products/${OrderData?.product?._id}`}>
              <h1 className="cursor-pointer hover:text-theme">
                {OrderData?.product?.title}
              </h1>
            </Link>
            <p className="text-xs tracking-wide text-gray-500">
              Seller: {OrderData?.store?.displayName}
            </p>
            <p className="text-xs tracking-wide text-gray-500">
              Quantity: {OrderData?.quantity}
            </p>
            <h1 className="text-sm font-semibold">
              Total: {currencyFormatter(OrderData?.totalPrice)}
            </h1>
          </span>
        </div>
        <div className="hidden md:block">
          <ProgressBar status={OrderData?.status} />
          {OrderData?.ETA && (
            <p className="w-full text-center">
              ETA: {new Date(OrderData?.ETA).toDateString()}
            </p>
          )}
        </div>
        <div className="block md:hidden">
          <ResponsiveProgressBar status={OrderData?.status} />
          {OrderData?.ETA && (
            <p className="w-full text-center">
              ETA: {new Date(OrderData?.ETA).toDateString()}
            </p>
          )}
        </div>
        <div>
          {OrderData?.status === 'DELIVERED' && (
            <span
              className="mb-3 flex cursor-pointer items-center gap-2 text-theme"
              onClick={() => setIsDialogOpen(true)}
            >
              <GradeIcon />
              Rate & Review Product
            </span>
          )}
          <Dialog
            open={isDialogOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            style={{ padding: '32px' }}
            // maxWidth="500px"
          >
            <RatingAndReview
              orderId={query?.id as string}
              onSuccess={() => handleClose()}
            />
          </Dialog>
          <span
            className="flex cursor-pointer items-center gap-2 text-theme"
            onClick={() => setIsOpenSupport(true)}
          >
            <HelpIcon />
            Need Help?
          </span>
          <Dialog
            open={isOpenSupport}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            style={{ padding: '32px' }}
          >
            <div className="relative  p-6 ">
              <CloseIcon
                className="absolute top-2 right-2 cursor-pointer text-red-500"
                onClick={() => setIsOpenSupport(false)}
              />
              <div className="flex justify-center">
                <img src={support.src} alt="support-team" className="w-1/2" />
              </div>
              <SupportForm onSuccess={() => handleClose()} />
            </div>
          </Dialog>
          <Dialog
            open={isOpenPaymentMethodOpen}
            TransitionComponent={Transition}
            keepMounted={false}
            onClose={() => setIsOpenPaymentMethodOpen(false)}
            aria-describedby="alert-dialog-slide-description"
            style={{ padding: '32px' }}
          >
            <div className="relative  flex flex-col items-center justify-center gap-5 p-6">
              {/* <CloseIcon
                className="absolute top-2 right-2 cursor-pointer text-red-500"
                onClick={() => setIsOpenPaymentMethodOpen(false)}
              /> */}
              <h1>Select payment method</h1>
              <div>
                <div className="flex w-full gap-2">
                  <Radio
                    checked={paymentMethod === 'ONLINE'}
                    onChange={() => setPaymentMethod('ONLINE')}
                    size="small"
                    value="ONLINE"
                    name="radio-buttons"
                    inputProps={{ 'aria-label': 'ONLINE' }}
                    className="!p-0"
                  />
                  <p className="tracking-wider">Online Payment</p>
                </div>

                <div className=" flex w-full gap-2">
                  <Radio
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    size="small"
                    value="COD"
                    name="radio-buttons"
                    inputProps={{ 'aria-label': 'COD' }}
                    className="!p-0"
                  />
                  <p className="tracking-wider">Cash On Delivery</p>
                </div>
              </div>
              <div className=" flex w-full justify-end">
                <button
                  className="discount-card relative w-full overflow-hidden rounded bg-theme px-6 py-3 tracking-wide text-white"
                  onClick={() => {
                    setIsOpenPaymentMethodOpen(false)
                    handelBulkOrderPayment({
                      orderId: OrderData?._id,
                      paymentMethod: paymentMethod,
                    })
                  }}
                  disabled={isBulkOrderPaymentLoading}
                >
                  {isBulkOrderPaymentLoading ? (
                    <CircularProgress size={21} />
                  ) : (
                    'CONTINUE'
                  )}
                </button>
              </div>
            </div>
          </Dialog>
        </div>
      </section>
      {/* <section className="main-container  flex flex-col items-center justify-between gap-6 bg-white p-8 lg:flex-row lg:items-start">
        <div className="flex items-start gap-4">
          <span>
            <p></p>
            <p></p>
            <b>{currencyFormatter(OrderData?.billing?.totalPrice)}</b>
          </span>
        </div>
        <div className="hidden md:block">
          <span>
            <p>Payment Method</p>
            <b>{OrderData?.billing?.paymentMethod}</b>
          </span>
        </div>
        <div>
          {OrderData?.billing?.metadata?.razorpay_payment_id && (
            <span>
              <p>Transaction Id</p>
              <b>{OrderData?.billing?.metadata?.razorpay_payment_id}</b>
            </span>
          )}
        </div>
      </section> */}
    </section>
  )
}

const SkeletonSection = () => {
  return (
    <section className="flex flex-col gap-5 bg-gray-100 py-16">
      <section className="main-container flex w-full justify-between bg-white p-8">
        <Skeleton className="w-36" />
        <Skeleton className="w-24" />
      </section>
      <section className="main-container flex justify-between bg-white p-8">
        <div className="w-1/2">
          <Skeleton count={6} />
        </div>
        <Skeleton height="2rem" width="6rem" />
      </section>
      <section className="main-container  flex w-full flex-col items-center justify-between gap-6 bg-white p-8 lg:flex-row lg:items-start">
        <div className="flex items-start gap-4 md:w-1/3">
          <Skeleton width="4rem" height="5rem" />
          <span>
            <Skeleton count={4} height="1rem" width="5rem" />
          </span>
        </div>
        <div className="hidden place-self-center md:block md:w-1/3">
          <Skeleton height="2rem" width="80%" />
        </div>
        <div className="flex w-full justify-center md:hidden">
          <Skeleton height="8rem" width="2rem" />
        </div>
        <div className="w-full md:w-1/3">
          <Skeleton
            count={2}
            height="1.25rem"
            width="50%"
            containerClassName="flex flex-col md:items-end items-center gap-2"
          />
        </div>
      </section>
    </section>
  )
}

export default OrderDetails
