import CloseIcon from '@mui/icons-material/Close'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import { Dialog, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { ProductImageNotAvailable } from 'assets'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import OrderType from 'types/order'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const OrderHistoryCard = ({ myOrder }: { myOrder: OrderType }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const router = useRouter()
  return (
    <div className="bg-white px-6">
      <div className="flex w-full flex-col items-center border-b border-gray-200 py-2 md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-6 md:flex-row">
          <p className="rounded-[30px] bg-gray-200 px-6 py-3 font-semibold">
            Order: <span className="text-theme"> #{myOrder._id}</span>
          </p>
          <p className="tracking-wide text-gray-600">
            Order Placed: {new Date(myOrder?.createdAt).toLocaleDateString()}
          </p>
        </div>
        <button
          className="discount-card relative my-4 flex items-center gap-2 overflow-hidden rounded-lg bg-theme px-6 py-3 text-sm text-white"
          onClick={() => router.push(`/my-account/my-order/${myOrder?._id}`)}
        >
          <MyLocationIcon className="!text-base" />
          TRACK ORDER
        </button>
        <Dialog
          open={isDialogOpen}
          TransitionComponent={Transition}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
          style={{ padding: '32px' }}
        >
          <div className="relative">
            <CloseIcon
              onClick={() => setIsDialogOpen(false)}
              className="absolute top-2 right-2 cursor-pointer text-red-500"
            />
            <div className="hidden px-8 py-12 md:block">
              {/* <ProgressBar /> */}
            </div>
            <div className="block px-8 py-12 md:hidden">
              {/* <ResponsiveProgressBar /> */}
            </div>
          </div>
        </Dialog>
      </div>
      <section className="flex w-full flex-col items-center border-b border-gray-200 py-6 md:flex-row md:justify-between">
        <div className="flex w-full flex-row gap-4">
          <div className="flex items-center justify-center rounded-md bg-gray-200 px-4">
            <Link legacyBehavior href={`/my-account/my-order/${myOrder?._id}`}>
              <img
                src={
                  myOrder?.product?.displayImage?.url ||
                  ProductImageNotAvailable?.src
                }
                alt="pure-honey"
                className="h-auto w-full max-w-[5rem] cursor-pointer"
              />
            </Link>
          </div>
          <div className="flex flex-col justify-between gap-4 md:gap-0">
            <div>
              <Link
                legacyBehavior
                href={`/my-account/my-order/${myOrder?._id}`}
              >
                <h1 className="cursor-pointer font-semibold tracking-wide hover:text-theme md:text-xl">
                  {myOrder?.product?.title}
                </h1>
              </Link>
              <p className="text-sm tracking-wider text-gray-500">
                {myOrder?.product?.shortDescription}
              </p>
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:gap-0">
              <p className="tracking-wide text-gray-600 md:pr-6">
                {myOrder?.product?.measureUnit} {myOrder?.product?.measureType}
              </p>
              <p className="tracking-wide text-gray-600 md:border-x md:border-gray-500 md:px-6">
                Qty: {myOrder?.quantity}
              </p>
              <p className="font-semibold tracking-wide md:pl-6">
                Rs. {myOrder?.product?.salePrice}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex w-full  items-center justify-between gap-4 text-left md:mt-0 md:items-center md:gap-0">
          <span>
            <p className="tracking-wide text-gray-500">Status</p>
            <p className="font-semibold text-theme md:text-2xl">
              {myOrder?.status}
            </p>
          </span>
          <span>
            <p className="tracking-wide text-gray-500">Delivery Expected By:</p>
            <p className="font-semibold md:text-lg">
              {myOrder?.ETA
                ? new Date(myOrder?.ETA)?.toLocaleString()
                : 'Not Available'}
            </p>
          </span>
        </div>
      </section>
    </div>
  )
}

export default OrderHistoryCard
