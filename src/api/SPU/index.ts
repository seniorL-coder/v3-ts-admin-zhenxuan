import { request } from '@/utils/request.ts'
import type { ModelSaleAttr, ModelSpuImage, ModelSpuSaleAttr, ResponseSpuList } from '@/types/SPU'
import type { ModelTrademark } from '@/types/trademark'

/**
 * 获取SPU分页列表
 * @param page
 * @param limit
 * @param category3Id
 */
export const fetchSpuList = (page: number, limit: number, category3Id: number) => {
  return request<ResponseSpuList>({
    url: `/product/${page}/${limit}`,
    method: 'GET',
    params: {
      category3Id,
    },
  })
}

/**
 * 获取所有品牌列表
 */
export const fetchTrademarkList = () => {
  return request<ModelTrademark[]>({
    url: '/product/baseTrademark/getTrademarkList',
    method: 'GET',
  })
}
// 获取商品图片列表接口
// GET / admin / product / spuImageList / { id }
export const fetchSpuImageList = (id: number) => {
  return request<ModelSpuImage[]>({
    url: `/product/spuImageList/${id}`,
    method: 'GET',
  })
}

/**
 * 获取所有销售列表
 */
export const fetchBaseSaleAttrList = () => {
  return request<ModelSaleAttr[]>({
    url: '/product/baseSaleAttrList',
    method: 'GET',
  })
}

/**
 * 获取商品销售属性列表
 * @param id
 */
export const fetchSpuSaleAttrList = (id: number) => {
  return request<ModelSpuSaleAttr[]>({
    url: `/product/spuSaleAttrList/${id}`,
    method: 'GET',
  })
}

/**
 * 新增SPU信息
 * @param data
 */
export const fetchSaveSpuInfo = (data: any) => {
  return request({
    url: '/product/saveSpuInfo',
    method: 'POST',
    data,
  })
}

/**
 * 更新SPU信息
 */
export const fetchUpdateSpuInfo = (data: any) => {
  return request({
    url: '/product/updateSpuInfo',
    method: 'POST',
    data,
  })
}
