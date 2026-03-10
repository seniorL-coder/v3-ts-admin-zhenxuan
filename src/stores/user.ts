import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchLoginAPI, fetchLogoutAPI, fetchUserInfoAPI } from '@/api/user'
import type { loginParamsType, UserInfoType } from '@/types/user'
import { useRouter, type RouteRecordRaw } from 'vue-router'
import { anyRoutes, asyncRoutes, constantRoutes } from '@/router/routes'
import { filterAsyncRoutes } from '@/utils/filterAsyncRoutes'

export const useUserStore = defineStore(
  'user',
  () => {
    const isFetched = ref(false) // 标志位：当前生命周期内是否已 addRoute
    const router = useRouter()
    const token = ref('')
    const userInfo = ref<UserInfoType>({} as UserInfoType)
    const menuRoutes = ref<RouteRecordRaw[]>([] as RouteRecordRaw[])
    // btn权限字段
    const btnPermissions = ref<string[]>([])
    // 菜单权限字段
    const routesPermissions = ref<string[]>([])
    const login = async (userInfo: loginParamsType) => {
      const res = await fetchLoginAPI(userInfo)
      token.value = res.data
      menuRoutes.value = constantRoutes
    }
    const getUserInfo = async () => {
      const res = await fetchUserInfoAPI()
      userInfo.value = res.data
      btnPermissions.value = res.data.buttons ?? []
      routesPermissions.value = res.data.routes ?? []
      // 调用过滤异步路由的方法，得到当前用户应该有的可访问的动态路由
      const targetAsyncRoutes = filterAsyncRoutes(asyncRoutes)
      // 将可访问的动态路由与常量路由进行合并
      // 如果兜底匹配的任意路由 在静态表里，刷新瞬间它会抢先匹配，导致你无论如何都会看到 404 页面。一定要将任意路由放在最后
      menuRoutes.value = constantRoutes.concat([...targetAsyncRoutes, ...anyRoutes])
      // ⭐ 注册动态路由 --- IGNORE ---
      targetAsyncRoutes.forEach((route) => {
        router.addRoute(route)
      })
      isFetched.value = true // 标记已 addRoute
    }
    // 删除token
    const logout = async () => {
      await fetchLogoutAPI()
      isFetched.value = false
      token.value = ''
      userInfo.value = {}
      menuRoutes.value = []
    }

    return {
      token,
      userInfo,
      menuRoutes,
      btnPermissions,
      routesPermissions,
      isFetched,
      login,
      getUserInfo,
      logout,
    }
  },
  {
    persist: {
      pick: ['token', 'userInfo', 'menuRoutes', 'btnPermissions', 'routesPermissions'],
    },
  },
)
