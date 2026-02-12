import { request } from '@/utils/request.ts'
import type { ResponseSpuList } from '@/types/SPU'

/**
 * 获取SPU分页列表
 * @param page
 * @param limit
 * @param category3Id
 */
export const fetchSpuList = (page: number, limit: number, category3Id: number) => {
  return request<ResponseSpuList>({
    url: `/product/${page}/${limit}`,
    method: 'get',
    params: {
      category3Id,
    },
  })
}
