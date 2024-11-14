import CheckIcon from '@mui/icons-material/Check'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Collapse } from '@mui/material'
import { OrderItemCard } from 'components/cards'
import { useRouter } from 'next/router'
import orderSummeryStore from 'store/orderSummery'
import OrderSummeryItemType from 'types/orderSummeryItem'

const OrderSummary = ({
  products,
  reload,
}: {
  products: OrderSummeryItemType[]
  reload: () => void
}) => {
  const { query } = useRouter()
  const { setIsOrderSummaryOpen, isOrderSummaryOpen, addressId } =
    orderSummeryStore()

  return (
    <>
      {products?.length === 0 ? (
        <div>
          <h1>
            There is Nothing in your Order Summary. please go to cart page
          </h1>
        </div>
      ) : (
        <>
          <div className={`flex justify-between`}>
            <span className={`flex items-center gap-2`}>
              <p className="font-semibold uppercase text-gray-600">
                Order Summary
              </p>
              <CheckIcon
                className={`text-theme ${!!addressId ? 'block' : 'hidden'}`}
              />
            </span>
            <span>
              <ExpandMoreIcon
                className={`${!!addressId ? 'block cursor-pointer' : 'hidden'}`}
                onClick={() => {
                  setIsOrderSummaryOpen(!isOrderSummaryOpen)
                }}
              />
            </span>
          </div>
          <Collapse
            in={
              (!!addressId && isOrderSummaryOpen) ||
              query.productType === 'VIRTUAL'
            }
            timeout="auto"
            unmountOnExit
          >
            <div>
              {products?.map(
                (cartItem: OrderSummeryItemType, index: number) => (
                  <OrderItemCard
                    key={index}
                    isSingleItem={products?.length === 1}
                    orderItem={cartItem}
                    reload={() => reload && reload()}
                  />
                )
              )}
              <div className="mt-4 flex justify-end">
                <button
                  className="discount-card relative overflow-hidden rounded bg-theme px-6 py-3 tracking-wide text-white"
                  onClick={() => setIsOrderSummaryOpen(false)}
                >
                  CONTINUE
                </button>
              </div>
            </div>
          </Collapse>
        </>
      )}
    </>
  )
}

export default OrderSummary
