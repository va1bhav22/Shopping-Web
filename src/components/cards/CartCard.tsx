import { CircularProgress } from '@mui/material'
import { ProductImageNotAvailable } from 'assets'
import Counter from 'components/Counter'
import { useAuth } from 'hooks'
import useAuthFetch from 'hooks/useAuthFetch'
import React from 'react'
import CartItem from 'types/cartItem'
import { currencyFormatter, getDiscountValue } from 'utils'

type Props = {
  cartItem: CartItem
  reload?: () => void
}

const CartCard = ({ cartItem, reload }: Props) => {
  // const [productQuantity, setProductQuantity] = React.useState(
  //   cartItem?.quantity
  // )

  const [isCartRemoveLoading, setIsCartRemoveLoading] = React.useState(false)
  const [isAddQuantityLoading, setIsAddQuantityLoading] = React.useState(false)
  const [isRemoveQuantityLoading, setIsRemoveQuantityLoading] =
    React.useState(false)
  const [isSaveForLaterLoading, setIsSaveForLaterLoading] =
    React.useState(false)

  const { mutate } = useAuthFetch()
  const { getUser } = useAuth()

  const handelAddQuantity = async (productId: string, quantity: number) => {
    setIsAddQuantityLoading(true)
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
  const handelRemoveQuantity = async (ID: string, quantity: number) => {
    setIsRemoveQuantityLoading(true)
    await mutate({
      path: 'cart/remove',
      method: 'PUT',
      body: JSON.stringify({
        product: ID,
        quantity,
      }),
    })
    getUser()
    setIsRemoveQuantityLoading(false)
    reload && reload()
  }
  const handelRemoveFromCart = async (ID: string) => {
    setIsCartRemoveLoading(true)
    await mutate({
      path: `cart/${ID}`,
      method: 'DELETE',
    })
    cartItem?.quantity <= 1 && getUser()
    setIsCartRemoveLoading(false)
    reload && reload()
  }
  const handelSaveForLater = async (productId: string, cartId: string) => {
    setIsSaveForLaterLoading(true)
    await mutate({
      path: 'wishlist',
      method: 'PUT',
      body: JSON.stringify({
        productId,
      }),
    })
    await mutate({
      path: `cart/${cartId}`,
      method: 'DELETE',
    })
    getUser()
    setIsSaveForLaterLoading(false)
    reload && reload()
  }
  return (
    <div className="flex flex-col gap-10 border-b border-gray-200 p-6 lg:flex-row">
      <div className="flex flex-col items-center gap-4">
        <img
          src={
            cartItem?.product?.displayImage?.url ||
            ProductImageNotAvailable?.src
          }
          alt="pure-honey"
          className="h-32 w-24 bg-gray-100 object-contain"
        />
        <Counter
          onDecrement={() => handelRemoveQuantity(cartItem?.product?._id, -1)}
          onIncrement={() => handelAddQuantity(cartItem?.product?._id, 1)}
          isDecrementLoading={isRemoveQuantityLoading}
          isIncrementLoading={isAddQuantityLoading}
          count={cartItem?.quantity}
          // setCount={setCount}
          // cartQuantity={cartItem?.quantity}
          // cartProductId={cartItem?.product?.id}
        />
      </div>
      <div className="flex w-full flex-col items-center text-center lg:flex-row lg:items-start lg:justify-between lg:text-left">
        <div className="flex w-full flex-col items-center text-center lg:items-start lg:text-left">
          <h1 className="text-xl tracking-wide">{cartItem?.product?.title}</h1>

          <p className="text-sm text-gray-500">
            {cartItem?.product?.measureType}: {cartItem?.product?.measureUnit}
          </p>
          <div className="flex items-center gap-4 py-3">
            {cartItem?.product?.salePrice !== cartItem?.product?.mrp && (
              <p className="relative text-sm tracking-wider text-slate-800 line-through">
                {currencyFormatter(cartItem?.product?.mrp)}
              </p>
            )}
            <p className="text-lg font-semibold tracking-wider">
              {currencyFormatter(cartItem?.product?.salePrice)}
            </p>
            {+getDiscountValue(
              cartItem?.product?.mrp,
              cartItem?.product?.salePrice
            ) !== 0 && (
              <p
                className={`flex items-center justify-center rounded bg-theme px-4  py-1 text-sm tracking-wider text-white`}
              >
                {getDiscountValue(
                  cartItem?.product?.mrp,
                  cartItem?.product?.salePrice
                )}
                % Off
              </p>
            )}
          </div>
          <div className="flex gap-4">
            <button
              className="flex w-fit items-center gap-1 text-blue-500 transition-all duration-300 ease-in-out hover:text-theme"
              onClick={() =>
                handelSaveForLater(cartItem?.product?._id, cartItem?._id)
              }
              disabled={isSaveForLaterLoading}
            >
              {isSaveForLaterLoading ? (
                <CircularProgress size={16} />
              ) : (
                'SAVE FOR LATER'
              )}
            </button>
            <button
              className="flex w-fit items-center gap-1 text-red-500 transition-all duration-300 ease-in-out"
              onClick={() => handelRemoveFromCart(cartItem?._id)}
              disabled={isCartRemoveLoading}
            >
              {isCartRemoveLoading ? <CircularProgress size={16} /> : 'REMOVE'}
            </button>
          </div>
        </div>
        {/* <p className="text-center text-sm tracking-wide text-gray-500 lg:text-left">
          Deliver by Mon, july 4
        </p> */}
      </div>
    </div>
  )
}

export default CartCard
