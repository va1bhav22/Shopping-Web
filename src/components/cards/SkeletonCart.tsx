import Skeleton from 'react-loading-skeleton'
const SkeletonCard = () => {
  return (
    <div className="flex h-80 flex-col justify-between  rounded-lg p-2 shadow-[0_8px_25px_rgb(0,0,0,0.12)]">
      <div className="h-2/3 w-full">
        <Skeleton height={'100%'} />
      </div>
      <div>
        <Skeleton count={3} />
      </div>
    </div>
  )
}
export default SkeletonCard
