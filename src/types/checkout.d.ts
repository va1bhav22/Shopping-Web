export interface AppliedCouponType {
  activeAt: string
  benefitAmount: number
  coupon: string
  couponId: string
}

export default interface CheckoutType {
  discount: number
  totalMrp: number
  totalSalePrice: number
  deliveryCharge?: number
  products: CartItem[]
  couponInfo?: AppliedCouponType
}
