import Skeleton from 'react-loading-skeleton'

const VerticalSkeletonCard = ({ cards = 1 }: { cards?: number }) => {
  return (
    <>
      {Array(cards)
        .fill(0)
        ?.map((_, index) => (
          <div
            key={index}
            className="flex w-full flex-col justify-between gap-4 rounded bg-white p-8 shadow-[inset_-12px_-8px_40px_#46464620] md:flex-row md:gap-0 lg:w-1/2"
          >
            <div className="flex w-full justify-center md:w-1/4 md:justify-start">
              <Skeleton circle height={'6rem'} width={'6rem'} />
            </div>
            <div className="w-full md:w-3/4">
              <div className="mb-1 flex w-full justify-between gap-2">
                <h1 className="w-3/5 text-2xl font-bold">
                  <Skeleton />
                </h1>
                <p className=" w-2/5  gap-1 ">
                  <Skeleton width={'100%'} />
                </p>
              </div>
              <p className="text-xs tracking-wider text-theme">
                <Skeleton />
              </p>
              <b className="mt-3 text-sm tracking-wider text-gray-500">
                <Skeleton />
              </b>
              <p className="mt-3 text-sm tracking-wider text-gray-500">
                <Skeleton />
              </p>
            </div>
          </div>
        ))}
    </>
  )
}
export default VerticalSkeletonCard
