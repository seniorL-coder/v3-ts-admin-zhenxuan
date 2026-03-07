import { request } from '@/utils/request.ts'
import type { ModelMenu } from '@/types/menu'

/**
 * 获取菜单列表
 */
export const fetchGetPermission = () => {
  return request<ModelMenu[]>({
    method: 'GET',
    url: '/acl/permission',
  })
}
