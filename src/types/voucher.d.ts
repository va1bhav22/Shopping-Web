export default interface VoucherCardType {
  _id: string
  code: string
  title: string
  minOrderAmount: number
  discount: number
  description: string
  startDate: string
  endDate: string
  isUsed: boolean
}
