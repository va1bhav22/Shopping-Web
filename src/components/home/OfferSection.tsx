import { Grid } from '@mui/material'
import useSWRAPI from 'hooks/useSWRAPI'
import moment from 'moment'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import Slider from 'react-slick'
import OfferCardType from 'types/offer'

const OfferSection = () => {
  const { data, isValidating, mutate } = useSWRAPI(
    `coupons/active?type=VOUCHER`,
    {
      revalidateOnFocus: true,
    }
  )
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    cssEase: 'linear',
    pauseOnHover: false,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 940,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  if (isValidating)
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-white p-10 text-center">
        {Array(10)
          .fill(0)
          ?.map((_, index) => (
            <div
              key={index}
              className="flex w-full flex-col items-start gap-4 rounded-md"
            >
              <Skeleton height={15} width={300} />
            </div>
          ))}
      </div>
    )
  if (!data?.data?.data?.length) return null
  if (data?.data?.data?.length <= 3)
    return (
      <article className="bg-gray-100 py-8 md:py-16">
        <section className="main-container flex flex-col items-center gap-8 md:gap-16">
          <h1 className="text-center text-2xl font-bold tracking-wide md:text-4xl">
            Our <span className="text-theme">Offers</span>
          </h1>
          <Grid container spacing={4} justifyContent={'center'}>
            {data?.data?.data?.map((offer: OfferCardType) => (
              <Grid item xs={12} sm={6} md={4} key={offer?._id}>
                <OfferCard offer={offer} />
              </Grid>
            ))}
          </Grid>
        </section>
      </article>
    )
  return (
    <article className="bg-gray-100 py-8 md:py-16">
      <section className="main-container flex flex-col items-center gap-8 md:gap-16">
        <h1 className="text-center text-2xl font-bold tracking-wide md:text-4xl">
          Our <span className="text-theme">Offers</span>
        </h1>
        <section className="company-slick-slider w-full">
          <Slider {...settings} className="">
            {data?.data?.data?.map((offer: OfferCardType) => (
              <div
                className="mx-auto !flex w-full items-center px-0 md:px-2 lg:px-4"
                key={offer._id}
              >
                <OfferCard offer={offer} />
              </div>
            ))}
          </Slider>
        </section>
      </section>
    </article>
  )
}
const OfferCard = ({ offer }: { offer: OfferCardType }) => {
  const endDate = moment(offer?.endDate)
  return (
    <article className="flex items-center justify-between gap-2 overflow-hidden rounded-md bg-[#FFF3EF] p-4 px-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] lg:gap-3">
      <aside className="w-2/5">
        <img src="/offer_icon.png" alt="offer" className="w-4/5" />
      </aside>
      <aside className="text-slate800 flex w-3/5 flex-col gap-3">
        <h1 className="text-xl font-semibold tracking-wide">{offer?.title}</h1>
        <p className="font-medium tracking-wide">
          Purchase above ₹{offer?.minOrderAmount} to get ₹{offer?.discount}{' '}
          voucher.
        </p>
        <p className="text-sm font-semibold">
          Expiry Date:{' '}
          <span className="font-normal"> {endDate?.format('ll')}.</span>
        </p>
      </aside>
    </article>
  )
}

export default OfferSection
