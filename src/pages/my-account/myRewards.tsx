import { Grid } from '@mui/material'
import { empty_notification } from 'assets/home'
import CommonBanner from 'components/CommonBanner'
import SkeletonCard from 'components/cards/SkeletonCart'
import useAuthFetch from 'hooks/useAuthFetch'
import useSWRAPI from 'hooks/useSWRAPI'
import { PrivateRoute, PublicLayout } from 'layouts'
import MyAccountNavLayout from 'layouts/myAccountNavbar'
import { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'

const myRewards = () => {
  return (
    <PrivateRoute>
      <PublicLayout title="My Rewards | Prizen">
        <CommonBanner title="My Rewards" />
        <MyAccountNavLayout>
          <MyRewardWrapper />
        </MyAccountNavLayout>
      </PublicLayout>
    </PrivateRoute>
  )
}

const MyRewardWrapper = () => {
  const { data, isValidating, mutate } = useSWRAPI('sale-coupon-get-by-user')

  const CoupenData = data?.data?.data
  console.log('CoupenData===>', CoupenData)
  if (!data?.data?.data?.data) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-5 bg-white p-10 text-center">
        <img src={empty_notification.src} alt="notifications" />
        <h1 className="mt-4 mb-2 text-lg font-semibold tracking-wide">
          All caught up!
        </h1>
        <p className="text-sm text-slate-800">
          There are no Scratch Card for you.
        </p>
      </div>
    )
  }
  if (isValidating)
    return (
      <section className="main-container">
        <h1 className="text-center text-2xl font-bold tracking-wide md:text-left md:text-4xl">
          Related products
        </h1>
        <p className="flex w-full justify-center md:justify-start">
          <span className="mt-2 w-20 rounded-3xl border-b-4 border-theme"></span>
        </p>

        <div className="w-full py-8 md:py-16">
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            {Array(8)
              .fill(0)
              ?.map((_, index) => (
                <Grid item xs={6} sm={4} md={3} lg={2.4} key={index}>
                  <SkeletonCard />
                </Grid>
              ))}
          </Grid>
        </div>
      </section>
    )

  return (
    <div className=" flex h-full w-full flex-wrap items-center justify-center gap-3  bg-white p-5  md:items-start md:justify-start">
      {CoupenData?.map((item: any) => {
        console.log(item)

        return (
          <>
            <SingleCoupon
              key={item._id}
              data={item}
              isValidating={isValidating}
            />
          </>
        )
      })}
    </div>
  )
}

function SingleCoupon({ data, isValidating }: any) {
  const [isAnimation, setIsAnimation] = useState(false)
  const couponAvailable = data?.couponAvailable
  const [click, setClick] = useState(false)
  const { isLoading, mutate } = useAuthFetch()
  // const createdAt = new Date(data?.flashSaleCouponRefId?.createdAt)
  // const validTill = new Date(data?.flashSaleCouponRefId?.validTill)
  // console.log(click)

  useEffect(() => {
    const isCouponOpen = localStorage.getItem(`coupon_${data._id}`)
    if (isCouponOpen === 'true') {
      setIsAnimation(true)
    }

    if (click && couponAvailable) {
      ;(async () => {
        const resData = await mutate({
          path: 'add-money',

          method: 'POST',

          body: JSON.stringify({
            couponId: data.flashSaleCouponRefId._id,
          }),
        })
        // console.log('API Response:', resData)
      })()
    }
    setClick(false)
  }, [click, couponAvailable])

  const handleCouponClick = async () => {
    if (couponAvailable) {
      // console.log('click')
      setIsAnimation(true)
      setClick(true)
      localStorage.setItem(`coupon_${data._id}`, 'true')
    }
  }
  // console.log(click, 'isclick==>')
  // console.log(couponAvailable, 'couponAvailable==>')

  // const calculateRemainingTime = () => {
  //   const now = new Date()
  //   const diffInMs = validTill.getTime() - now.getTime()
  //   const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  //   const hours = Math.floor(
  //     (diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  //   )
  //   const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60))

  //   return { days, hours, minutes }
  // }
  // const remainingTime = calculateRemainingTime()

  return (
    <>
      <section className="scratch-card min-w-max-[10rem] flex flex-col flex-wrap items-center justify-center  rounded-md border border-theme p-4 text-center md:w-[39%] lg:w-[30%]">
        <h1 className="text-lg font-medium text-slate-800">
          <span className="font-semibold text-theme">Congrats 🎉!</span> You
          have won a scratch card.
        </h1>
        <aside
          className={`relative my-4 h-10 w-[10rem] cursor-pointer overflow-hidden rounded-md border border-theme_light ${
            couponAvailable ? 'cursor-pointer' : 'cursor-not-allowed'
          }`}
          onClick={handleCouponClick}
        >
          <p
            className={`z-1 grid h-full w-full  place-items-center text-center font-semibold uppercase text-theme ${
              data?.flashSaleCouponRefId?.couponPrice ===
              'BETTER_LUCK_NEXT_TIME'
                ? 'text-sm'
                : 'text-xl'
            }`}
          >
            {data?.flashSaleCouponRefId?.couponPrice === 'BETTER_LUCK_NEXT_TIME'
              ? 'Better Luck Next Time'
              : `₹ ${data?.flashSaleCouponRefId?.couponPrice}`}
          </p>

          <div
            className={`z-5 absolute  top-0 h-10 w-1/4 bg-theme_light transition-all duration-[400ms] ease-in ${
              isAnimation ? '-left-1/4 opacity-50' : 'left-0 opacity-100'
            }`}
          ></div>
          <div
            className={`z-5 absolute left-1/4 h-10 w-1/4 bg-theme_light transition-all duration-[500ms] ease-in-out ${
              isAnimation ? 'top-full opacity-40' : 'top-0 opacity-100'
            }`}
          ></div>
          <div
            className={`z-5 absolute right-1/4 h-10 w-1/4 bg-theme_light transition-all duration-[500ms] ease-in-out ${
              isAnimation ? 'bottom-full opacity-40' : 'bottom-0 opacity-100'
            }`}
          ></div>
          <div
            className={`z-5 absolute top-0 h-10 w-1/4 bg-theme_light transition-all duration-[400ms] ease-out ${
              isAnimation ? '-right-1/4 opacity-50' : 'right-0 opacity-100'
            }`}
          ></div>
        </aside>
        <p className="text-slate-800">
          <span className="text-theme">Note: </span>Click the above card
        </p>
        {/* <p className="text-slate-800">
          {!couponAvailable && validTill > new Date() && (
            <span className="text-theme">
              Open in {remainingTime.days} d, {remainingTime.hours} hrs,
              {remainingTime.minutes} m
            </span>
          )}
        </p> */}
      </section>
    </>
  )
}

export default myRewards
