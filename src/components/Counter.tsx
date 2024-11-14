import { CircularProgress } from '@mui/material'

type Props = {
  count: number
  onDecrement: () => void
  onIncrement: () => void
  isDecrementLoading: boolean
  isIncrementLoading: boolean
}

const Counter = ({
  count,
  onDecrement,
  onIncrement,
  isDecrementLoading,
  isIncrementLoading,
}: Props) => {
  return (
    <div className="flex items-center justify-center rounded-[30px] bg-gray-200 p-1">
      <span
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-theme transition-all duration-300 ease-in-out hover:bg-theme hover:text-white"
        onClick={onDecrement}
      >
        {isDecrementLoading ? <CircularProgress size={16} /> : '-'}
      </span>
      <span className="flex w-14 items-center justify-center">{count}</span>
      <span
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-theme transition-all duration-300 ease-in-out hover:bg-theme hover:text-white"
        onClick={onIncrement}
      >
        {isIncrementLoading ? <CircularProgress size={16} /> : '+'}
      </span>
    </div>
  )
}

export default Counter
