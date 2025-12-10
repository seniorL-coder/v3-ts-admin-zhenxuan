import { request } from '@/utils/request.ts'
import type { loginResUserInfoType, loginUserInfoType } from '@/types/user/user'
import type { ApiResponse } from '@/types/apiResponse'

export const login = (userinfo: loginUserInfoType) => {
  return request<loginUserInfoType, ApiResponse<loginResUserInfoType>>({
    method: 'POST',
    url: '/login',
    data: userinfo,
  })
}
