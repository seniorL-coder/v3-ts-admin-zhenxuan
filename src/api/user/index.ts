import { request } from '@/utils/request.ts'
import type { loginParamsType, UserInfoType } from '@/types/user'
import type { ApiResponse } from '@/types/apiResponse'

export const fetchLoginAPI = (data: loginParamsType) => {
  return request<string>({
    method: 'POST',
    url: '/acl/index/login',
    data,
  })
}

/**
 * index/info
 * 获取用户信息
 */
export const fetchUserInfoAPI = () => {
  return request<UserInfoType>({
    method: 'GET',
    url: '/acl/index/info',
  })
}

/**
 * index/logout
 * 登出
 */
export const fetchLogoutAPI = () => {
  return request<unknown, ApiResponse<string>>({
    method: 'POST',
    url: '/acl/index/logout',
  })
}
