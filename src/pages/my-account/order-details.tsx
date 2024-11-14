import useStore from 'app/useStore'
import { MyOrderCard } from 'components/cards'
import CommonBanner from 'components/CommonBanner'
import { PrivateRoute, PublicLayout } from 'layouts'
import Link from 'next/link'
import { getPrice } from 'utils'

const OrderDetails = () => {
  const { orderItems } = useStore((state) => state)
  const {
    TotalProductPriceWithoutDiscount,
    totalDiscountAmount,
    sumTotalPriceCustomerWillPay,
    deliveryCharge,
  } = getPrice(orderItems)

  return (
    <PrivateRoute>
      <PublicLayout title="Order Placed | Prizen">
        <CommonBanner title="Order Placed" />
        <section className="flex justify-center bg-gray-100 py-20">
          <section className="main-container w-full bg-white p-10 md:w-[90%] lg:w-3/5">
            <div className="flex justify-between">
              <h1 className="pb-4 text-2xl font-semibold tracking-wide">
                Your Order Has Been Received!
              </h1>
              <Link legacyBehavior href="/my-account/my-order">
                <button className="discount-card relative overflow-hidden rounded-lg bg-theme px-6 py-3  text-white">
                  View Order
                </button>
              </Link>
            </div>
            <p className="text-lg tracking-wider">Hi User1,</p>
            <p className="pb-4 pt-2 tracking-wider text-gray-500">
              Your order has been confirmed and will be shipping soon.
            </p>
            <div className="flex flex-col gap-4 border-y border-gray-200 py-6 md:flex-row md:justify-between md:gap-0">
              <span className="">
                <p className="pb-1 text-sm tracking-wide text-gray-500">
                  Order ID:
                </p>
                <h2 className="font-semibold tracking-wide">Ch17619</h2>
              </span>
              <span className="">
                <p className="pb-1 text-sm tracking-wide text-gray-500">
                  Order Date:
                </p>
                <h2 className="font-semibold tracking-wide">July 4, 2022</h2>
              </span>
              <span className="">
                <p className="pb-1 text-sm tracking-wide text-gray-500">
                  Address
                </p>
                <h2 className="font-semibold tracking-wide">
                  Bhubaneswar,751002
                </h2>
              </span>
              <span className="">
                <p className="pb-1 text-sm tracking-wide text-gray-500">
                  Payment Method:
                </p>
                <h2 className="font-semibold tracking-wide">Online Payment</h2>
              </span>
            </div>
            <div className="flex flex-col gap-4 py-6">
              {orderItems?.map((currOrderItem) => (
                <MyOrderCard
                  key={currOrderItem?.product?.id}
                  currOrderItem={currOrderItem}
                  // {
                />
              ))}
            </div>
            <div className="flex flex-col gap-4 border-y border-gray-200 py-6 tracking-wide text-gray-500">
              <span className="flex justify-between">
                <p>Subtotal</p>
                <p>₹{TotalProductPriceWithoutDiscount}</p>
              </span>
              <span className="flex justify-between">
                <p>Shipping</p>
                <p>₹{deliveryCharge}</p>
              </span>
              <span className="flex justify-between">
                <p>Discount</p>
                <p>- ₹{totalDiscountAmount}</p>
              </span>
              <span className="flex justify-between">
                <p>Coupon Discount{`(SAVE25)`}</p>
                <p>- ₹124</p>
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-200 py-6 tracking-wide">
              <p className="text-lg tracking-wide">Total</p>
              <p className="text-gray-500">₹{sumTotalPriceCustomerWillPay}</p>
            </div>
            <p className="py-6 text-sm tracking-wide text-gray-500">
              {`we'll`} send you shipping confirmation when your {`item(s)`} are
              on the way! We appreciate your business and hope you enjoy your
              purchase
            </p>
            <h1 className="pb-3 text-xl tracking-wide">Thank you!</h1>
            <p className="text-sm tracking-wide text-gray-500">Prizen</p>
          </section>
        </section>
      </PublicLayout>
    </PrivateRoute>
  )
}

export default OrderDetails
