import ProductType from 'types/product'
import UserType from './user'

export default interface CartItem {
  _id: string
  product: ProductType
  quantity: number
  user: UserType
  createdAt: Date
  updatedAt: Date
}
