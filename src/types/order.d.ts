import ProductType from 'types/product'
import AddressType from './address'
import BillingType from './billing'
import UserType from './user'

export default interface OrderType {
  _id: string
  user: UserType
  store: StoreType
  product: ProductType
  quantity: number
  billing: BillingType
  shippedFrom: AddressType
  shippedTo: AddressType
  createdAt: Date
  updatedAt: Date
  ETA: Date
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
  trackingNumber: string
  totalPrice: number
  totalMrp: number
  GSTDoc: string
  GSTNumber: string
  createdAt: string
  updatedAt: string
}
