import { Star, StarBorder } from '@mui/icons-material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MenuIcon from '@mui/icons-material/Menu'
import { Grid } from '@mui/material'
import { ProductImageNotAvailable } from 'assets'
import { empty_cart } from 'assets/home'
import SkeletonCard from 'components/cards/SkeletonCart'
import useSWRAPI from 'hooks/useSWRAPI'
import Link from 'next/link'
import { Fragment } from 'react'
import CategoryType from 'types/category'
import ProductType from 'types/product'
import { getDaysFromSeconds, getDiscountValue } from 'utils'

const CategoryList = () => {
  const { data, isValidating } = useSWRAPI('categories')
  if (isValidating && !data) return <div>Loading...</div>
  if (!data) return null
  return (
    <div className="group relative flex cursor-pointer items-center gap-4 bg-theme_light p-4 text-sm">
      <MenuIcon className="!text-sm" />
      <p>All Category</p>
      <ExpandMoreIcon className="!text-sm" />
      <div className="absolute left-0 top-full z-10 hidden w-full flex-col bg-white group-hover:flex">
        <div className="relative">
          {data?.data?.data?.data.map((curElm: CategoryType) => (
            <div
              className="cat-hover flex cursor-pointer items-center justify-between border-b border-theme  text-sm text-black shadow transition-all duration-300 ease-in-out hover:bg-theme hover:text-white"
              key={curElm._id}
            >
              <Link legacyBehavior href={`/products?id=${curElm._id}`}>
                <a className="flex w-full flex-row items-center justify-between  py-4 px-4">
                  <p>{curElm.name}</p>
                  <ChevronRightIcon className="text-sm" />
                </a>
              </Link>
              <div className="cat-hover-div absolute left-full top-0 z-10 hidden h-[calc(100vh-68px)] w-[1019px] cursor-default overflow-hidden overflow-y-scroll bg-white p-6 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
                <Grid container spacing={3}>
                  <CategoryProducts categoryId={curElm?._id} />
                </Grid>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const CategoryProducts = ({ categoryId }: { categoryId: string }) => {
  const { data, isValidating } = useSWRAPI(`category/${categoryId}/products`)
  if (!isValidating && !data?.data?.data?.data?.length)
    return (
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <img
          src={empty_cart.src}
          alt="empty category"
          className="h-auto w-1/2"
        />
        <h1 className="text-black">Category Product Not Available</h1>
      </div>
    )
  return (
    <>
      {isValidating
        ? Array(8)
            .fill(0)
            ?.map((_, index) => (
              <Grid item xs={12} sm={6} lg={3} key={index}>
                <SkeletonCard />
              </Grid>
            ))
        : data?.data?.data?.data.map(
            (curHoverElm: ProductType, index: number) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Link
                  legacyBehavior
                  href={`/products/${curHoverElm?._id}`}
                  passHref
                >
                  <div
                    className={`relative flex h-80 cursor-pointer flex-col items-center justify-center rounded-lg bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]`}
                  >
                    <div className="absolute left-2 top-2 flex w-full flex-col items-start gap-2">
                      {+getDiscountValue(
                        curHoverElm?.mrp,
                        curHoverElm?.salePrice
                      ) !== 0 && (
                        <p
                          className={`flex h-6 w-14 items-center justify-center rounded bg-theme text-xs tracking-wider text-white`}
                        >
                          {getDiscountValue(
                            curHoverElm?.mrp,
                            curHoverElm?.salePrice
                          )}{' '}
                          %
                        </p>
                      )}
                      {getDaysFromSeconds(
                        new Date().getTime() -
                          new Date(curHoverElm?.createdAt).getTime()
                      ) < 7 && (
                        <p
                          className={`flex h-6 w-14 items-center justify-center rounded bg-green-600 text-xs tracking-wider text-white`}
                        >
                          New
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <img
                        src={
                          curHoverElm.displayImage?.url ||
                          ProductImageNotAvailable?.src
                        }
                        alt={curHoverElm.title}
                        className="h-36 object-contain"
                      />
                    </div>
                    <div className="mt-4 flex justify-center gap-1 text-base text-theme">
                      {[...Array(5)].map((_, index) => (
                        <Fragment key={index}>
                          {curHoverElm.reviews?.stars /
                            curHoverElm.reviews?.total >=
                          index + 1 ? (
                            <Star fontSize="inherit" color="inherit" />
                          ) : (
                            <StarBorder fontSize="inherit" color="inherit" />
                          )}
                        </Fragment>
                      ))}
                    </div>
                    <h1 className="py-1 text-slate-800">
                      {curHoverElm?.title}
                    </h1>
                    <div className="flex items-center gap-2 tracking-wider text-slate-800">
                      <p className="text-base line-through">
                        ₹{curHoverElm?.mrp}
                      </p>
                      <p className="text-lg font-medium">
                        ₹{curHoverElm?.salePrice}
                      </p>
                    </div>
                  </div>
                </Link>
              </Grid>
            )
          )}
    </>
  )
}

export default CategoryList
