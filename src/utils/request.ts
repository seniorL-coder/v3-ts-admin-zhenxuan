import axios, { type AxiosResponse } from 'axios'
import type { ApiResponse } from '@/types/apiResponse'
import { useUserStore } from '@/stores/user.ts'
import { storeToRefs } from 'pinia'
import router from '@/router'
import Nprogress from 'nprogress'

export const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000,
  withCredentials: true,
})

request.interceptors.request.use(
  (config) => {
    Nprogress.start()
    const { token } = storeToRefs(useUserStore())
    if (token.value) {
      config.headers.token = token.value
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  <T>(res: AxiosResponse<T>): T => {
    const response = res.data as unknown as ApiResponse<unknown>
    Nprogress.done()
    switch (response.code) {
      case 200:
        // 请求成功

        return res.data
      case 206:
      case 207:
        // 登录失效或无权限
        ElMessage.error('登录失效，请重新登录')
        router.push('/login')
        throw response
      case 201:
        ElMessage.error(response.message || '请求参数错误')
        throw response
      case 202:
        ElMessage.error(response.message || '用户名已存在')
        throw response
      case 203:
        ElMessage.error(response.message || '用户名不存在')
        throw response
      case 204:
        ElMessage.error(response.message || '用户名或密码错误')
        throw response
      case 205:
        ElMessage.error(response.message || '服务繁忙，请稍后重试')
        throw response
      case 208:
        ElMessage.error(response.message || '该节点下有子节点，不可删除')
        throw response
      default:
        ElMessage.error(response.message || '请求失败')
        throw response
    }
  },
  async (error) => {
    // 网络或服务器错误
    const status = error?.response?.status
    if (status === 401) {
      ElMessage.error('登录失效，请重新登录')
      router.push('/login')
      return Promise.reject(error)
    }
    ElMessage.error(error?.message || '网络错误')
    return Promise.reject(error)
  },
)
