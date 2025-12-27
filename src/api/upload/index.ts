import { request } from '@/utils/request.ts'

/**
 * 上传图片
 * /product/fileUpload
 */
export const fetchUploadImage = (data: FormData) => {
  return request<string>({
    url: '/product/fileUpload',
    method: 'post',
    data,
  })
}
