import CategoryType from './category'

export default interface Product {
  _id: string
  title: string
  shortDescription: string
  description: string
  isFeatured: boolean
  isActive: boolean
  category: CategoryType
  stock: number
  salePrice: number
  mrp: number
  displayImage: {
    url: string
    path: string
  }
  images: {
    url: string
    path: string
  }[]
  store: StoreType
  variantOf: Product
  measureType: 'kg' | 'gm' | 'ltr' | 'ml' | 'pc'
  measureUnit: number
  type: 'B2B' | 'B2C'
  reviews: {
    total: number
    stars: number
  }
  moq: number
  createdAt: string
  updatedAt: string
  isInWishList: boolean
  isInCart: boolean
  variants?: Product[]
}
