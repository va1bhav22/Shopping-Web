import DeleteIcon from '@mui/icons-material/Delete'
import { LoadingButton } from '@mui/lab'
import { CircularProgress } from '@mui/material'
import { ProductImageNotAvailable } from 'assets'
import { useAuth } from 'hooks'
import useAuthFetch from 'hooks/useAuthFetch'
import Link from 'next/link'
import Swal from 'sweetalert2'
import WishlistType from 'types/wishlist'
import { currencyFormatter } from 'utils'

type Props = {
  wishlistItem: WishlistType
  reload?: () => void
}

const WishlistCard = ({ wishlistItem, reload }: Props) => {
  const { isLoading: isAddToCartLoading, mutate: fetchAddToCart } =
    useAuthFetch()
  const {
    isLoading: isRemoveFromWishlistLoading,
    mutate: fetchRemoveFromWishlist,
  } = useAuthFetch()
  const { getUser } = useAuth()
  const addToCart = async ({
    productId,
    quantity,
  }: {
    productId: string
    quantity: number
  }) => {
    try {
      const fetchData = await fetchAddToCart({
        path: 'cart/add',
        method: 'PUT',
        body: JSON.stringify({
          product: productId,
          quantity,
        }),
      })
      if (fetchData?.error) {
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: fetchData?.error,
        })
      }
      getUser()
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Product added to cart successfully',
      })
      reload && reload()
    } catch (error) {
      console.log({ error })
    }
  }
  const removeFromCart = async ({
    productId,
    quantity,
  }: {
    productId: string
    quantity: number
  }) => {
    try {
      const fetchData = await fetchAddToCart({
        path: `cart/${productId}?idOf=PRODUCT`,
        method: 'DELETE',
      })
      if (fetchData?.error) {
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: fetchData?.error,
        })
      }
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Product removed from cart successfully',
      })
      reload && reload()
    } catch (error) {
      console.log({ error })
    }
  }
  const removeFromWishlist = async (ID: string) => {
    try {
      if (!ID) throw new Error('product malformed product ID not found')

      const fetchData = await fetchRemoveFromWishlist({
        path: `wishlist/${ID}`,
        method: 'DELETE',
      })
      if (fetchData?.error) {
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: fetchData?.error,
        })
      }
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Product removed from wishlist successfully',
      })
      reload && reload()
    } catch (error) {
      console.log({ error })
      const err = error as Error
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      })
    }
  }
  return (
    <section className="flex flex-col items-center rounded bg-white py-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] md:flex-row md:justify-between md:py-0">
      <div className=" flex w-full flex-row-reverse items-center border-gray-200 md:w-4/5  md:flex-row md:border-r">
        <span
          onClick={() => removeFromWishlist(wishlistItem?.product?._id)}
          className="flex h-full items-center  px-4"
          typeof="button"
        >
          {isRemoveFromWishlistLoading ? (
            <CircularProgress color="error" size={20} />
          ) : (
            <DeleteIcon className="cursor-pointer text-red-500" />
          )}
        </span>
        <span className="border-gray-200 py-3 px-6 md:border-x">
          <Link legacyBehavior href="/product-details">
            <img
              src={
                wishlistItem?.product?.displayImage?.url ||
                ProductImageNotAvailable?.src
              }
              alt={wishlistItem?.product?.title}
              className="h-32 w-20 cursor-pointer object-contain"
            />
          </Link>
        </span>
        <span className="flex h-full flex-col justify-center gap-1 pl-4">
          <h1 className="text-lg tracking-wide text-theme">
            {wishlistItem?.product?.title}
          </h1>
          <p className="text-lg tracking-wide text-theme">
            {currencyFormatter(wishlistItem?.product?.salePrice)}
          </p>
          <p className="text-sm tracking-wider text-gray-500">June 8, 2022</p>
        </span>
      </div>
      <div className="w-full pl-4 md:w-1/5">
        <p
          className={`mb-2  ${
            wishlistItem?.product?.stock > 0 ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {wishlistItem?.product?.stock > 0 ? 'In Stock' : 'Out Of Stock'}
        </p>

        {wishlistItem?.product?.isInCart ? (
          <LoadingButton
            variant="contained"
            color="success"
            disabled={isAddToCartLoading}
            loading={isAddToCartLoading}
            className="discount-card relative overflow-hidden rounded bg-theme px-6 py-3 text-sm text-white"
            onClick={() => {
              removeFromCart({
                productId: wishlistItem?.product?._id,
                quantity: wishlistItem?.product?.moq || 1,
              })
            }}
          >
            Remove From Cart
          </LoadingButton>
        ) : (
          <LoadingButton
            variant="contained"
            color="success"
            disabled={isAddToCartLoading}
            loading={isAddToCartLoading}
            className="discount-card relative overflow-hidden rounded bg-theme px-6 py-3 text-sm text-white"
            onClick={() => {
              addToCart({
                productId: wishlistItem?.product?._id,
                quantity: wishlistItem?.product?.moq || 1,
              })
            }}
          >
            Add To Cart
          </LoadingButton>
        )}
      </div>
    </section>
  )
}

export default WishlistCard
