import { empty_reviews } from 'assets/home'
import ReviewCard from 'components/cart/reviewCard'
import CommonBanner from 'components/CommonBanner'
import Pagination from 'components/core/pagination'
import useSWRAPI from 'hooks/useSWRAPI'
import { PrivateRoute, PublicLayout } from 'layouts'
import MyAccountNavLayout from 'layouts/myAccountNavbar'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import ReviewType from 'types/review'

const Reviews = () => {
  return (
    <PrivateRoute>
      <PublicLayout title="My Reviews | Prizen">
        <CommonBanner title="My Ratings & Reviews" />
        <MyAccountNavLayout>
          <div className="flex h-full flex-col items-center justify-center gap-2 bg-white p-10 text-center">
            <AllReviews />
          </div>
        </MyAccountNavLayout>
      </PublicLayout>
    </PrivateRoute>
  )
}

const AllReviews = () => {
  const [limit, setLimit] = React.useState<number>(12)
  const [chunk, setChunk] = React.useState<number>(0)
  const { data, isValidating, mutate } = useSWRAPI(
    `my-reviews?limit=${limit}&chunk=${chunk}`
  )

  if (isValidating)
    return (
      <>
        {Array(6)
          .fill(0)
          ?.map((_, index) => (
            <div
              key={index}
              className="flex w-full flex-col gap-2 rounded-2xl p-2 shadow-md sm:p-5"
            >
              <div className="flex w-full flex-row items-center gap-2">
                <span className="relative h-full w-16">
                  <Skeleton height={'100%'} width={'100%'} />
                </span>
                <span className="flex flex-col items-start gap-1">
                  <Skeleton height={10} width={80} />
                  <Skeleton
                    count={5}
                    circle
                    height={15}
                    width={15}
                    containerClassName="flex flex-row gap-1"
                  />
                  <Skeleton height={10} width={80} />
                </span>
              </div>
              <div className="flex w-full flex-col items-start">
                <span className="flex w-full flex-col items-start">
                  <h1 className="w-full text-start text-lg font-semibold tracking-wide">
                    <Skeleton height={15} width={'30%'} />
                  </h1>
                  <p className="w-full text-sm text-gray-500">
                    <Skeleton height={10} />
                  </p>
                </span>
                <span className="flex w-full flex-row justify-evenly">
                  <Skeleton circle height={25} width={25} />
                  <Skeleton circle height={25} width={25} />
                </span>
              </div>
            </div>
          ))}
      </>
    )

  if (!data?.data?.data?.data?.length && !chunk)
    return (
      <>
        <img src={empty_reviews.src} alt="reviews" className="w-2/5" />
        <h1 className="mt-4 mb-2 text-lg font-semibold tracking-wide">
          No Reviews & Ratings
        </h1>
        <p className="text-sm text-gray-500">
          You have not rated or reviewed any product yet!
        </p>
      </>
    )
  return (
    <>
      {data?.data?.data?.data.map((review: ReviewType) => (
        <ReviewCard
          review={review}
          reload={() => mutate()}
          key={review?._id}
          isDataFetching={isValidating}
        />
      ))}
      <Pagination
        chunk={chunk}
        setChunk={setChunk}
        isLastChunk={data?.data?.data?.isLastChunk}
        isLoading={isValidating}
      />
    </>
  )
}
export default Reviews
