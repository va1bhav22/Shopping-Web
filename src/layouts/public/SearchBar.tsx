import { CloseRounded } from '@mui/icons-material'
import InputBase from '@mui/material/InputBase'
import { ProductImageNotAvailable } from 'assets'
import { empty_cart } from 'assets/home'
import useAuthFetch from 'hooks/useAuthFetch'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import ProductType from 'types/product'

export default function SearchBar() {
  const [search, setSearch] = React.useState<string>('')
  // const { data, isValidating } = useSWRAPI(
  //   search ? `products/search?searchText=${search}&limit=11&chunk=0` : null,
  //   {
  //     revalidateOnFocus: false,
  //   }
  // )
  const { data, isLoading, mutate } = useAuthFetch()
  const fetchSearchTimeOut = React.useRef<any>()
  useEffect(() => {
    ;(() => {
      clearTimeout(fetchSearchTimeOut.current)
      fetchSearchTimeOut.current = setTimeout(() => {
        mutate({
          path: `products/search?searchText=${search}&limit=11&chunk=0`,
        })
      }, 300)
    })()
  }, [search])

  return (
    <div className="flex h-12 w-full items-center justify-center rounded-[30px] border border-theme bg-white">
      {/* <SelectMenu /> */}

      <InputBase
        sx={{
          ml: 2,
          mr: 2,
          flex: 1,
        }}
        value={search}
        placeholder="What are you looking..."
        inputProps={{ 'aria-label': 'What are you looking for...' }}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search && (
        <span
          className="flex h-full items-center justify-center  px-2"
          onClick={() => setSearch('')}
        >
          <CloseRounded />
        </span>
      )}
      <span className="flex h-full cursor-pointer items-center justify-center rounded-tr-[30px] rounded-br-[30px] bg-theme px-10 text-white">
        {/* <SearchIcon /> */}
        Search
      </span>
      {search && (
        <div className="fixed top-[11em] z-[100] max-h-[60vh] w-2/3 overflow-y-auto rounded-lg border border-gray-200 bg-opacity-60 bg-clip-padding p-8 text-center shadow-md backdrop-blur-xl backdrop-filter">
          {isLoading && !data ? (
            Array(5)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className=" my-2 grid h-16 w-full cursor-pointer grid-cols-5 items-center rounded-lg bg-white/60 p-1 text-start shadow-xl "
                >
                  <Skeleton circle height={'3rem'} width={'3rem'} />
                  {/* <img
              className="col-span-1 h-full w-auto"
            /> */}
                  <Skeleton />
                </div>
              ))
          ) : data?.data?.length ? (
            data?.data?.map((curElm: ProductType, index: number) => (
              <Link
                legacyBehavior
                href={`/products/${curElm._id}`}
                key={index}
                passHref
              >
                <a className=" my-2 grid h-16 w-full cursor-pointer grid-cols-5 items-center rounded-lg bg-white p-1 text-start shadow-xl ">
                  <Image
                    src={
                      curElm?.displayImage?.url || ProductImageNotAvailable?.src
                    }
                    alt={curElm?.title}
                    objectFit="contain"
                    width={100}
                    height={60}
                    unoptimized={true}
                  />
                  {/* <img
                      className="col-span-1 h-full w-auto"
                    /> */}
                  <span className="col-span-4 ">{curElm?.title}</span>
                </a>
              </Link>
            ))
          ) : (
            <div className="flex w-full flex-col items-center justify-center gap-2">
              <img
                src={empty_cart.src}
                alt="empty category"
                className="h-auto w-1/2"
              />
              <h1 className="text-gray-500">Products Not Available</h1>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
