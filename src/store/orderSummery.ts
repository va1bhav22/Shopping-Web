import create from 'zustand'
type OrderSummery = {
  type: 'CART' | 'PRODUCT'
  productId?: string
  quantity?: number
  couponId?: string
  addressId?: string // this is the address id to be used for delivery
  isPaymentOptionOpen?: boolean
  isOrderSummaryOpen?: boolean
  setType: (type: 'CART' | 'PRODUCT') => void
  setProductId: (productId: string) => void
  setQuantity: (quantity: number) => void
  setCouponId: (couponId: string) => void
  setAddressId: (addressId: string) => void
  setIsPaymentOptionOpen: (isPaymentOptionOpen: boolean) => void
  setIsOrderSummaryOpen: (isOrderSummaryOpen: boolean) => void
}

const orderSummeryStore = create<OrderSummery>((set) => ({
  type: 'CART',
  productId: '',
  quantity: 1,
  couponId: '',
  addressId: '',
  isPaymentOptionOpen: false,
  isOrderSummeryOpen: false,
  setType: (type) => set({ type }),
  setProductId: (productId) => set({ productId }),
  setQuantity: (quantity) => set({ quantity }),
  setCouponId: (couponId) => set({ couponId }),
  setAddressId: (addressId) => set({ addressId }),
  setIsPaymentOptionOpen: (isPaymentOptionOpen) => set({ isPaymentOptionOpen }),
  setIsOrderSummaryOpen: (isOrderSummaryOpen) => set({ isOrderSummaryOpen }),
}))

export default orderSummeryStore
