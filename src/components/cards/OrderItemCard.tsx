import { CircularProgress } from '@mui/material'
import { ProductImageNotAvailable } from 'assets'
import Counter from 'components/Counter'
import { useAuth } from 'hooks'
import useAuthFetch from 'hooks/useAuthFetch'
import { useRouter } from 'next/router'
import React from 'react'
import OrderSummeryItemType from 'types/orderSummeryItem'
import { getDiscountValue } from 'utils'

type Props = {
  orderItem: OrderSummeryItemType
  reload?: () => void
  isSingleItem?: boolean
}

const OrderItemCard = ({ orderItem, reload, isSingleItem }: Props) => {
  const router = useRouter()
  const { mutate } = useAuthFetch()
  const { getUser } = useAuth()
  const [isCartRemoveLoading, setIsCartRemoveLoading] = React.useState(false)
  const [isAddQuantityLoading, setIsAddQuantityLoading] = React.useState(false)
  const [isRemoveQuantityLoading, setIsRemoveQuantityLoading] =
    React.useState(false)
  const [isSaveForLaterLoading, setIsSaveForLaterLoading] =
    React.useState(false)
  const handelAddQuantity = async (productId: string, quantity: number) => {
    setIsAddQuantityLoading(true)
    if (isSingleItem) {
      router?.push(
        `/checkout?type=PRODUCT&productId=${productId}&quantity=${
          quantity + orderItem?.quantity
        }&${
          router?.query?.couponId ? `couponId=${router?.query?.couponId}` : ''
        }`
      )
      return
    }
    await mutate({
      path: 'cart/add',
      method: 'PUT',
      body: JSON.stringify({
        product: productId,
        quantity,
      }),
    })
    getUser()
    setIsAddQuantityLoading(false)
    reload && reload()
  }
  const handelRemoveQuantity = async (
    ID: string,
    quantity: number /**is a negative value */
  ) => {
    setIsRemoveQuantityLoading(true)
    if (isSingleItem) {
      if (orderItem?.quantity + quantity === 0) {
        router?.push(`/products/${orderItem.product._id}`)
        return
      }
      router?.push(
        `/checkout?type=PRODUCT&productId=${ID}&quantity=${
          orderItem?.quantity + quantity
        }&${
          router?.query?.couponId ? `couponId=${router?.query?.couponId}` : ''
        }`
      )
      return
    }
    await mutate({
      path: 'cart/remove',
      method: 'PUT',
      body: JSON.stringify({
        product: ID,
        quantity,
      }),
    })
    setIsRemoveQuantityLoading(false)
    reload && reload()
  }
  const handelRemoveFromCart = async (ID: string) => {
    setIsCartRemoveLoading(true)
    await mutate({
      path: `cart/${ID}`,
      method: 'DELETE',
    })
    if (isSingleItem) {
      router?.push(`/products/${orderItem.product._id}`)
      return
    }
    setIsCartRemoveLoading(false)
    reload && reload()
  }
  return (
    <div className="flex flex-col gap-10 border-b border-gray-200 p-6 lg:flex-row">
      <div className="flex flex-col items-center gap-4">
        <img
          src={
            orderItem?.product?.displayImage?.url ||
            ProductImageNotAvailable?.src
          }
          alt="pure-honey"
          className="h-32 w-24 bg-gray-100 object-contain"
          onClick={() => router.push(`/products/${orderItem?.product?._id}`)}
        />
        <Counter
          // initialCount={orderItems?.[0]?.quantity}
          // updateQuantity={(updatedQuantity: number) =>
          //   updateQuantity(orderItem?.product?.id, updatedQuantity)
          // }
          count={orderItem?.quantity}
          isDecrementLoading={isRemoveQuantityLoading}
          isIncrementLoading={isAddQuantityLoading}
          onDecrement={() => handelRemoveQuantity(orderItem?.product?._id, -1)}
          onIncrement={() => handelAddQuantity(orderItem?.product?._id, 1)}
        />
      </div>
      <div className="flex w-full flex-col items-center text-center lg:flex-row lg:items-start lg:justify-between lg:text-left">
        <div className="flex w-full flex-col items-center text-center lg:items-start lg:text-left">
          <h1 className="text-xl tracking-wide">{orderItem?.product?.title}</h1>

          <p className="text-sm text-gray-500">
            {orderItem?.product?.measureType}: {orderItem?.product?.measureUnit}
          </p>
          <div className="flex items-center gap-4 py-4">
            <p className='relative text-sm tracking-wider text-gray-500 before:absolute before:top-1/2 before:left-1/2 before:h-[2px] before:w-12 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-gray-500 before:content-[""] '>
              ₹{orderItem?.product?.salePrice}
            </p>
            <p className="text-lg font-semibold tracking-wider">
              ₹{orderItem?.product?.mrp}
            </p>
            {+getDiscountValue(
              orderItem?.product?.mrp,
              orderItem?.product?.salePrice
            ) !== 0 && (
              <p
                className={`flex items-center justify-center rounded bg-theme px-4  py-1 text-sm tracking-wider text-white`}
              >
                {getDiscountValue(
                  orderItem?.product?.mrp,
                  orderItem?.product?.salePrice
                )}
                % Off
              </p>
            )}
          </div>

          <button
            className="flex w-fit items-center gap-1 text-red-500 transition-all duration-300 ease-in-out"
            onClick={() => handelRemoveFromCart(orderItem?._id)}
            disabled={isCartRemoveLoading}
          >
            {isCartRemoveLoading ? <CircularProgress size={16} /> : 'REMOVE'}
          </button>
        </div>
        {/* <p className="text-center text-sm tracking-wide text-gray-500 lg:text-left">
          Deliver by Mon, july 4
        </p> */}
      </div>
    </div>
  )
}

export default OrderItemCard
