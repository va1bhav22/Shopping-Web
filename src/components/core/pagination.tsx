import {
  ArrowBackIosNew,
  ArrowForwardIos,
  RotateLeft,
} from '@mui/icons-material'

const Pagination = ({
  isLoading,
  chunk,
  setChunk,
  isLastChunk,
}: {
  isLoading: boolean
  chunk: number
  setChunk: Function
  isLastChunk: boolean
}) => {
  if (!chunk && isLastChunk) return null
  return (
    <div className="flex h-20 w-full items-center justify-center gap-8 pt-8">
      <button
        className="discount-card relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-theme text-sm text-white disabled:bg-gray-400 md:h-12 md:w-12"
        onClick={() => setChunk((prev: number) => prev - 1)}
        disabled={isLoading || chunk <= 0}
      >
        {isLoading ? <RotateLeft /> : <ArrowBackIosNew />}
      </button>
      <h1 className="flex h-10 w-10 items-center justify-center rounded-full bg-theme/10 py-2 text-lg font-semibold md:h-12 md:w-12">
        {chunk + 1}
      </h1>
      <button
        className="discount-card relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-theme text-sm text-white disabled:bg-gray-400 md:h-12 md:w-12"
        onClick={() => setChunk((prev: number) => prev + 1)}
        disabled={isLoading || isLastChunk}
      >
        {isLoading ? <RotateLeft /> : <ArrowForwardIos />}
      </button>
    </div>
  )
}

export default Pagination
