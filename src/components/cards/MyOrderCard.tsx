import { ProductImageNotAvailable } from 'assets'
import { CartItemType } from 'types'
type Props = {
  currOrderItem: CartItemType
}

const MyOrderCard = ({ currOrderItem }: Props) => {
  return (
    <section className="flex w-full flex-col items-center justify-between gap-4 text-center md:flex-row md:gap-0 md:text-left">
      <div className="border border-gray-200 p-2">
        <img
          src={currOrderItem?.product?.img || ProductImageNotAvailable?.src}
          alt="honey"
          className="h-32 w-24"
        />
      </div>
      <div className="w-80">
        <h1 className="text-lg tracking-wide">
          {currOrderItem?.product?.title}
        </h1>
        <p className="text-sm tracking-wide text-gray-500">
          {currOrderItem?.product?.description}
        </p>
      </div>
      <p className="tracking-wide text-gray-500">
        Qty: {currOrderItem?.quantity}
      </p>
      <p className="tracking-wide text-gray-500">
        ₹{currOrderItem?.weight?.currentPrice}
      </p>
    </section>
  )
}

export default MyOrderCard
