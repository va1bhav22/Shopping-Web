import { empty_wishlist } from 'assets/home'
import { WishlistCard } from 'components/cards'
import CommonBanner from 'components/CommonBanner'
import Pagination from 'components/core/pagination'
import useSWRAPI from 'hooks/useSWRAPI'
import { PrivateRoute, PublicLayout } from 'layouts'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import WishlistType from 'types/wishlist'

const wishlist = () => {
  return (
    <PrivateRoute>
      <PublicLayout title="WishList | Prizen">
        <CommonBanner title="My WishList" />
        <div className="bg-gray-100 py-20">
          <div className="main-container flex flex-col gap-2">
            <AllWishlists />
          </div>
        </div>
      </PublicLayout>
    </PrivateRoute>
  )
}

const AllWishlists = () => {
  const [limit, setLimit] = React.useState<number>(10)
  const [chunk, setChunk] = React.useState<number>(0)
  const { data, isValidating, mutate } = useSWRAPI(
    `wishlists?resData=optimized&limit=${limit}&chunk=${chunk}`
  )

  if (!isValidating && !data?.data?.data?.data?.length)
    return (
      <section className="grid place-items-center py-20">
        <img src={empty_wishlist.src} alt="empty-cart" className="w-2/5" />
        <h1 className="py-4 font-semibold tracking-wider">
          You Haven't Added Anything In Your Wishlist
        </h1>
        <button className="discount-card relative overflow-hidden rounded-[30px] bg-theme px-8 py-3 text-white">
          Shop Now
        </button>
      </section>
    )
  if (isValidating) {
    return (
      <section className="bg-gray-100 py-20">
        <div className="main-container">
          <div className="flex flex-col gap-4">
            {Array(12)
              .fill(0)
              ?.map((_, index) => (
                <section
                  key={index}
                  className="flex flex-col items-center rounded bg-white py-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] md:flex-row md:justify-between md:py-0"
                >
                  <div className=" flex w-full flex-row-reverse items-center border-gray-200 md:w-4/5  md:flex-row md:border-r">
                    <span
                      className="flex h-full items-center  px-4"
                      typeof="button"
                    >
                      <Skeleton height={20} width={20} />
                    </span>
                    <span className="border-gray-200 py-3 px-6 md:border-x">
                      <Skeleton height={100} width={100} />
                    </span>
                    <span className="flex h-full min-w-[50%] flex-col justify-center gap-1 pl-4">
                      <h1 className="text-lg tracking-wide text-theme">
                        <Skeleton />
                      </h1>
                      <p className="text-lg tracking-wide text-theme">
                        <Skeleton count={2} />
                      </p>
                    </span>
                  </div>
                  <div className="w-full p-4 md:w-1/5">
                    <p className={`mb-2  `}>
                      <Skeleton width={'80%'} />
                    </p>

                    <Skeleton height={25} />
                  </div>
                </section>
              ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-gray-100 py-20">
      <div className="main-container">
        <div className="flex flex-col gap-4">
          {data?.data?.data?.data?.map((wishlist: WishlistType) => (
            <WishlistCard
              wishlistItem={wishlist}
              key={wishlist._id}
              reload={() => {
                setChunk((prev: number) => 0)
                mutate()
              }}
            />
          ))}
          <Pagination
            chunk={chunk}
            isLoading={isValidating}
            setChunk={setChunk}
            isLastChunk={data?.data?.data?.isLastChunk}
          />
        </div>
      </div>
    </section>
  )
}

export default wishlist
