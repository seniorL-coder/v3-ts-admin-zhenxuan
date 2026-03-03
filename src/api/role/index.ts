import { request } from '@/utils/request.ts'
import type { ApiResponsePageLimit } from '@/types/apiResponse'
import type { ModelRole } from '@/types/role'

/**
 * 获取角色分页列表
 * @param page 当前页码
 * @param limit 每页记录数
 * @param roleName 角色名 可选
 */
export const fetchGetRoleList = (page: number, limit: number, roleName?: string) => {
  return request<ApiResponsePageLimit<ModelRole>>({
    url: `/acl/role/${page}/${limit}`,
    method: 'GET',
    params: {
      roleName,
    },
  })
}

/**
 * 新增角色
 * @param data
 */
export const fetchSaveRole = (data: { roleName: string; remark?: string }) => {
  return request({
    url: '/acl/role/save',
    method: 'POST',
    data,
  })
}
/**
 * 更新角色
 * @param data
 */
export const fetchUpdateRole = (data: { id: number; roleName: string; remark?: string }) => {
  return request({
    url: '/acl/role/update',
    method: 'PUT',
    data,
  })
}
// 删除角色接口
export const fetchRemoveRole = (id: number) => {
  return request({
    url: `/acl/role/remove/${id}`,
    method: 'DELETE',
  })
}
