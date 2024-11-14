import { authFetchServer } from 'api/authFetch'
import {
  DescriptionReview,
  Details,
  RelatedProduct,
} from 'components/product-details'
import OtherSellers from 'components/product-details/OtherSellers'
import { useAuth } from 'hooks'
import useSWRAPI from 'hooks/useSWRAPI'
import { PublicLayout } from 'layouts'
import { useRouter } from 'next/router'
import ProductType from 'types/product'

const ProductDetails = ({ product }: { product: ProductType }) => {
  const { query } = useRouter()
  // console.log(query)
  const { user } = useAuth()
  // const { data, isLoading, mutate } = useAuthFetch()
  // const productData: ProductType = data || product
  // useEffect(() => {
  //   if (user) {
  //     if (!data) {
  //       mutate({
  //         path: `product/${query?.productId}/info?${
  //           user?._id && `userId=${user?._id}`
  //         }`,
  //       })
  //     }
  //   }
  // }, [productData])
  const { data, isValidating, mutate } = useSWRAPI(
    `product/${query?.productId}/info?${user?._id && `userId=${user?._id} `}`
  )
  const productData: ProductType = data?.data?.data
  console.log('productData====>', productData)
  const {
    data: similar,
    isValidating: similarisValidating,
    mutate: similarmutate,
  } = useSWRAPI(`product/${query?.productId}/info`)
  const similarData: ProductType = similar?.data?.data?.similar
  // console.log('similarData====>', similarData)

  // if (isLoading && !data)
  //   return (
  //     <PublicLayout>
  //       <CommonBanner title="Shop" />
  //       <div>Loading...</div>
  //     </PublicLayout>
  //   )
  return (
    <PublicLayout title="Product Details | Prizen">
      <Details
        isDataLoading={isValidating}
        productData={productData}
        reload={() => mutate()}
      />
      <DescriptionReview
        description={productData?.description}
        productId={productData?._id}
        isLoading={isValidating}
      />
      <OtherSellers
        similarData={similarData}
        similarisValidating={isValidating}
      />
      <RelatedProduct categoryId={productData?.category?._id} />
    </PublicLayout>
  )
}

// export const getStaticPaths = async () => {
//   const products = await authFetchServer({
//     path: '/products/ids',
//   })
//   const paths = products?.data?.map((productId: string) => ({
//     params: {
//       productId,
//     },
//   }))
//   return {
//     paths,
//     fallback: false,
//   }
// }

// export const getStaticProps = async ({ params }: any) => {
//   const product = await authFetchServer({
//     path: `/product/${params.productId}/info`,
//   })
//   return {
//     props: {
//       product: product?.data,
//     },
//     revalidate: 60,
//   }
// }

export default ProductDetails
