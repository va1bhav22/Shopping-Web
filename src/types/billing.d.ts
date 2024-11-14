export default interface BillingType {
  _id: string
  createdAt: any
  orders: OrderType[]
  basePrice: number
  GST?: number
  totalPrice: number
  paymentMethod?: 'CASH' | 'ONLINE'
  metadata?: {
    payment_order_id: string
    razorpay_payment_id: string
    razorpay_order_id: string
    razorpay_signature: string
  }
  couponDiscount?: {
    coupon: string
    benefitAmount: number
    activeAt: Date
    couponId: string
  }
  cancellationFee?: number
  status: 'PENDING' | 'PAID' | 'CANCELLED' | 'REFUNDED' | 'FAILED'
  deliveryCharge?: number
  createdAt: string
  updatedAt: string
}
