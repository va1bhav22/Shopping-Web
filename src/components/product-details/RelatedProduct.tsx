import { Grid } from '@mui/material'
import { SpecialProductCard } from 'components/cards'
import SkeletonCard from 'components/cards/SkeletonCart'
import { useAuth } from 'hooks'
import useSWRAPI from 'hooks/useSWRAPI'
import ProductType from 'types/product'

const RelatedProduct = ({ categoryId }: { categoryId: string }) => {
  const { user } = useAuth()
  const { data, isValidating, mutate } = useSWRAPI(
    categoryId
      ? `category/${categoryId}/products?type=B2C&limit=8&chunk=0&${
          user?._id && `userId=${user?._id}`
        }`
      : null,
    {
      revalidateOnFocus: false,
    }
  )
  // console.log('releted====>', data?.data?.data?.data)

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
  if (!data?.data?.data?.data?.length) return null
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
          {data?.data?.data?.data?.map((curElm: ProductType) => (
            <Grid item xs={6} sm={4} md={3} lg={2.4} key={curElm?._id}>
              <SpecialProductCard curElm={curElm} relatedProduct={true} />
            </Grid>
          ))}
        </Grid>
      </div>
    </section>
  )
}

export default RelatedProduct
