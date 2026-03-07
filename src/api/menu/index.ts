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

/**
 * 新增菜单
 * @param data
 */
export const fetchAddPermission = (data: ModelMenu) => {
  return request<ModelMenu, any>({
    method: 'POST',
    url: '/acl/permission/save',
    data,
  })
}

/**
 * 更新菜单
 * @param data
 */
export const fetchUpdatePermission = (data: ModelMenu) => {
  return request<ModelMenu, any>({
    method: 'PUT',
    url: '/acl/permission/update',
    data,
  })
}
