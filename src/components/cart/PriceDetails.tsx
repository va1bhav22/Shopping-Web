import Coupon from 'components/core/Coupon'
import { AppliedCouponType } from 'types/checkout'

type Props = {
  items: number
  discount: number
  totalAmount: number
  totalMRP: number
  deliveryCharge?: number
  ActiveCouponData?: AppliedCouponType
}

const PriceDetails = ({
  items,
  discount,
  totalAmount,
  totalMRP,
  deliveryCharge,
  ActiveCouponData,
}: Props) => {
  return (
    <div className="w-full">
      <div className="bg-white">
        <h1 className="border-b border-gray-200 p-6 text-xl font-bold tracking-wide text-gray-500">
          PRICE DETAILS
        </h1>
        <div className="flex flex-col gap-4 border-b border-dashed border-gray-200 p-6">
          <div className="flex items-center justify-between text-gray-500">
            <p>Price {`(${items} Items)`}</p>
            <p>₹{totalMRP}</p>
          </div>
          <div className="flex items-center justify-between text-theme ">
            <p>Total Discount</p>
            <p>- ₹{discount.toFixed(2)}</p>
          </div>
          <Coupon ActiveCouponData={ActiveCouponData} />
          {deliveryCharge ? (
            <div className="flex items-center justify-between text-gray-500">
              <p>Delivery Charges</p>
              <p>₹{deliveryCharge}</p>
            </div>
          ) : null}
        </div>
        <div className="flex items-center justify-between border-b border-dashed border-gray-200 p-6 text-lg">
          <p>Total Amount</p>
          <p>₹{totalAmount}</p>
        </div>
      </div>
    </div>
  )
}

export default PriceDetails
