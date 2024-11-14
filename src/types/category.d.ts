export default interface Category {
  _id: string
  name: string
  imageURL: string
  imagePath: string
  description: string
  parentCategory: CategoryType
  isActive: boolean
  isFeatured: boolean
  createdAt: string
  updatedAt: string
}
