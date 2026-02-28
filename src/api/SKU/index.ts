// 新增SKU接口
// POST
// /admin/product/saveSkuInfo
import { request } from '@/utils/request'
import type { ModelSpuImage, SkuInfo } from '@/types/SKU'
import type { ApiResponsePageLimit } from '@/types/apiResponse'
/**
 * 新增SKU接口
 * @param data
 * @returns
 */
export const fetchSaveSkuInfo = (data: SkuInfo) => {
  return request({
    url: '/product/saveSkuInfo',
    method: 'POST',
    data,
  })
}

/**
 * 根据 SPU ID 查询 SKU 接口
 * @param spuId
 */
export const fetchSkuInfoBySpuId = (spuId: number) => {
  return request<SkuInfo[]>({
    url: `/product/findBySpuId/${spuId}`,
    method: 'GET',
  })
}

/**
 * 获取SKU分页列表
 * @param page
 * @param limit
 */
export const fetchSkuIListPageLimit = (page: number, limit: number) => {
  return request<ApiResponsePageLimit<SkuInfo>>({
    url: `/product/list/${page}/${limit}`,
    method: 'GET',
  })
}

/**
 * 根据SKU ID 查询SKU信息
 * @param skuId
 */
export const fetchSkuDetailInfo = (skuId: number) => {
  return request<SkuInfo>({
    url: `/product/getSkuInfo/${skuId}`,
    method: 'GET',
  })
}

/**
 * 上架SKU接口
 * @param skuId
 */
export const fetchOnSale = (skuId: number) => {
  return request({
    url: `/product/onSale/${skuId}`,
    method: 'GET',
  })
}

/**
 * 下架SKU接口
 * @param skuId
 */
export const fetchCancelSale = (skuId: number) => {
  return request({
    url: `/product/cancelSale/${skuId}`,
    method: 'GET',
  })
}

/**
 * 删除SKU接口
 * @param skuId
 */
export const fetchDeleteSku = (skuId: number) => {
  return request({
    url: `/product/deleteSku/${skuId}`,
    method: 'DELETE',
  })
}
