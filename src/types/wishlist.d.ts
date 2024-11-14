import ProductType from './product'
import UserType from './user'

export default interface WishlistType {
  _id: string
  user: UserType
  product: ProductType
  createdAt: string
  updatedAt: string
}
