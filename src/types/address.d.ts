export default interface AddressType {
  _id: string
  user: UserType
  name: string
  landmark: string
  email: string
  phoneNumber: number
  countryCode: number
  street: string
  city: string
  state: string
  country: string
  zip: number
  isDefault: boolean
  type: 'HOME' | 'WORK' | 'OTHER'
  createdAt: Date
  updatedAt: Date

}
