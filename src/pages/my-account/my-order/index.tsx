import { empty_cart } from 'assets/home'
import { OrderHistoryCard } from 'components/cards'
import CommonBanner from 'components/CommonBanner'
import Pagination from 'components/core/pagination'
import useSWRAPI from 'hooks/useSWRAPI'
import { PrivateRoute, PublicLayout } from 'layouts'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import OrderType from 'types/order'

const MyOrder = () => {
  return (
    <PrivateRoute>
      <PublicLayout title="My Order | Prizen">
        <CommonBanner title="My Order" />
        <AllMyOrders />
      </PublicLayout>
    </PrivateRoute>
  )
}

const AllMyOrders = () => {
  const [limit, setLimit] = React.useState<number>(10)
  const [chunk, setChunk] = React.useState<number>(0)
  const { data, isValidating } = useSWRAPI(
    `order/orders/my?limit=${limit}&chunk=${chunk}&status=all`
  )
  if (isValidating)
    return (
      <section className="bg-gray-100 py-20">
        <div className="main-container">
          <div className="flex flex-col gap-4">
            {Array(10)
              .fill(0)
              ?.map((_, index) => (
                <div key={index} className="bg-white px-6">
                  <div className="flex w-full flex-col items-center border-b border-gray-200 py-2 md:flex-row md:justify-between">
                    <div className="flex flex-col items-center gap-6 md:flex-row">
                      <p className="rounded-[30px] px-6 py-3 font-semibold">
                        <Skeleton height={50} width={220} borderRadius={100} />
                      </p>
                      <p className="tracking-wide text-gray-600">
                        <Skeleton height={30} width={120} />
                      </p>
                    </div>
                    <Skeleton height={45} width={120} />
                  </div>
                  <section className="flex w-full flex-col items-center border-b border-gray-200 py-6 md:flex-row md:justify-between">
                    <div className="flex w-full flex-row gap-4">
                      <div className="flex items-center justify-center rounded-md  px-4">
                        <Skeleton width={100} height={110} />
                      </div>
                      <div className="flex flex-col justify-between gap-4 md:gap-0">
                        <div className="flex w-full flex-col">
                          <Skeleton height="1.8rem" />
                          <p className="text-sm tracking-wider text-gray-500">
                            <Skeleton />
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 md:flex-row md:gap-0">
                          <Skeleton
                            count={3}
                            height="1.5rem"
                            width="5rem"
                            containerClassName="flex flex-row gap-2 flex-wrap"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex w-full  items-center justify-between gap-4 text-left md:mt-0 md:items-center md:gap-0">
                      <span>
                        <Skeleton height="1.25" width="6rem" count={2} />
                      </span>
                      <span>
                        <Skeleton height="1.25" width="6rem" count={2} />
                      </span>
                    </div>
                  </section>
                </div>
              ))}
          </div>
        </div>
      </section>
    )
  if (!data?.data?.data?.data?.length)
    return (
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <img
          src={empty_cart.src}
          alt="empty category"
          className="h-auto w-1/2"
        />
        <h1 className="text-black">No Order Placed!</h1>
      </div>
    )
  return (
    <section className="bg-gray-100 py-20">
      <div className="main-container">
        <div className="flex flex-col gap-4">
          {data?.data?.data?.data?.map((myOrder: OrderType) => (
            <OrderHistoryCard myOrder={myOrder} key={myOrder?._id} />
          ))}
          <Pagination
            chunk={chunk}
            setChunk={setChunk}
            isLastChunk={data?.data?.data?.isLastChunk}
            isLoading={isValidating}
          />
        </div>
      </div>
    </section>
  )
}

export default MyOrder
