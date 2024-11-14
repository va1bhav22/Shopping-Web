export default interface CouponType {
  _id: string
  code: string
  discount: number
  isActive: boolean
  maxDiscount: number
  minOrderAmount: number
  maxUses: number
  uses: UserType[]
  startDate: Date
  endDate: Date
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
}
