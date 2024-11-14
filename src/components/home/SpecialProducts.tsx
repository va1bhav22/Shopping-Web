import { Grid } from '@mui/material'
import { SpecialProductCard } from 'components/cards'
import SkeletonCard from 'components/cards/SkeletonCart'
import useSWRAPI from 'hooks/useSWRAPI'
import Link from 'next/link'
import ProductType from 'types/product'

const SpecialProducts = () => {
  const { data, isValidating } = useSWRAPI('products/featured?limit=12&chunk=0')
  const { data: bannerData, isValidating: bannerLoading } = useSWRAPI(
    'banners?limit=1&chunk=0&type=bottom'
  )
  if (isValidating && !data && bannerLoading && !bannerData)
    return <h1>Loading...</h1>
  if (!data) return <h1>No data</h1>
  return (
    <section className="bg-theme_gray py-8 md:py-20">
      <section className="main-container">
        <div>
          <h1 className="text-center text-2xl font-bold tracking-wide md:text-4xl">
            Our <span className="px-2 text-theme"> Special </span> Products
          </h1>
          <p className="pt-4 text-center text-sm capitalize tracking-wider text-gray-500">
            Never miss any opportunity. Grab The Deal Now!
          </p>
        </div>

        <div className="w-full py-10 md:py-16">
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            {isValidating
              ? Array(12)
                  .fill(0)
                  ?.map((_, index) => (
                    <Grid item xs={6} sm={4} md={3} lg={2.4} key={index}>
                      <SkeletonCard />
                    </Grid>
                  ))
              : data?.data?.data?.data?.map(
                  (curElm: ProductType, index: number) => (
                    <Grid item xs={6} sm={4} md={3} lg={2.4} key={index}>
                      <SpecialProductCard
                        curElm={curElm}
                        relatedProduct={index}
                      />
                    </Grid>
                  )
                )}
          </Grid>
        </div>
        <div className="flex w-full justify-center">
          <Link legacyBehavior href="/products">
            <button className="discount-card relative overflow-hidden rounded-[30px] bg-theme px-8 py-4 text-sm text-white">
              View All Products
            </button>
          </Link>
        </div>
      </section>
    </section>
  )
}

export default SpecialProducts
