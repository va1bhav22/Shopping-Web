import { ReactChild, ReactFragment, ReactPortal, SVGProps } from 'react'
import type { APIFunction } from './api'

export type IconType = JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
declare global {
  interface window {
    Razorpay: any
  }
}
export type AppContextType = {
  user?: Partial<User> | null
  updateUser?: (updatedUserData: Partial<User>) => Promise<void>
}
export type AppContextProviderType = {
  children:
    | boolean
    | ReactChild
    | ReactFragment
    | ReactPortal
    | null
    | undefined
}

export type UserRole = 'admin' | 'user'
export type Gender = 'Male' | 'Female' | 'Other'
// export type User = {
//   uid: string
//   displayName: string
//   phoneNumber: string
//   email: string
//   password: string
//   photoURL: string
//   createdAt: string
//   updatedAt: string
//   isBlocked: boolean
//   photoRef: string
//   role: UserRole
//   isOnline: boolean
// }
export type User = {
  _id: string
  displayName: string
  email: string
  password: string
  photoURL: string
  phoneNumber: string
  countryCode: string
  gender: Gender
  isOTPVerified?: boolean
  isAuthenticated?: boolean
  fcmToken?: string
  token?: string
  institute?: string
  isOnline?: boolean
  role?: string
  status?: string
  lastLoginTime: string
  createdAt: string
  updatedAt: string
  store?: string
}
export type Support = {
  id: string
  displayName: string
  email: string
  subject: string
  message: string
}

export type NotificationType = {
  id: string
  title: string
  message: string
  createdAt: string
  isRead: boolean
}

type weightType = {
  weight?: string
  currentPrice?: number
  inStock?: boolean
  discount?: number
}
export type ProductType = {
  id: number
  title?: string
  description?: string
  img?: string
  quantity?: number
  weightAvailability?: weightType[]
  ratings?: number
  category?: string
  isNew?: boolean
  b2bImg?: string
  b2bQuantity?: string
}
export type CategoryType = {
  id?: number
  img?: string
  categoryName?: string
}
export type CartItemType = {
  product: ProductType
  quantity: number
  weight?: weightType
}
export type CouponType = {
  id: number
  name: string
  description: string
  discount: number
  expiryDate: string
  terms: string[]
}

// export type OrderedProductType = Partial<ProductType> & {
//   quantity: number
//   weight?: weightType
// }

export type MyOrderType = {
  product: ProductType
  status:
    | 'In-Transit'
    | 'Delivered'
    | 'Dispatched'
    | 'Out For Delivery'
    | 'Cancelled'
  expectedDate: string
}
export { APIFunction }
