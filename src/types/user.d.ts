export default interface UserType {
  _id: string
  displayName: string
  phoneNumber: number
  referralCode: string
  country: {
    code: string
    name: string
    phone: string
  }
  photoURL: string
  photoPath: string
  email: string
  gender: 'MALE' | 'FEMALE' | 'OTHER'
  encrypted_password: string
  salt: string
  password: string
  _password: string
  token: string
  dateOfBirth: string
  role: 'USER' | 'SELLER' | 'ADMIN'
  status: 'INACTIVE' | 'ACTIVE' | 'PENDING' | 'VERIFIED'
  fcmTokens: {
    web: string
    android: string
    ios: string
  }
  isLoggedIn: boolean
  isOnline: boolean
  blockStatus: 'BLOCKED' | 'UNBLOCKED'
  lastLogin: Date
  verificationInfo: {
    OTP: number
    OTPExpiry: Date
  }
  store: StoreType
  encryptPassword(rawPassword: string): string
  authenticate(rawPassword: string): boolean
  refreshTokens: {}
  GSTNumber: string
  GSTDoc: string
  GSTDocType: string
  GSTDocPath: string
  createdAt: string
  updatedAt: string
  cartCount: number
}
