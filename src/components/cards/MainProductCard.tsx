import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import ProductType from 'types/product'
import { getDaysFromSeconds, getDiscountValue } from 'utils'
// import { useAuth } from 'hooks'
import { Tooltip } from '@mui/material'
import { ProductImageNotAvailable } from 'assets'
import { useAuth, useIsMounted } from 'hooks'
import useAuthFetch from 'hooks/useAuthFetch'
import {
  Favorite,
  FavoriteBorder,
  ShoppingCart,
  ShoppingCartOutlined,
  Star,
  StarBorder,
} from '@mui/icons-material'

type Props = {
  product: ProductType
  reload?: () => void
  isDataUpdating?: boolean
}

const MainProductCard = ({ product, reload, isDataUpdating }: Props) => {
  // const [isCartAdded, setIsCartAdded] = useState(false)
  // const [isWishlistAdded, setIsWishlistAdded] = useState(false)
  const router = useRouter()

  const { user, getUser } = useAuth()
  const [isInCart, setIsInCart] = useState<boolean>(false)
  const [isInWishList, setIsInWishList] = useState<boolean>(false)
  const { isLoading: isCartLoading, mutate: fetchCart } = useAuthFetch()
  const { isLoading: isWishlistLoading, mutate: fetchWishlist } = useAuthFetch()
  const IsMounted = useIsMounted()
  useEffect(() => {
    IsMounted?.current && setIsInCart(product?.isInCart)
    IsMounted?.current && setIsInWishList(product?.isInWishList)
  }, [product?._id])

  const handelAddToCart = async (productId: string, quantity: number) => {
    if (!user?._id) {
      return router.push('/signin')
    }
    setIsInCart(true)
    const resData = await fetchCart({
      path: 'cart/add',
      method: 'PUT',
      body: JSON.stringify({
        product: productId,
        quantity,
      }),
    })
    if (resData?.error) {
      setIsInCart(false)
    } else {
      setIsInCart(true)
      //set updated cart count
      getUser()
    }
    // reload && reload()
  }
  const handelRemoveFromCart = async (productId: string) => {
    if (!user?._id) {
      return router.push('/signin')
    }
    setIsInCart(false)
    const resData = await fetchCart({
      path: `cart/${productId}?idOf=PRODUCT`,
      method: 'DELETE',
    })
    if (resData?.error) {
      setIsInCart(true)
    } else {
      setIsInCart(false)
      //set updated cart count
      getUser()
    }
    // reload && reload()
  }
  const handelAddToWishlist = async (productId: string) => {
    if (!user?._id) {
      return router.push('/signin')
    }
    setIsInWishList(true)
    const resData = await fetchWishlist({
      path: 'wishlist',
      method: 'PUT',
      body: JSON.stringify({
        productId,
      }),
    })
    if (resData?.error) {
      setIsInWishList(false)
    } else {
      setIsInWishList(true)
    }
    // reload && reload()
  }
  const handelRemoveFromWishlist = async (productId: string) => {
    if (!user?._id) {
      return router.push('/signin')
    }
    setIsInWishList(false)
    const resData = await fetchWishlist({
      path: `wishlist/${productId}`,
      method: 'DELETE',
    })
    if (resData?.error) {
      setIsInWishList(true)
    } else {
      setIsInWishList(false)
    }
    // reload && reload()
  }
  return (
    <article className="group">
      <section className="relative flex h-80 flex-col items-center justify-center overflow-hidden bg-theme/5 p-4 text-center">
        {/* //TODO: Sale Discount */}

        <div className="absolute left-2 top-2 flex w-full flex-col items-start gap-2">
          {+getDiscountValue(product?.mrp, product?.salePrice) !== 0 && (
            <p
              className={`flex h-6 w-14 items-center justify-center rounded bg-theme text-xs tracking-wider text-white`}
            >
              {getDiscountValue(product?.mrp, product?.salePrice)} %
            </p>
          )}
          {getDaysFromSeconds(
            new Date().getTime() - new Date(product?.createdAt).getTime()
          ) < 7 && (
            <p
              className={`flex h-6 w-14 items-center justify-center rounded bg-green-600 text-xs tracking-wider text-white`}
            >
              New
            </p>
          )}
        </div>

        <Link legacyBehavior href={`/products/${product?._id}`} passHref>
          <a className="flex w-full justify-center">
            <img
              src={product?.displayImage?.url || ProductImageNotAvailable?.src}
              alt="product"
              className="mt-2 h-40 cursor-pointer object-contain"
            />
          </a>
        </Link>

        {/* //TODO: Star Ratings */}

        <div className="mt-2 flex justify-center gap-1 text-base text-theme">
          {[...Array(5)].map((item, index) => (
            <Fragment key={index}>
              {(product?.reviews?.stars / product?.reviews?.total || 0) >=
              index + 1 ? (
                <Star fontSize="inherit" color="inherit" />
              ) : (
                <StarBorder fontSize="inherit" color="inherit" />
              )}
            </Fragment>
          ))}
        </div>
        {/* <p className="text-sm tracking-wider text-slate-900">
        {product?.measureUnit}
        {product?.measureType}
      </p> */}

        {/* //TODO: Add to Wishlist */}

        <div
          className={`invisible absolute -right-12 top-2 opacity-0 transition-all duration-300 ease-in-out group-hover:visible group-hover:right-2 group-hover:opacity-100`}
        >
          {isInWishList ? (
            <button
              className="flex h-[2.1rem] w-[2.1rem] items-center justify-center rounded-full bg-white p-2 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
              onClick={() => handelRemoveFromWishlist(product?._id)}
              disabled={isWishlistLoading}
            >
              <Tooltip title={'Add to wishlist'} placement="top">
                <Favorite className="!text-lg !text-theme " />
              </Tooltip>
            </button>
          ) : (
            <button
              className="flex h-[2.1rem] w-[2.1rem] items-center justify-center rounded-full bg-white p-2 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
              onClick={() => handelAddToWishlist(product?._id)}
              disabled={isWishlistLoading}
            >
              <Tooltip title={'Add to wishlist'} placement="top">
                <FavoriteBorder className="!text-lg !text-theme" />
              </Tooltip>
            </button>
          )}
        </div>

        {/* //TODO: Add to Cart */}

        <div className="invisible absolute -bottom-[60px] left-0 right-0 opacity-0 transition-all duration-300 ease-in-out group-hover:visible group-hover:bottom-0 group-hover:opacity-100">
          {isInCart ? (
            <button
              className="flex h-9 w-full items-center justify-center gap-2 bg-theme text-center text-sm font-medium tracking-wide text-white"
              onClick={() => {
                handelRemoveFromCart(product?._id)
              }}
              disabled={isCartLoading}
            >
              <ShoppingCart fontSize="small" /> Remove From Cart
            </button>
          ) : (
            <button
              className="flex h-9 w-full items-center justify-center gap-2 bg-slate-800 text-center text-sm font-medium tracking-wide text-white transition-all duration-300 ease-in-out hover:bg-black"
              onClick={() => {
                handelAddToCart(product?._id, product?.moq || 1)
              }}
              disabled={isCartLoading}
            >
              <ShoppingCartOutlined fontSize="small" /> Add To Cart
            </button>
          )}
        </div>
      </section>
      <section className="flex flex-col items-center gap-1 pt-2 text-center">
        <p className="text-sm tracking-wider md:text-base">{product?.title}</p>

        <div className="flex items-center gap-2 tracking-wider text-slate-800">
          {product?.mrp !== product?.salePrice && (
            <p className="text-sm line-through md:text-base">₹{product?.mrp}</p>
          )}
          <p className="text-base font-medium md:text-lg">
            ₹{product?.salePrice}
          </p>
        </div>
      </section>
    </article>
  )
}

export default MainProductCard
