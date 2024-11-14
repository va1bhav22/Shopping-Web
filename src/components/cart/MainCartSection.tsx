import { empty_cart } from 'assets/home'
import { CartCard } from 'components/cards'
import useSWRAPI from 'hooks/useSWRAPI'
import { useRouter } from 'next/router'
import Skeleton from 'react-loading-skeleton'
import CartItem from 'types/cartItem'
import PriceDetails from './PriceDetails'

const MainCartSection = () => {
  const router = useRouter()
  const handleCheckout = () => {
    router.push('/checkout')
  }

  const { data, isValidating, mutate } = useSWRAPI('cart/all')
  if (isValidating) return <SkeletonSection />
  if (!isValidating && !data?.data?.data?.products?.length)
    return (
      <article className="bg-gray-100">
        <section className="main-container grid place-items-center py-20">
          <img src={empty_cart.src} alt="empty-cart" className="w-2/5" />
          <h1 className="py-4 font-semibold tracking-wider">
            You Haven't Added Anything In Your Shopping Cart
          </h1>
          <button className="discount-card relative overflow-hidden rounded-[30px] bg-theme px-8 py-3 text-white">
            Shop Now
          </button>
        </section>
      </article>
    )
  return (
    <section className="main-container flex flex-col gap-10 py-20 md:flex-row md:justify-between">
      <div className="relative h-full w-full bg-white md:w-3/5">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-3 text-2xl font-bold">
          <h1>My Cart {`(${data?.data?.data?.totalItem})`}</h1>
        </div>
        <div className="">
          {data?.data?.data?.products.map((cartItem: CartItem) => (
            <CartCard
              key={cartItem?._id}
              cartItem={cartItem}
              reload={() => mutate()}
            />
          ))}
        </div>

        <div className="sticky bottom-0 z-10 hidden justify-end border-t border-gray-300 bg-white py-4 px-6 md:flex">
          <button
            className="discount-card relative overflow-hidden rounded bg-theme px-4 py-2 tracking-wide text-white"
            onClick={handleCheckout}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
      <div className="h-full w-full md:w-2/5">
        <PriceDetails
          items={data?.data?.data?.totalItem}
          discount={data?.data?.data?.discount}
          totalAmount={data?.data?.data?.subTotal}
          totalMRP={data?.data?.data?.mrp}
        />
      </div>
      <div className="flex justify-center md:hidden">
        <button
          className="discount-card relative overflow-hidden rounded bg-theme px-4 py-2 tracking-wide text-white"
          onClick={handleCheckout}
        >
          PROCEED TO CHECKOUT
        </button>
      </div>
    </section>
  )
}
const SkeletonSection = () => {
  return (
    <section className="main-container flex flex-col gap-10 py-20 md:flex-row md:justify-between">
      <div className="relative h-full w-full bg-white md:w-3/5">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-3 text-2xl font-bold">
          <h1>
            <Skeleton height={30} width={250} />
          </h1>
        </div>
        <div className="">
          {Array(6)
            .fill(0)
            ?.map((_, index) => (
              <div
                key={index}
                className="flex w-full flex-col gap-10 border-b border-gray-200 p-6 lg:flex-row"
              >
                <div className="flex w-full flex-col items-center gap-4">
                  <Skeleton width={110} height={140} />
                  <Skeleton height={30} width={160} />
                </div>
                <div className="flex w-full flex-col items-center text-center lg:flex-row lg:items-start lg:justify-between lg:text-left">
                  <div className="flex w-full flex-col items-center text-center lg:items-start lg:text-left">
                    <Skeleton count={2} height={25} width={80} />
                    <div className="flex items-center gap-4 py-4">
                      <p className="relative text-sm tracking-wider text-gray-500  ">
                        <Skeleton height={20} width={55} />
                      </p>
                      <p className="text-lg font-semibold tracking-wider">
                        <Skeleton height={20} width={55} />
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <Skeleton height={25} width={60} />
                      <Skeleton height={25} width={60} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="sticky bottom-0 z-10 hidden justify-end border-t border-gray-300 bg-white py-4 px-6 md:flex">
          <Skeleton height={50} width={250} />
        </div>
      </div>
      <div className="h-full w-full md:w-2/5">
        <div className="w-full">
          <div className="bg-white">
            <h1 className="border-b border-gray-200 p-6 text-xl font-bold tracking-wide text-gray-500">
              <Skeleton height={30} width={140} />
            </h1>
            <div className="flex flex-col gap-4 border-b border-dashed border-gray-200 p-6">
              <div className="flex items-center justify-between text-gray-500">
                <p>
                  <Skeleton height={25} width={80} />
                </p>
                <p>
                  <Skeleton height={25} width={80} />
                </p>
              </div>
              <div className="flex items-center justify-between text-theme ">
                <p>
                  <Skeleton height={25} width={80} />
                </p>
                <p>
                  <Skeleton height={25} width={80} />
                </p>
              </div>
              <Skeleton height={25} width={80} />
            </div>
            <div className="flex items-center justify-between border-b border-dashed border-gray-200 p-6 text-lg">
              <p>
                <Skeleton height={25} width={80} />
              </p>
              <p>
                <Skeleton height={25} width={80} />
              </p>
            </div>

            {/* <p className="p-6 text-sm font-bold tracking-wider text-theme">
          You will save ₹{0} on this order
        </p> */}
          </div>
          <div className="my-4 flex items-center gap-2 text-gray-500">
            <p className="w-full text-sm tracking-wider">
              <Skeleton height={20} count={3} />
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center md:hidden">
        <button className="discount-card relative overflow-hidden rounded bg-theme px-4 py-2 tracking-wide text-white">
          <Skeleton height={50} width={250} />
        </button>
      </div>
    </section>
  )
}

export default MainCartSection
