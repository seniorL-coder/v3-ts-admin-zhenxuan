import { request } from '@/utils/request.ts'
import type { loginParamsType } from '@/types/user/login'
import type { ApiResponse } from '@/types/apiResponse'

export const fetchLoginAPI = (data: loginParamsType) => {
  return request<loginParamsType, ApiResponse<string>>({
    method: 'POST',
    url: '/index/login',
    data,
  })
}
