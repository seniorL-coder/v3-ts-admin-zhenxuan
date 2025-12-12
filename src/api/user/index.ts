import { request } from '@/utils/request.ts'
import type { loginParamsType, UserInfoType } from '@/types/user'
import type { ApiResponse } from '@/types/apiResponse'

export const fetchLoginAPI = (data: loginParamsType) => {
  return request<loginParamsType, ApiResponse<string>>({
    method: 'POST',
    url: '/index/login',
    data,
  })
}

/**
 * index/info
 * 获取用户信息
 */
export const fetchUserInfoAPI = () => {
  return request<unknown, ApiResponse<UserInfoType>>({
    method: 'GET',
    url: '/index/info',
  })
}
