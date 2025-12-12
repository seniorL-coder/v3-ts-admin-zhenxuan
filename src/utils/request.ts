import axios, { type AxiosResponse } from 'axios'
import type { ApiResponse } from '@/types/apiResponse'
export const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000,
  withCredentials: true,
})

request.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  <T>(res: AxiosResponse<T>): T => {
    // 响应状态码判断
    if ((res.data as ApiResponse<unknown>).code === 200) {
      return res.data
    }
    ElMessage.error((res.data as ApiResponse<unknown>).message || '请求失败')
    // 其他情况也要返回Promise.reject以避免TypeScript错误
    throw res.data
  },
  async (error) => {
    console.log(error)
    if (error.status === 401) {
      // 登录失效
      ElMessage.error('登录失效，请重新登录')
      // 跳转登录页面
      // TODO

      return Promise.reject(error)
    }
    ElMessage.error(error?.message || '网络错误')
    return Promise.reject(error)
  },
)
