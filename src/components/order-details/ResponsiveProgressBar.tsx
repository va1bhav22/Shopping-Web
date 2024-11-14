import React from 'react'

const ResponsiveProgressBar = ({
  status,
}: {
  status:
    | 'PENDING'
    | 'INITIATED'
    | 'CONFIRMED'
    | 'PACKED'
    | 'SHIPPED'
    | 'OUT_FOR_DELIVERY'
    | 'DELIVERED'
    | 'CANCELLED'
    | 'RETURNED'
}) => {
  const OrderStatusLevel = (
    OrderStatus:
      | 'PENDING'
      | 'INITIATED'
      | 'CONFIRMED'
      | 'PACKED'
      | 'SHIPPED'
      | 'OUT_FOR_DELIVERY'
      | 'DELIVERED'
      | 'CANCELLED'
      | 'RETURNED'
  ) => {
    switch (OrderStatus) {
      case 'INITIATED':
        return 20
      case 'PACKED':
        return 40
      case 'SHIPPED':
        return 50
      case 'OUT_FOR_DELIVERY':
        return 75
      case 'DELIVERED':
        return 100
      default:
        return 0
    }
  }

  return (
    <section>
      <div className="flex flex-col items-center">
        {/* <div className="StatusProgressWarper"> */}
        {status === 'CANCELLED' ? (
          <h1 className="rounded-md bg-red-200 px-2 py-1 text-red-500">
            CANCELLED
          </h1>
        ) : (
          <div className="flex text-xs">
            <div className={`relative flex flex-col items-end gap-4 rounded `}>
              <span
                className={`absolute top-0 -right-[38px] w-[2px] bg-theme `}
                style={{ height: `${OrderStatusLevel(status)}%` }}
              ></span>
              <span
                className="relative after:absolute after:top-1 after:-right-10 after:h-[6px] after:w-[6px] after:rounded-full after:bg-theme  after:content-['']  "
                title="order placed"
              >
                order placed
              </span>
              <span
                className="relative after:absolute after:top-1 after:-right-10 after:h-[6px] after:w-[6px] after:rounded-full after:bg-theme  after:content-['']  "
                title="packed"
              >
                packed
              </span>
              <span
                className="relative after:absolute after:top-1 after:-right-10 after:h-[6px] after:w-[6px] after:rounded-full after:bg-theme  after:content-['']  "
                title="shipped"
              >
                shipped
              </span>
              <span
                className="relative after:absolute after:top-1 after:-right-10 after:h-[6px] after:w-[6px] after:rounded-full after:bg-theme  after:content-['']  "
                title="out for delivery"
              >
                out for delivery
              </span>
              <span
                className="relative after:absolute after:top-1 after:-right-10 after:h-[6px] after:w-[6px] after:rounded-full after:bg-theme  after:content-['']"
                title="delivered"
              >
                delivered
              </span>
            </div>
          </div>
        )}
        {status === 'DELIVERED' && (
          <p className="mt-8 text-center text-xs tracking-wider">
            Your item is Out For Delivery.
          </p>
        )}
        {/* )} */}
      </div>
    </section>
  )
}

export default ResponsiveProgressBar
function DateFormat(ETA: any): React.ReactNode {
  throw new Error('Function not implemented.')
}
