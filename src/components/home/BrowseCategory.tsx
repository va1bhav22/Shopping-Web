import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { ProductImageNotAvailable } from 'assets'
import {
  ayush_6,
  gourmet_1,
  home_care_1,
  personal_2,
  sweet_1,
} from 'assets/home'
import { BrowseCategoryCard } from 'components/cards'
import useSWRAPI from 'hooks/useSWRAPI'
import { useRouter } from 'next/router'
import Skeleton from 'react-loading-skeleton'
import CategoryType from 'types/category'

const categoryArr = [
  {
    id: 1,
    img: ayush_6.src,
    name: 'AYUSH Products',
    path: '/ayush-products',
  },
  {
    id: 2,
    img: gourmet_1.src,
    name: 'Gourmet Foods',
    path: '/gourmet-foods',
  },
  {
    id: 3,
    img: personal_2.src,
    name: 'Personal Care',
    path: '/personal-care',
  },

  {
    id: 4,
    img: home_care_1.src,
    name: 'Home Care',
    path: '/home-care',
  },
  {
    id: 5,
    img: sweet_1.src,
    name: 'Sweets',
    path: '/sweets',
  },
]

const BrowseCategory = () => {
  const { data, isValidating } = useSWRAPI('categories/featured')
  const router = useRouter()
  if (!isValidating && !data) return null
  return (
    <section className="bg-gray-100 py-8 md:py-16">
      <section className="main-container">
        <h1 className="pb-10 text-center text-2xl font-bold tracking-wide md:pb-16 md:text-4xl">
          Browse Our <span className="text-theme">Hottest</span> Categories
        </h1>
        <div className="grid w-full grid-cols-2 gap-4 pb-8 md:grid-cols-3 md:gap-8 lg:grid-cols-5">
          {isValidating
            ? Array(5)
                .fill(0)
                .map((_, index) => (
                  <div
                    className="second-group relative flex h-40 w-full flex-col justify-evenly rounded-xl bg-white p-2 md:h-60 lg:h-72"
                    key={index}
                  >
                    <div className="flex flex-col items-center ">
                      <Skeleton circle height={'5rem'} width={'5rem'} />
                    </div>
                    <Skeleton />
                  </div>
                ))
            : data?.data?.data?.map((curElm: CategoryType, index: number) => (
                <BrowseCategoryCard curElm={curElm} key={index} />
              ))}
        </div>
      </section>
    </section>
  )
}

export default BrowseCategory
