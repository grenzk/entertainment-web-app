declare interface User {
  email: string
  password: string
}

declare interface Payload {
  user: User
}

declare interface MediaItem {
  id: number
  title: string
  thumbnails: {
    trending?: string
    regular: string
  }
  year: number
  category: string
  rating: string
  isTrending: boolean
  isBookmarked: boolean
}
