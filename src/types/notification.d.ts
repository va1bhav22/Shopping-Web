import UserType from './user'

export default interface NotificationType {
  _id: string
  user: UserType
  title: string
  image: string
  link: string
  message: string
  isRead: boolean
  createdAt: Date
  updatedAt: Date
}
