import { Star, StarBorder } from '@mui/icons-material'
import { ProductImageNotAvailable } from 'assets'
import Link from 'next/link'
import { Fragment } from 'react'
import ProductType from 'types/product'
import { getDaysFromSeconds, getDiscountValue } from 'utils'

const SpecialProductCard = ({
  curElm,
  relatedProduct,
}: {
  curElm: ProductType
  relatedProduct: any
}) => {
  return (
    <div
      className={`group relative flex h-80 flex-col items-center justify-center rounded-lg bg-white ${
        relatedProduct
          ? 'shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'
          : ''
      }`}
    >
      <div className="absolute left-2 top-2 flex w-full flex-col items-start gap-2">
        {+getDiscountValue(curElm?.mrp, curElm?.salePrice) !== 0 && (
          <p
            className={`flex h-6 w-14 items-center justify-center rounded bg-theme text-xs tracking-wider text-white`}
          >
            {getDiscountValue(curElm?.mrp, curElm?.salePrice)} %
          </p>
        )}
        {getDaysFromSeconds(
          new Date().getTime() - new Date(curElm?.createdAt).getTime()
        ) < 7 && (
          <p
            className={`flex h-6 w-14 items-center justify-center rounded bg-green-600 text-xs tracking-wider text-white`}
          >
            New
          </p>
        )}
      </div>
      <Link legacyBehavior href={`/products/${curElm?._id}`}>
        <a className="flex flex-col items-center text-center">
          <img
            src={curElm.displayImage?.url || ProductImageNotAvailable?.src}
            alt={curElm.title}
            className="h-36 cursor-pointer object-contain transition-all duration-300 ease-in-out group-hover:scale-110"
          />
        </a>
      </Link>
      <div className="mt-4 flex justify-center gap-1 text-base text-theme">
        {[...Array(5)].map((_, index) => (
          <Fragment key={index}>
            {curElm.reviews?.stars / curElm.reviews?.total >= index + 1 ? (
              <Star fontSize="inherit" color="inherit" />
            ) : (
              <StarBorder fontSize="inherit" color="inherit" />
            )}
          </Fragment>
        ))}
      </div>
      <h1 className="py-1">{curElm.title}</h1>
      <div className="flex items-center gap-2 tracking-wider text-slate-800">
        {curElm?.mrp !== curElm?.salePrice && (
          <p className="text-base line-through">₹{curElm?.mrp}</p>
        )}
        <p className="text-lg font-medium">₹{curElm?.salePrice}</p>
      </div>
    </div>
  )
}

export default SpecialProductCard
