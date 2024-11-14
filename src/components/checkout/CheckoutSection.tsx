import { empty_order_item } from 'assets/home'
import { PriceDetails } from 'components/cart'
import useSWRAPI from 'hooks/useSWRAPI'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import CheckoutType from 'types/checkout'
import Account from './Account'
import DeliveryAddress from './DeliveryAddress'
import OrderSummary from './OrderSummary'
import PaymentSection from './PaymentSection'
import Swal from 'sweetalert2'

const CheckoutSection = () => {
  const { query, replace, push } = useRouter()

  const { data, isValidating, mutate, error } = useSWRAPI(
    `orders/summary?${
      query.type?.toString()?.toUpperCase() === 'PRODUCT'
        ? `type=PRODUCT`
        : 'type=CART'
    }${query?.productId ? `&productId=${query?.productId}` : ''}${
      query?.quantity ? `&quantity=${query?.quantity}` : ''
    }${query?.couponId ? `&couponId=${query?.couponId}` : ''}`,
    {
      revalidateOnFocus: false,
    }
  )
  console.log('query=====>', data)
  const [isDeliveryCollapse, setIsDeliveryCollapse] = useState(false)

  const handleDeliveryAddress = () => {
    setIsDeliveryCollapse(true)
  }

  const [CartData, setCartData] = useState<CheckoutType>({
    discount: 0,
    totalMrp: 0,
    products: [],
    totalSalePrice: 0,
  })
  useEffect(() => {
    setCartData(data?.data?.data)
  }, [data])
  if (isValidating) return <SkeletonSection />
  if (data?.data?.error) {
    Swal.fire({
      icon: 'error',
      title: data?.data?.error,
      text: 'You have already used the given coupon!',
    })
    push(
      `/checkout?${
        query.type?.toString()?.toUpperCase() === 'PRODUCT'
          ? `type=PRODUCT`
          : 'type=CART'
      }${query?.productId ? `&productId=${query?.productId}` : ''}${
        query?.quantity ? `&quantity=${query?.quantity}` : ''
      }
`
    )
  }
  if (!CartData)
    return (
      <section className="main-container grid place-items-center">
        <img src={empty_order_item.src} alt="empty-cart" className="w-2/5" />
        <h1 className="py-4 text-sm font-semibold tracking-wider text-red-500">
          All Products Are Removed
        </h1>
        <Link legacyBehavior href="/cart">
          <button className="discount-card relative overflow-hidden rounded-[30px] bg-theme px-8 py-3 text-sm text-white">
            Go To Cart Page
          </button>
        </Link>
      </section>
    )

  return (
    <section className="bg-gray-100 py-16" id="gst-billing">
      <section className="main-container flex flex-col-reverse gap-10 md:flex-row md:justify-between">
        <div className="flex w-full flex-col gap-6 md:w-3/5">
          <div className="bg-white px-8 py-4">
            <Account />
          </div>
          {query.productType === 'VIRTUAL' || (
            <div className="">
              <DeliveryAddress
                handleDeliveryAddress={handleDeliveryAddress}
                isDeliveryCollapse={isDeliveryCollapse}
                setIsDeliveryCollapse={setIsDeliveryCollapse}
              />
            </div>
          )}
          <div className="bg-white  px-8 py-4">
            <OrderSummary products={CartData?.products} reload={mutate} />
          </div>
          <div className="bg-white px-8 py-4">
            <PaymentSection />
          </div>
        </div>
        <div className="h-full w-full md:w-2/5">
          <PriceDetails
            discount={CartData?.discount}
            items={CartData?.products?.length}
            totalAmount={CartData?.totalSalePrice}
            totalMRP={CartData?.totalMrp}
            deliveryCharge={CartData?.deliveryCharge}
            ActiveCouponData={CartData?.couponInfo}
          />
        </div>
      </section>
    </section>
  )
}

const SkeletonSection = () => {
  return (
    <section className="bg-gray-100 py-16" id="gst-billing">
      <section className="main-container flex flex-col-reverse gap-10 md:flex-row md:justify-between">
        <div className="flex w-full flex-col gap-6 md:w-3/5">
          <div className="bg-white px-8 py-4">
            <Skeleton height={40} />
          </div>
          <div className="bg-white  px-8 py-4">
            <Skeleton height={200} />
          </div>

          <div className="bg-white  px-8 py-4">
            <Skeleton height={40} />
          </div>
          <div className="bg-white px-8 py-4">
            <Skeleton height={40} />
          </div>
        </div>
        <div className="h-full w-full md:w-2/5">
          <div className="w-full">
            <div className="bg-white">
              <h1 className="border-b border-gray-200 p-6 text-xl font-bold tracking-wide text-gray-500">
                <Skeleton height={30} width={'50%'} />
              </h1>
              <div className="flex flex-col gap-4 border-b border-dashed border-gray-200 p-6">
                <div className="flex w-full items-center justify-between text-gray-500">
                  <p>
                    <Skeleton width={80} height={20} />
                  </p>
                  <p>
                    <Skeleton width={80} height={20} />
                  </p>
                </div>
                <div className="flex items-center justify-between text-theme ">
                  <p>
                    <Skeleton width={80} height={20} />
                  </p>
                  <p>
                    <Skeleton width={80} height={20} />
                  </p>
                </div>
                <div className="flex items-center justify-between text-gray-500">
                  <p>
                    <Skeleton width={80} height={20} />
                  </p>
                  <p>
                    <Skeleton width={80} height={20} />
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between border-b border-dashed border-gray-200 p-6 text-lg">
                <p>
                  <Skeleton width={80} height={20} />
                </p>
                <p>
                  <Skeleton width={80} height={20} />
                </p>
              </div>
            </div>
            <div className="my-4 flex items-center gap-2 bg-white p-2">
              <p className="w-full text-sm tracking-wider">
                <Skeleton count={3} height={16} />
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default CheckoutSection
