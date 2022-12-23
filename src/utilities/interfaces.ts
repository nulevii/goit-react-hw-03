export interface ProfileInterface {
  username: string
  tag: string
  location: string
  avatar: string
  stats: {
    followers: number
    views: number
    likes: number
  }
}

export interface StatInterface {
  id: string
  label: string
  percentage: number
}

export interface FriendInterface {
  avatar: string
  name: string
  isOnline: boolean
  id?: number
}

export interface TransactionInterface {
  id: string
  type: string
  amount: string
  currency: string
}
