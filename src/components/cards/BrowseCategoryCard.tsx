import { ArrowForward } from '@mui/icons-material'
import { ProductImageNotAvailable } from 'assets'
import { useRouter } from 'next/router'
import React from 'react'
import CategoryType from 'types/category'

const BrowseCategoryCard = ({ curElm }: any) => {
  const { push } = useRouter()
  return (
    <div className="second-group relative">
      <div className="flex h-40 w-full cursor-pointer flex-col items-center justify-center gap-6 rounded-xl bg-white text-center md:h-60 lg:h-72">
        <div className="flex items-center justify-center">
          <img
            src={curElm?.imageURL || ProductImageNotAvailable?.src}
            alt="logo"
            className="h-24 object-contain lg:h-32"
            onClick={() =>
              push({
                pathname: `/products/`,
                query: { id: curElm._id },
              })
            }
          />
        </div>
        <p className="text-sm tracking-wide lg:text-base">{curElm?.name}</p>
      </div>
      <span
        className="browse-category absolute left-[45%] flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-theme text-sm !text-white transition-all duration-300 ease-in-out "
        onClick={() =>
          push({
            pathname: `/products/`,
            query: { id: curElm._id },
          })
        }
      >
        <ArrowForward className="" />
      </span>
    </div>
  )
}

export default BrowseCategoryCard
