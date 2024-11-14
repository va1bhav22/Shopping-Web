import { ShoppingBag } from '@mui/icons-material'
import useSWRAPI from 'hooks/useSWRAPI'
import Link from 'next/link'

const HeroSection = () => {
  const { data, isValidating } = useSWRAPI(
    'banners?limit=1&chunk=0&type=header'
  )

  if (isValidating && !data) return null
  if (!data?.data?.data?.data[0]) return null
  return (
    <article
      style={{ backgroundImage: `url(${data?.data?.data?.data[0]?.imageURL})` }}
      className="relative h-[calc(100vh-212px)] w-full bg-cover bg-center"
    >
      <section className="main-container flex h-full w-full items-center justify-center gap-6 lg:justify-start ">
        <div className="flex w-full flex-col items-center justify-center gap-6 text-slate-800 lg:w-1/2 lg:items-start">
          <h1 className="text-4xl font-semibold md:text-7xl">
            {data?.data?.data?.data[0]?.title}
          </h1>
          <p className="text-lg tracking-wide lg:text-xl">
            {data?.data?.data?.data[0]?.description}
          </p>
          <Link
            legacyBehavior
            href={data?.data?.data?.data[0]?.link || '/products'}
          >
            <button className="discount-card relative flex h-12 w-36 items-center justify-center gap-2 overflow-hidden rounded-[30px] bg-theme text-white transition-all duration-300 ease-in-out">
              <ShoppingBag />
              Shop Now
            </button>
          </Link>
        </div>
      </section>
    </article>
  )
}

export default HeroSection
