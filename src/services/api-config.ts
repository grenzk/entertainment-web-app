const BASE_URL = import.meta.env.VITE_BASE_URL

interface ApiEndpoints {
  users: string
  member: string
  media: string
  bookmarks: string
}

export const API_ENDPOINTS: ApiEndpoints = {
  users: `${BASE_URL}/api/v1/users`,
  member: `${BASE_URL}/api/v1/member-data`,
  media: `${BASE_URL}/api/v1/media`,
  bookmarks: `${BASE_URL}/api/v1/bookmarks`
}
