import ProductType from 'types/product'

export default interface OrderSummeryItemType {
  _id: string
  user: UserType
  product: ProductType
  quantity: number
  updatedAt: string
  createdAt: string
  total: number
}
