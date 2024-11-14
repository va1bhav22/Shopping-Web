export default interface OfferCardType {
  _id: string
  title: string
  description: string
  minOrderAmount: number
  discount: number
  startDate: string
  endDate: string
  isUsed: boolean
}
