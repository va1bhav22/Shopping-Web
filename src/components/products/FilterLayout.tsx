import { Checkbox, Collapse, Grid } from '@mui/material'
import useStore from 'app/useStore'
import { empty_cart } from 'assets/home'
import { MainProductCard } from 'components/cards'
import SkeletonCard from 'components/cards/SkeletonCart'
import Pagination from 'components/core/pagination'
import { useAuth } from 'hooks'
import useSWRAPI from 'hooks/useSWRAPI'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import CategoryType from 'types/category'
import ProductType from 'types/product'
import RangeSlider from './PriceRangeSlider'
import SelectSmall from './SelectSorting'
import { ArrowForwardIos, FilterList, StarRate } from '@mui/icons-material'

const FilterLayout = () => {
  // const [selectedItem, setSelectedItem] = React.useState<any>([])
  // const [wishlist, setWishlist] = React.useState<any>([])
  const [isFilterOpen, setIsFilterOpen] = React.useState<boolean>(false)
  const products = useStore((state) => state.products)
  const [sortBy, setSortBy] = React.useState<string>('default')
  const [categoryIds, setCategoryIds] = React.useState<string[] | null>(null)
  const [priceRange, setPriceRange] = React.useState<number[]>([0, 200000])
  const [ratingRange, setRatingRange] = React.useState<number[] | null>(null)
  const [discountRange, setDiscountRange] = React.useState<number[] | null>(
    null
  )

  const router = useRouter()
  const { id } = router?.query as {
    id: string
  }
  useEffect(() => {
    id && setCategoryIds([id])
  }, [router])

  const handelClearFilter = () => {
    setSortBy('default')
    setCategoryIds(null)
    setPriceRange([0, 200000])
    setRatingRange(null)
    setDiscountRange(null)
  }

  return (
    <article className="bg-white text-slate-800">
      <section className="main-container py-8 md:py-16">
        {/* //? Breadcrumb Section */}
        <div className="flex w-full flex-col items-center justify-between gap-4 rounded-lg bg-white p-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] md:flex-row">
          <p>Filter results</p>
          <SelectSmall onSortSelect={setSortBy} />
        </div>
        {/* //? Layout Section */}
        <section className="flex w-full flex-col justify-between gap-4 pt-8 md:flex-row lg:gap-8">
          {/* //? Filter Section */}
          {/* //? Above medium Screen */}
          <aside className="hidden h-full flex-col items-start bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] md:flex md:w-[30%] lg:w-1/4">
            <span className="flex w-full flex-row items-center justify-between py-4 px-4">
              <h1 className=" border-b-2 border-gray-100  font-semibold uppercase tracking-wide md:text-lg">
                FILTERS
              </h1>
              {(!!categoryIds ||
                !!ratingRange ||
                !!discountRange ||
                !(priceRange[0] === 0 && priceRange[1] === 200000)) && (
                <button
                  className="rounded-lg bg-orange-200 px-2 py-1"
                  onClick={handelClearFilter}
                >
                  Clear all
                </button>
              )}
            </span>

            {/* //TODO: Filter By Category */}
            <div className="w-full py-4">
              <h1 className="mb-4 ml-4 w-16 border-b-2 border-theme pb-1 font-semibold uppercase tracking-wide text-theme ">
                Categories
              </h1>

              <div className="flex flex-col tracking-wider text-gray-900">
                <AllCatagories
                  onSelect={(categoryId: string) =>
                    setCategoryIds([categoryId])
                  }
                  activeCategoryIds={categoryIds || []}
                />
              </div>
            </div>
            {/* //TODO: Filter By Price */}
            <div className="w-full border-b-2 border-gray-100 p-4">
              <h1 className="w-6 border-b-2 border-theme font-semibold uppercase tracking-wide text-theme">
                price
              </h1>
              <RangeSlider
                setValue={(priceRange: number[]) =>
                  setPriceRange(priceRange as number[])
                }
                value={priceRange}
              />
            </div>
            {/* //TODO: Filter By Ratings */}
            <div className="w-full border-b-2 border-gray-100 p-4">
              <h1 className="font-semibold uppercase tracking-wide text-theme ">
                Customer ratings
              </h1>
              <div className="mb-4 w-20 border-b-2 border-theme pt-1"></div>
              <div className="flex flex-col gap-2 text-sm">
                <span className="flex items-center justify-start gap-3">
                  <Checkbox
                    className="!m-0 !p-0"
                    onClick={() => setRatingRange([4, 5])}
                    checked={ratingRange ? ratingRange[0] === 4 : false}
                  />
                  <p className="flex items-center gap-1">
                    4 <StarRate className="!text-sm" /> & above
                  </p>
                </span>
                <span className="flex items-center justify-start gap-3">
                  <Checkbox
                    className="!m-0 !p-0"
                    onClick={() => setRatingRange([3, 5])}
                    checked={ratingRange ? ratingRange[0] === 3 : false}
                  />
                  <p className="flex items-center gap-1">
                    3 <StarRate className="!text-sm" /> & above
                  </p>
                </span>
                <span className="flex items-center justify-start gap-3">
                  <Checkbox
                    className="!m-0 !p-0"
                    onClick={() => setRatingRange([2, 5])}
                    checked={ratingRange ? ratingRange[0] === 2 : false}
                  />
                  <p className="flex items-center gap-1">
                    2 <StarRate className="!text-sm" /> & above
                  </p>
                </span>
                <span className="flex items-center justify-start gap-3">
                  <Checkbox
                    className="!m-0 !p-0"
                    onClick={() => setRatingRange([1, 5])}
                    checked={ratingRange ? ratingRange[0] === 1 : false}
                  />
                  <p className="flex items-center gap-1">
                    1 <StarRate className="!text-sm" /> & above
                  </p>
                </span>
                <span className="flex items-center justify-start gap-3">
                  <Checkbox
                    className="!m-0 !p-0"
                    onClick={() => setRatingRange([0, 5])}
                    checked={ratingRange ? ratingRange[0] === 0 : false}
                  />
                  <p className="flex items-center gap-1">
                    0 <StarRate className="!text-sm" /> & above
                  </p>
                </span>
              </div>
            </div>
            {/* //TODO: Filter By Discount */}
            <div className="w-full p-4">
              <h1 className="mb-4 w-10 border-b-2 border-theme pb-1 font-semibold uppercase tracking-wide text-theme ">
                Discount
              </h1>
              <div className="flex flex-col gap-2 text-sm">
                <span className="flex items-center justify-start gap-3">
                  <Checkbox
                    className="!m-0 !p-0"
                    checked={discountRange ? discountRange[0] === 50 : false}
                    onClick={() => setDiscountRange([50, 100])}
                  />
                  <p>50% or more</p>
                </span>
                <span className="flex items-center justify-start gap-3">
                  <Checkbox
                    className="!m-0 !p-0"
                    checked={discountRange ? discountRange[0] === 30 : false}
                    onClick={() => setDiscountRange([30, 100])}
                  />
                  <p>30% or more</p>
                </span>
                <span className="flex items-center justify-start gap-3">
                  <Checkbox
                    className="!m-0 !p-0"
                    checked={discountRange ? discountRange[0] === 20 : false}
                    onClick={() => setDiscountRange([20, 100])}
                  />
                  <p>20% or more</p>
                </span>
                <span className="flex items-center justify-start gap-3">
                  <Checkbox
                    className="!m-0 !p-0"
                    checked={discountRange ? discountRange[0] === 10 : false}
                    onClick={() => setDiscountRange([10, 100])}
                  />
                  <p>10% or more</p>
                </span>
                <span className="flex items-center justify-start gap-3">
                  <Checkbox
                    className="!m-0 !p-0"
                    checked={discountRange ? discountRange[0] === 0 : false}
                    onClick={() => setDiscountRange([0, 10])}
                  />
                  <p>10% and below</p>
                </span>
              </div>
            </div>
          </aside>

          {/* //? Responsive Filter Section */}

          <aside className="flex h-full w-full flex-col items-start bg-white md:hidden">
            <div className="flex w-full items-center justify-between border-b-2 border-gray-100 p-4">
              <h1 className="font-semibold uppercase tracking-wide md:text-lg">
                FILTERS
              </h1>
              {(!!categoryIds ||
                !!ratingRange ||
                !!discountRange ||
                !(priceRange[0] === 0 && priceRange[1] === 200000)) && (
                <button
                  className="rounded-lg bg-orange-200 px-2 py-1"
                  onClick={handelClearFilter}
                >
                  Clear all
                </button>
              )}
              <FilterList
                className="block cursor-pointer text-theme md:hidden"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              />
            </div>
            <Collapse
              in={isFilterOpen}
              timeout="auto"
              unmountOnExit
              className="!w-full"
            >
              {/* //TODO: Filter By Category */}
              <div className="w-full py-4">
                <h1 className="mb-4 ml-4 w-16 border-b-2 border-theme pb-1 font-semibold uppercase tracking-wide text-theme ">
                  Categories
                </h1>

                <div className="flex flex-col tracking-wider text-gray-900">
                  <AllCatagories
                    onSelect={(categoryId: string) =>
                      setCategoryIds([categoryId])
                    }
                    activeCategoryIds={categoryIds || []}
                  />
                </div>
              </div>
              {/* //TODO: Filter By Price */}
              <div className="w-full border-b-2 border-gray-100 p-4">
                <h1 className="w-6 border-b-2 border-theme font-semibold uppercase tracking-wide text-theme">
                  price
                </h1>
                <RangeSlider
                  setValue={(priceRange: number[]) =>
                    setPriceRange(priceRange as number[])
                  }
                  value={priceRange}
                />
              </div>
              {/* //TODO: Filter By Ratings */}
              <div className="w-full border-b-2 border-gray-100 p-4">
                <h1 className="font-semibold uppercase tracking-wide text-theme ">
                  Customer ratings
                </h1>
                <div className="mb-4 w-20 border-b-2 border-theme pt-1"></div>
                <div className="flex flex-col gap-2 text-sm">
                  <span className="flex items-center justify-start gap-3">
                    <Checkbox
                      className="!m-0 !p-0"
                      checked={ratingRange ? ratingRange[0] === 4 : false}
                      onClick={() => setRatingRange([4, 5])}
                    />
                    <p className="flex items-center gap-1">
                      4 <StarRate className="!text-sm" /> & above
                    </p>
                  </span>
                  <span className="flex items-center justify-start gap-3">
                    <Checkbox
                      className="!m-0 !p-0"
                      checked={ratingRange ? ratingRange[0] === 3 : false}
                      onClick={() => setRatingRange([3, 5])}
                    />
                    <p className="flex items-center gap-1">
                      3 <StarRate className="!text-sm" /> & above
                    </p>
                  </span>
                  <span className="flex items-center justify-start gap-3">
                    <Checkbox
                      className="!m-0 !p-0"
                      checked={ratingRange ? ratingRange[0] === 2 : false}
                      onClick={() => setRatingRange([2, 5])}
                    />
                    <p className="flex items-center gap-1">
                      2 <StarRate className="!text-sm" /> & above
                    </p>
                  </span>
                  <span className="flex items-center justify-start gap-3">
                    <Checkbox
                      className="!m-0 !p-0"
                      checked={ratingRange ? ratingRange[0] === 1 : false}
                      onClick={() => setRatingRange([1, 5])}
                    />
                    <p className="flex items-center gap-1">
                      1 <StarRate className="!text-sm" /> & above
                    </p>
                  </span>
                  <span className="flex items-center justify-start gap-3">
                    <Checkbox
                      className="!m-0 !p-0"
                      checked={ratingRange ? ratingRange[0] === 0 : false}
                      onClick={() => setRatingRange([0, 5])}
                    />
                    <p className="flex items-center gap-0">
                      0 <StarRate className="!text-sm" /> & above
                    </p>
                  </span>
                </div>
              </div>
              {/* //TODO: Filter By Discount */}
              <div className="w-full p-4">
                <h1 className="mb-4 w-10 border-b-2 border-theme pb-1 font-semibold uppercase tracking-wide text-theme ">
                  Discount
                </h1>
                <div className="flex flex-col gap-2 text-sm">
                  <span className="flex items-center justify-start gap-3">
                    <Checkbox
                      className="!m-0 !p-0"
                      checked={discountRange ? discountRange[0] === 50 : false}
                      onClick={() => setDiscountRange([50, 100])}
                    />
                    <p>50% or more</p>
                  </span>
                  <span className="flex items-center justify-start gap-3">
                    <Checkbox
                      className="!m-0 !p-0"
                      checked={discountRange ? discountRange[0] === 30 : false}
                      onClick={() => setDiscountRange([30, 100])}
                    />
                    <p>30% or more</p>
                  </span>
                  <span className="flex items-center justify-start gap-3">
                    <Checkbox
                      className="!m-0 !p-0"
                      checked={discountRange ? discountRange[0] === 20 : false}
                      onClick={() => setDiscountRange([20, 100])}
                    />
                    <p>20% or more</p>
                  </span>
                  <span className="flex items-center justify-start gap-3">
                    <Checkbox
                      className="!m-0 !p-0"
                      checked={discountRange ? discountRange[0] === 10 : false}
                      onClick={() => setDiscountRange([10, 100])}
                    />
                    <p>10% or more</p>
                  </span>
                  <span className="flex items-center justify-start gap-3">
                    <Checkbox
                      className="!m-0 !p-0"
                      checked={discountRange ? discountRange[0] === 0 : false}
                      onClick={() => setDiscountRange([0, 10])}
                    />
                    <p>10% and below</p>
                  </span>
                </div>
              </div>
            </Collapse>
          </aside>
          {/* //TODO: Products Section */}
          <aside className="h-full w-full md:w-[70%] lg:w-3/4">
            <ProductItems
              sortBy={sortBy}
              categoryIds={categoryIds}
              priceRange={priceRange}
              discountRange={discountRange}
              ratingRange={ratingRange}
            />
          </aside>
        </section>
      </section>
    </article>
  )
}

//TODO:representation of filtered products

const ProductItems = ({
  sortBy = 'default',
  categoryIds,
  ratingRange,
  discountRange,
  priceRange,
  type = 'b2c',
}: {
  sortBy: string
  categoryIds?: string[] | null
  ratingRange?: number[] | null
  discountRange?: number[] | null
  priceRange?: number[] | null
  type?: string
}) => {
  // const IsMounted = useIsMounted()
  const { user } = useAuth()
  const [limit, setLimit] = React.useState<number>(12)
  const [chunk, setChunk] = React.useState<number>(0)
  const filter = {
    category: categoryIds,
    price: priceRange,
    rating: ratingRange,
    discount: discountRange,
  }
  !categoryIds && delete filter.category
  !priceRange && delete filter.price
  !ratingRange && delete filter.rating
  !discountRange && delete filter.discount
  const { data, isValidating, mutate } = useSWRAPI(
    `products/filter?type=${type}&filter=${JSON.stringify(
      filter
    )}&sortBy=${sortBy}&limit=${limit}&chunk=${chunk}&${
      user?._id && `userId=${user?._id}`
    }`
  )

  if (isValidating)
    return (
      <Grid container spacing={{ xs: 1, sm: 2, lg: 2.5 }}>
        {Array(12)
          .fill(0)
          .map((_, index) => (
            <Grid item xs={6} sm={6} md={6} lg={3} key={index}>
              <SkeletonCard />
            </Grid>
          ))}
      </Grid>
    )
  if (!data?.data?.data?.data?.length && !chunk)
    return (
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <img
          src={empty_cart.src}
          alt="empty category"
          className="h-auto w-1/2"
        />
        <h1 className="text-black">Product Not Available</h1>
      </div>
    )
  return (
    <>
      <Grid container spacing={{ xs: 1, sm: 2, lg: 2.5 }}>
        {data?.data?.data?.data?.map((product: ProductType) => (
          <Grid item xs={6} sm={6} md={6} lg={3} key={product?._id}>
            <MainProductCard
              product={product}
              reload={() => mutate()}
              isDataUpdating={isValidating}
            />
          </Grid>
        ))}
      </Grid>
      <Pagination
        chunk={chunk}
        isLastChunk={data?.data?.data?.isLastChunk}
        isLoading={isValidating}
        setChunk={setChunk}
      />
    </>
  )
}

//get all available category
const AllCatagories = ({
  onSelect,
  activeCategoryIds = [],
}: {
  onSelect: (categoryId: string) => void
  activeCategoryIds: string[]
}) => {
  const { data, isValidating } = useSWRAPI('categories')
  if (isValidating)
    return <Skeleton count={5} height="2.5rem" containerClassName="p-2" />
  if (!data?.data?.data?.data?.length) return null
  return data?.data?.data?.data?.map((category: CategoryType) => (
    <span
      className={`group flex cursor-pointer items-center justify-between border-b-2 border-gray-100 px-4 py-3 ${
        activeCategoryIds.includes(category?._id)
          ? 'bg-theme text-white'
          : 'bg-white'
      }`}
      key={category?._id}
      onClick={() => onSelect(category?._id)}
    >
      <p className="">{category?.name} </p>
      <ArrowForwardIos className="group-hover:arrow-animation !text-sm" />
    </span>
  ))
}

export default FilterLayout
