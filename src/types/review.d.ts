import OrderType from './order'
import ProductType from './product'
import UserType from './user'

export default interface ReviewType {
  _id: string
  product: ProductType
  user: UserType
  rating: number
  title: string
  comment: string
  order: OrderType
  createdAt: string
  updatedAt: string
}
