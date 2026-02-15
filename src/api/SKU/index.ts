// 新增SKU接口
// POST
// /admin/product/saveSkuInfo
import { request } from '@/utils/request'
import type { SkuInfo } from '@/types/SKU'
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
