import { request } from '@/utils/request.ts'
import type { AttrAddAndEditInfoType, ModelAttrInfo, ModelGetCategory } from '@/types/attr'

/**
 * 获取一级分类接口
 */
export const fetchCategory1 = () => {
  return request<ModelGetCategory[]>({
    method: 'GET',
    url: '/product/getCategory1',
  })
}

/**
 * 获取二级分类接口
 */
export const fetchCategory2 = (category1Id: number) => {
  return request<ModelGetCategory[]>({
    method: 'GET',
    url: '/product/getCategory2/' + category1Id,
  })
}

/**
 * 获取三级分类接口
 * /admin/product/getCategory3/{id}
 */
export const fetchCategory3 = (category2Id: number) => {
  return request<ModelGetCategory[]>({
    method: 'GET',
    url: '/product/getCategory3/' + category2Id,
  })
}

/**
 * 获取分类下已有的属性与属性值接口
 * /product/attrInfoList/{c1Id}/{c2Id}/{c3Id}
 */
export const fetchAttrInfoList = (
  category1Id: number,
  category2Id: number,
  category3Id: number,
) => {
  return request<ModelAttrInfo[]>({
    method: 'GET',
    url: `/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
  })
}

/**
 * 添加或者修改已有的属性的接口
 * @param data
 */
export const saveAttrInfo = (data: AttrAddAndEditInfoType) => {
  return request({
    method: 'POST',
    url: '/product/saveAttrInfo',
    data,
  })
}
// 删除基础属性接口
// DELETE / admin / product / deleteAttr / { attrId }
export const deleteAttr = (attrId: number) => {
  return request({
    method: 'DELETE',
    url: '/product/deleteAttr/' + attrId,
  })
}
