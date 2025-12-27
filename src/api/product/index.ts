import { request } from '@/utils/request.ts'
import type { FetchTrademarkParams, ModelTrademark } from '@/types/trademark'
import type { ApiResponsePageLimit } from '@/types/apiResponse'

/**
 * 获取所有品牌列表
 * /product/baseTrademark/getTrademarkList
 */
export const fetchTrademarkList = (params: FetchTrademarkParams) => {
  return request<ApiResponsePageLimit<ModelTrademark>>({
    method: 'GET',
    url: `/product/baseTrademark/${params.page}/${params.limit}`,
  })
}

/**
 * 更新品牌
 * /product/baseTrademark/update
 */
export const fetchUpdateTrademark = (data: ModelTrademark) => {
  return request<null>({
    method: 'PUT',
    url: '/product/baseTrademark/update',
    data,
  })
}

/**
 * 删除 品牌
 * /product/baseTrademark/remove/{id}
 */
export const fetchRemoveTrademark = (id: number) => {
  return request<null>({
    method: 'DELETE',
    url: `/product/baseTrademark/remove/${id}`,
  })
}
