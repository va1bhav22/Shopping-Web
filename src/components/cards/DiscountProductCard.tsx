import { ProductImageNotAvailable } from 'assets'
import Link from 'next/link'
import BannerType from 'types/banner'

const DiscountProductCard = ({ curElm }: { curElm: BannerType }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${
          curElm.imageURL || ProductImageNotAvailable?.src
        })`,
      }}
      className={`discount-card relative flex h-[223px] w-full items-center gap-2 overflow-hidden rounded-lg bg-cover bg-no-repeat text-white`}
    >
      <div className="w-1/2"></div>

      <div className="w-1/2 px-4 md:px-8 lg:px-2">
        <h1 className="text-sm uppercase">{curElm.title}</h1>
        <p className="w-full py-4 text-base tracking-wide md:text-lg lg:text-xl">
          {curElm.description}
        </p>
        <div className="flex w-full items-center justify-between">
          <Link legacyBehavior href={curElm?.link || '/'}>
            <button className="rounded bg-white px-4 py-3 text-sm text-theme transition-all duration-300 ease-in-out">
              Know More
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DiscountProductCard
