import { request } from '@/utils/request.ts'
import type {
  loginParamsType,
  ModelResponseToAssignRole,
  ModelResponseUser,
  UserInfoType,
} from '@/types/user'
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

/**
 * 新增用户
 * @param data
 */
export const fetchSaveUserAPI = (data: { username: string; name: string }) => {
  return request({
    method: 'POST',
    url: '/acl/user/save',
    data,
  })
}

/**
 * 获取所有角色列表和用户已有角色
 * @param id
 */
export const fetchAllRolesAndUserRolesAPI = (id: number) => {
  return request<ModelResponseToAssignRole>({
    method: 'GET',
    url: `/acl/user/toAssign/${id}`,
  })
}
/**
 * 为用户分配角色
 * @param data
 */
export const fetchAssignRolesAPI = (data: { userId: number; roleIdList: number[] }) => {
  return request({
    method: 'POST',
    url: '/acl/user/doAssignRole',
    data,
  })
}
