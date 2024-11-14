import React from 'react'

const ProgressBar = ({
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
      <div className="OrderProgressSection">
        {status === 'CANCELLED' ? (
          <h1 className="rounded-md bg-red-200 px-2 py-1 text-red-500">
            CANCELLED
          </h1>
        ) : (
          <div className="StatusProgressWarper">
            <span className="status" title="order placed">
              order placed
            </span>
            <span className="status" title="packed">
              packed
            </span>
            <span className="status" title="shipped">
              shipped
            </span>
            <span className="status" title="out for delivery">
              out for delivery
            </span>
            <span className="status" title="delivered">
              delivered
            </span>
            <div
              style={{
                width: `${OrderStatusLevel(status)}%`,
              }}
              className="progressBar"
              title={`item has been delivered`}
              //   title={`item has been ${OrderInfo.status}`}
            ></div>
          </div>
        )}
        {status === 'OUT_FOR_DELIVERY' ? (
          <p className="text-xs tracking-wider">
            Your item is Out For Delivery.
          </p>
        ) : null}
        {/* )} */}
      </div>
    </section>
  )
}

export default ProgressBar
function DateFormat(ETA: any): React.ReactNode {
  throw new Error('Function not implemented.')
}
