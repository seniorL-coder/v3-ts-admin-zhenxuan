import { request } from '@/utils/request.ts'
import type { loginParamsType, ModelResponseUser, UserInfoType } from '@/types/user'
import type { ApiResponse, ApiResponsePageLimit } from '@/types/apiResponse'

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

/**
 * 获取用户列表
 * @param page
 * @param limit
 */
export const fetchUserListAPI = (page: number, limit: number) => {
  return request<ApiResponsePageLimit<ModelResponseUser>>({
    method: 'GET',
    url: `/acl/user/${page}/${limit}`,
  })
}
