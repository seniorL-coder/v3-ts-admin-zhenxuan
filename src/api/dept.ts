import { request } from '@/utils/request.ts'
import type { DeptItem } from '@/types/dept/dept'
import type { ApiResponse } from '@/types/apiResponse'

export const getDeptList = () => {
  return request<any, ApiResponse<DeptItem[]>>({
    method: 'GET',
    url: '/depts',
  })
}
