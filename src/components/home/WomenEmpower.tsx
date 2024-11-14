import { women_empower } from 'assets/home'
import useSWRAPI from 'hooks/useSWRAPI'
import Link from 'next/link'

const WomenEmpower = () => {
  const { data, isValidating } = useSWRAPI(
    'banners?limit=1&chunk=0&type=middle'
  )
  if (isValidating && !data) return <h1>Loading...</h1>
  if (!data?.data?.data?.data[0]) return <h1>No Data</h1>
  return (
    <section
      style={{
        backgroundImage: `url(${women_empower.src})`,
      }}
      className="relative h-[25rem] w-full bg-cover bg-center bg-no-repeat pb-16 md:h-[35rem]"
    >
      <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <p className="text-lg tracking-wider">
          {data?.data?.data?.data[0]?.description}
        </p>
        <h1 className="animate-text my-8 text-3xl font-extrabold uppercase md:text-6xl">
          {data?.data?.data?.data[0]?.title}
        </h1>
        <Link legacyBehavior href={data?.data?.data?.data[0]?.link || ''}>
          <button className="rounded-[30px] border-2 border-theme bg-white px-8 py-3 text-theme">
            Know More
          </button>
        </Link>
      </div>
    </section>
  )
}

export default WomenEmpower
