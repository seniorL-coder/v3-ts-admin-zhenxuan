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
