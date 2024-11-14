import { SpecialProductCard } from 'components/cards'
import React from 'react'
import { Grid } from '@mui/material'
import ProductType from 'types/product'
import { empty_notification } from 'assets/home'
import SkeletonCard from 'components/cards/SkeletonCart'
const OtherSellers = ({ similarData, similarisValidating }: any) => {
  console.log('similarData =====>', similarData)

  if (similarisValidating)
    return (
      <section className="main-container">
        <h1 className="text-center text-2xl font-bold tracking-wide md:text-left md:text-4xl">
          Other Sellers
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
    <div>
      <section className="main-container">
        <h1 className="text-center text-2xl font-bold tracking-wide md:text-left md:text-4xl">
          Other Sellers
        </h1>

        <div>
          <p className="flex w-full justify-center md:justify-start">
            <span className="mt-2 w-20 rounded-3xl border-b-4 border-theme"></span>
          </p>
          <div className="w-full py-8 md:py-16">
            <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
              {similarData?.map((curElm: ProductType) => (
                <Grid item xs={6} sm={4} md={3} lg={2.4} key={curElm?._id}>
                  <SpecialProductCard curElm={curElm} relatedProduct={true} />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </section>
    </div>
  )
}

export default OtherSellers
