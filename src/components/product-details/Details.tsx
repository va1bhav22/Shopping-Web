import {
  FavoriteBorder,
  ShoppingCart,
  ShoppingCartOutlined,
  Star,
  StarBorder,
} from '@mui/icons-material'
import { CircularProgress } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import { ProductImageNotAvailable } from 'assets'
import { DeliveryAddress } from 'components/checkout'
import ImageShowCase from 'components/core/ImageShowCase'
import { useAuth } from 'hooks'
import useAuthFetch from 'hooks/useAuthFetch'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import Swal from 'sweetalert2'
import ProductType from 'types/product'
import { getDiscountValue } from 'utils'

const Details = ({
  productData,
  reload,
  isDataLoading,
}: {
  productData: ProductType
  reload?: () => void
  isDataLoading?: boolean
}) => {
  const [inputValue, setInputValue] = useState<number>(0)
  const [isCustomQuantityClicked, setIsCustomQuantityClicked] = useState(false)

  const router = useRouter()

  const handleInputFieldChange = (event: any) => {
    const result = event.target.value.replace(/\D/g, '')
    setInputValue(result)
  }

  const handleBuyNow = () => {
    // if (isBusiness && inputValue.length === 0) {
    //   router.push('/business/checkout')
    //   return
    // }
    // if (isBusiness && inputValue.length > 0) {
    //   Swal.fire({
    //     title: 'Success',
    //     text: 'Your order request has been sent successfully. Kindly wait.',
    //     icon: 'success',
    //     confirmButtonText: 'Ok',
    //   })
    //   return
    // } else {
    router.push(
      `/checkout?type=product&productId=${productData?._id}&quantity=1&productType=${productData?.category?.name}`
    )
    // }
  }

  const { user, getUser } = useAuth()
  const { isLoading: isCartLoading, mutate: fetchCart } = useAuthFetch()
  const { isLoading: isWishlistLoading, mutate: fetchWishlist } = useAuthFetch()

  const handleAddToCart = async (productId: string, quantity: number) => {
    if (!user?._id) {
      return router.push('/signin')
    }
    await fetchCart({
      path: 'cart/add',
      method: 'PUT',
      body: JSON.stringify({
        product: productId,
        quantity,
      }),
    })
    getUser()
    reload && reload()
  }
  const handelAddToWishlist = async (productId: string) => {
    if (!user?._id) {
      return router.push('/signin')
    }
    await fetchWishlist({
      path: 'wishlist',
      method: 'PUT',
      body: JSON.stringify({
        productId,
      }),
    })
    reload && reload()
  }
  const { isLoading, mutate: fetchBulkOrder } = useAuthFetch()
  //bulk order
  const handelBulkOrder = async (
    productId: string,
    quantity: number,
    addressId: string
  ) => {
    const resData = await fetchBulkOrder({
      path: 'order/bulk',
      method: 'POST',
      body: JSON.stringify({
        productId,
        quantity,
        shippedTo: addressId,
      }),
    })
    console.log({ resData })
    if (resData?.error) {
      return Swal.fire({
        title: 'Opps!',
        text: resData?.error,
        icon: 'error',
        confirmButtonText: 'Ok',
      })
    }

    Swal.fire({
      title: 'Success',
      text: 'Your order request has been sent successfully. Kindly wait.',
      icon: 'success',
      confirmButtonText: 'Ok',
      didClose() {
        router.push(
          `/my-account/my-order/${resData?.data?._id || resData?.data[0]?._id}`
        )
      },
    })
  }

  return (
    <article className="main-container flex w-full flex-col gap-8 py-20 lg:flex-row lg:justify-between">
      <Head>
        <title>{productData?.title} | Prizen</title>
        <meta name="description" content={productData?.shortDescription} />
        <meta name="keywords" content={productData?.title} />
        <meta name="author" content="Prizen" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={productData?.title} />
        <meta
          property="og:description"
          content={productData?.shortDescription}
        />
        <meta property="og:image" content={productData?.displayImage?.url} />
        <meta
          property="og:url"
          content={`https://prizen.vercel.app/products/${productData?._id}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Prizen" />
      </Head>
      <section className="w-full lg:w-3/5">
        {isDataLoading ? (
          <div className="flex h-full w-full flex-col gap-2">
            <span className="h-[80%] w-full">
              <Skeleton height={'100%'} className="min-h-[30vh]" />
            </span>
            <span className="flex h-[20%] flex-row gap-2 overflow-x-auto overflow-y-hidden">
              <Skeleton height={'100%'} width={110} className="min-h-[10vh]" />
              <Skeleton height={'100%'} width={110} className="min-h-[10vh]" />
              <Skeleton height={'100%'} width={110} className="min-h-[10vh]" />
            </span>
          </div>
        ) : (
          <>
            {productData?.images?.length ? (
              <ImageShowCase
                Images={[
                  // productData?.images?.[0]?.url ||
                  //   ProductImageNotAvailable?.src,
                  ...productData?.images?.map((image) => image?.url),
                ]}
              />
            ) : (
              <ImageShowCase
                Images={[
                  // productData?.displayImage?.url ||
                  ProductImageNotAvailable?.src,
                ]}
              />
            )}
          </>
        )}
      </section>

      <section className="flex w-full flex-col gap-4 lg:w-2/5">
        <h1 className="text-2xl font-bold tracking-wide md:text-4xl">
          {isDataLoading ? <Skeleton /> : productData?.title}
        </h1>
        <div className="flex w-full items-center justify-start">
          <p className="flex justify-center gap-1 text-base text-theme">
            {isDataLoading ? (
              <Skeleton width={80} />
            ) : (
              [...Array(5)].map((_, index) => (
                <Fragment key={index}>
                  {productData?.reviews?.stars / productData?.reviews?.total >=
                  index + 1 ? (
                    <Star fontSize="inherit" color="inherit" />
                  ) : (
                    <StarBorder fontSize="inherit" color="inherit" />
                  )}
                </Fragment>
              ))
            )}
          </p>
        </div>
        <div className="flex items-center gap-4 py-1">
          {isDataLoading ? (
            <Skeleton width={250} />
          ) : (
            <Fragment>
              <p className="text-2xl font-semibold tracking-wider text-slate-800">
                ₹{productData?.salePrice || productData?.salePrice}
              </p>
              <p className="text-xl font-normal tracking-wider text-slate-800 line-through">
                ₹{productData?.mrp || productData?.mrp}
              </p>
              {+getDiscountValue(productData?.mrp, productData?.salePrice) !==
                0 && (
                <p
                  className={`flex h-6 w-14 items-center justify-center rounded bg-theme text-sm tracking-wider text-white`}
                >
                  {getDiscountValue(
                    productData?.mrp || productData?.mrp,
                    productData?.salePrice || productData?.salePrice
                  )}
                  %
                </p>
              )}
              <p
                className={`text-sm font-semibold ${
                  (productData?.stock || productData?.stock) > 0
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}
              >
                -{' '}
                {(productData?.stock || productData?.stock) > 0
                  ? 'IN STOCK'
                  : 'OUT OF STOCK'}
              </p>
            </Fragment>
          )}
        </div>

        <p className="tracking-wide text-slate-800">
          {isDataLoading ? (
            <Skeleton count={3} />
          ) : (
            productData?.shortDescription
          )}
        </p>
        <p className="text-sm tracking-wider">
          {isDataLoading ? (
            <Skeleton width={'30%'} />
          ) : (
            <>
              Available In:{' '}
              <span className="text-base font-semibold capitalize tracking-wide">
                {' '}
                {productData?.variants?.[0]?.measureType?.toLocaleLowerCase()}s
              </span>
            </>
          )}
        </p>
        <div className="flex justify-start gap-3">
          <div className="flex justify-start gap-3">
            {isDataLoading ? (
              <>
                <Skeleton height={30} width={60} />
                <Skeleton height={30} width={60} />
                <Skeleton height={30} width={60} />
              </>
            ) : (
              productData?.variants?.map((curElm: ProductType, index) => (
                <p
                  className={`flex h-10 w-20 cursor-pointer items-center justify-center border border-theme text-sm text-slate-800 ${
                    productData?._id === curElm?._id
                      ? 'scale-110 rounded shadow-[0_3px_10px_rgb(0,0,0,0.2)]'
                      : ''
                  }`}
                  key={index}
                  data-index={index}
                  onClick={() => router.push(`/products/${curElm?._id}`)}
                >
                  {curElm?.measureUnit}
                </p>
              ))
            )}
          </div>
          {/* {isBusiness &&
            (isDataLoading ? (
              <Skeleton height={40} width={110} />
            ) : (
              <div className="flex justify-start gap-3">
                {
                  <div>
                    <form
                      className="custom-input flex h-10 w-[8.5rem] items-center gap-2 border  border-theme"
                      onSubmit={(e) => {
                        e.preventDefault()
                        setIsCustomQuantityClicked(true)
                      }}
                    >
                      <input
                        type="number"
                        // maxLength={4}
                        max={99999}
                        placeholder="Enter Quantity"
                        value={inputValue}
                        onChange={handleInputFieldChange}
                        className="my-2 ml-2 h-6 w-full text-lg text-black focus:outline-none"
                      />
                      <p className="pr-2 text-sm">{productData?.measureType}</p>
                      <button className="h-full bg-theme px-1 text-xs text-white">
                        {isLoading ? <CircularProgress size={16} /> : 'OK'}
                      </button>
                    </form>
                  </div>
                }
              </div>
            ))} */}
        </div>
        <Dialog
          open={!!isCustomQuantityClicked}
          onClose={() => setIsCustomQuantityClicked(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          keepMounted={false}
        >
          <DeliveryAddress
            handleDeliveryAddress={(addressId) => {
              setIsCustomQuantityClicked(false)
              handelBulkOrder(productData?._id, inputValue, addressId as string)
            }}
          />
        </Dialog>

        <div className="flex items-center justify-start gap-4">
          {isDataLoading ? (
            <Skeleton height={40} width={110} />
          ) : (
            <>
              {productData?.isInCart ? (
                <Link legacyBehavior href="/cart">
                  <button className="flex items-center gap-2 rounded-[30px] bg-theme px-6 py-3 text-xs tracking-wider text-white md:text-sm">
                    <ShoppingCart className="!text-sm text-white" />
                    Go To Cart
                  </button>
                </Link>
              ) : (
                <button
                  className="flex items-center gap-2 rounded-[30px] border border-theme bg-white px-4 py-2 text-sm  tracking-wider text-theme"
                  onClick={() => {
                    handleAddToCart(productData?._id, 1)
                  }}
                  disabled={isCartLoading}
                >
                  {isCartLoading ? (
                    <CircularProgress size={16} />
                  ) : (
                    <ShoppingCartOutlined className="!text-sm text-theme" />
                  )}
                  Add To Cart
                </button>
              )}
            </>
          )}
        </div>
        <div className="flex justify-start gap-4">
          {isDataLoading ? (
            <Skeleton height={40} width={110} />
          ) : (
            <>
              {productData?.isInWishList ? (
                <Link legacyBehavior href="/wishlist">
                  <button className="flex items-center gap-2 rounded-[30px] bg-theme px-4 py-2 text-xs tracking-wider text-white md:text-sm">
                    <FavoriteBorder className="!text-sm" />
                    Go To Wishlist
                  </button>
                </Link>
              ) : (
                <button
                  className="flex items-center gap-2 rounded-[30px] border border-theme bg-white px-4 py-2 text-xs tracking-wider text-theme md:text-sm"
                  onClick={() => handelAddToWishlist(productData?._id)}
                  disabled={isWishlistLoading}
                >
                  {isWishlistLoading ? (
                    <CircularProgress size={16} />
                  ) : (
                    <FavoriteBorder className="!text-sm text-theme" />
                  )}
                  Add To Wishlist
                </button>
              )}
            </>
          )}

          {isDataLoading ? (
            <Skeleton height={40} width={110} />
          ) : (
            <button
              className={`discount-card relative overflow-hidden rounded-[30px] bg-theme py-3 px-10 text-xs tracking-wider text-white transition-all duration-300 ease-in-out hover:scale-105 md:text-sm`}
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          )}
        </div>
        <div className="border-b"></div>
        {isDataLoading ? (
          <Skeleton />
        ) : (
          <p>
            Categories:{' '}
            <span className="text-sm text-gray-500">
              {productData?.category?.name}
            </span>{' '}
          </p>
        )}
      </section>
    </article>
  )
}

export default Details
