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

/**
 * 更新用户
 * @param data 用户信息 {id: number; username: string; name: string}
 */
export const fetchUpdateUserAPI = (data: { id: number; username: string; name: string }) => {
  return request({
    method: 'PUT',
    url: '/acl/user/update',
    data,
  })
}

/**
 * 删除用户
 * @param id
 */
export const fetchDeleteUserAPI = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/acl/user/remove/${id}`,
  })
}

/**
 * 批量删除用户
 * @param idList
 */
export const fetchBatchDeleteUserAPI = (idList: number[]) => {
  return request({
    method: 'DELETE',
    url: '/acl/user/batchRemove',
    data: idList,
  })
}
