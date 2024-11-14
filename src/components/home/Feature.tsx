import { Grid } from '@mui/material'
import { MainProductCard } from 'components/cards'
import SkeletonCard from 'components/cards/SkeletonCart'
import { useAuth } from 'hooks'
import useSWRAPI from 'hooks/useSWRAPI'
import Link from 'next/link'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import ProductType from 'types/product'

const Feature = () => {
  const [activeCategory, setActiveCategory] = React.useState<string>('')
  const { data, isValidating } = useSWRAPI('categories/featured')

  return (
    <section className="">
      <section className="main-container py-8 md:py-20">
        <div>
          <h1 className="text-center text-2xl font-bold tracking-wide md:text-4xl">
            Our <span className="px-2 text-theme">Popular</span> Products
          </h1>
          <p className="pt-4 text-center text-sm tracking-wider text-gray-500">
            We sell 100% genuine products and accessories.
          </p>
        </div>
        {isValidating && !data ? (
          <div className="flex w-full flex-wrap justify-center gap-6 pt-8 md:pt-12">
            {Array(5)
              ?.fill(0)
              ?.map((_, index: number) => (
                <div
                  className={`relative cursor-pointer py-4 text-center  `}
                  key={index}
                  data-index={index}
                >
                  <Skeleton width={'6rem'} />
                </div>
              ))}
          </div>
        ) : (
          <div className="flex w-full flex-wrap justify-center gap-6 pt-8 md:pt-12">
            {data?.data?.data?.map((curElm: any, index: number) => (
              <div
                className={`relative cursor-pointer py-4 text-center ${
                  curElm?._id === activeCategory
                    ? 'active-index text-theme'
                    : 'hover-effect'
                } ${
                  index === 0 && !activeCategory && 'active-index text-theme'
                } `}
                key={index}
                data-index={index}
                onClick={() => setActiveCategory(curElm?._id)}
              >
                {curElm?.name}
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="w-full pt-8 pb-8 md:pt-12 md:pb-20">
        {/* <div
        className="h-auto w-full bg-[length:725px_450px] bg-left-bottom bg-no-repeat pt-12 pb-20"
        style={{ backgroundImage: `url(${product_bg.src})` }}
      > */}
        <div className="main-container">
          {data?.data?.data[0]?._id && (
            <DisplayCategoryProducts
              categoryId={activeCategory || data?.data?.data[0]?._id}
            />
          )}
          <div className="mt-10 flex w-full justify-center">
            <Link legacyBehavior href="/products">
              <button className="discount-card relative overflow-hidden rounded-[30px] bg-theme px-8 py-4 text-sm text-white">
                View All Products
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

const DisplayCategoryProducts = ({ categoryId }: { categoryId: string }) => {
  const { user } = useAuth()
  const { data, isValidating, mutate } = useSWRAPI(
    `category/${categoryId}/products?limit=10&chunk=0&${
      user?._id && `userId=${user._id}`
    }`
  )
  if (isValidating)
    return (
      <Grid
        container
        spacing={{ xs: 1, sm: 2, lg: 2.5 }}
        justifyContent="center"
      >
        {Array(12)
          .fill(0)
          ?.map((_, index) => (
            <Grid item xs={6} sm={4} md={3} lg={2.4} key={index}>
              <SkeletonCard />
            </Grid>
          ))}
      </Grid>
    )
  if (!isValidating && !data) return <h1>No Data</h1>
  return (
    <Grid container spacing={{ xs: 1, sm: 2, lg: 2.5 }} justifyContent="center">
      {data?.data?.data?.data?.map((product: ProductType) => (
        <Grid item xs={6} sm={4} md={3} lg={2.4} key={product._id}>
          <MainProductCard
            product={product}
            isDataUpdating={isValidating}
            reload={mutate}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default Feature
