export interface ApiResponse<T> {
  code: number
  data: T
  message: string
  ok: boolean
}

export interface ApiResponsePageLimit<T> {
  total: number
  size: number
  current: number
  searchCount: boolean
  pages: number
  records: T[]
}
