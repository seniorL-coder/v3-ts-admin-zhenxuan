export interface ApiResponse<T> {
  code: number
  data: T
  message: string
  ok: boolean
}

export interface ApiResponsePageLimit<T> {
  current?: number
  pages?: number
  records?: T[]
  searchCount?: boolean
  size?: number
  total?: number
}
