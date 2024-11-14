import { Grid } from '@mui/material'
import {
  discount_img01,
  discount_img02,
  discount_img03,
  product_1,
  product_2,
  product_3,
} from 'assets/home'
import { DiscountProductCard } from 'components/cards'
import useSWRAPI from 'hooks/useSWRAPI'
import Skeleton from 'react-loading-skeleton'
import BannerType from 'types/banner'

const DemoProductCard = () => {
  const { data, isValidating } = useSWRAPI('banners?limit=3&chunk=0&type=hero')
  if (!isValidating && !data) return null

  return (
    <section className="bg-gray-100 pt-16">
      <div className="main-container flex flex-col items-center text-center">
        <h1 className="mb-4 text-2xl font-bold tracking-wide md:text-4xl">
          What We <span className="text-theme">Offer</span> For You
        </h1>
        <p className="text-sm tracking-wider text-gray-600 md:w-1/2">
          We Connect buyers and Sellers of Natural, Herbal, Environmentally
          sound products. We find the best and makes natural and herbal.
        </p>
      </div>
      <div className="main-container py-16">
        <Grid container spacing={4}>
          {isValidating
            ? Array(3)
                .fill(0)
                .map((_, index) => (
                  <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                    <div className="flex h-[223px] w-full items-center gap-2 rounded-2xl bg-[#e5e5e5]">
                      <div className="w-1/2"></div>
                      <div className="w-1/2 px-4 md:px-8 lg:px-2">
                        <h1 className="text-sm uppercase">
                          <Skeleton height={25} />
                        </h1>
                        <p className="w-full py-4 text-base tracking-wide md:text-lg lg:text-xl">
                          <Skeleton />
                        </p>
                        <div className="flex w-full items-center justify-between">
                          <Skeleton height={25} width={80} />
                        </div>
                      </div>
                    </div>
                  </Grid>
                ))
            : data?.data?.data?.data.map(
                (curElm: BannerType, index: number) => (
                  <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                    <DiscountProductCard curElm={curElm} />
                  </Grid>
                )
              )}
        </Grid>
      </div>
    </section>
  )
}

export default DemoProductCard
