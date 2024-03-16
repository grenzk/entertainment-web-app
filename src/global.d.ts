interface Thumbnail {
  trending?: {
    small: string
    large: string
  }
  regular: {
    small: string
    medium?: string
    large: string
  }
}

interface MediaItem {
  title: string
  thumbnail: Thumbnail
  year: number
  category: string
  rating: string
  isBookmarked: boolean
  isTrending: boolean
}
