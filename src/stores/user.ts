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
    // 重点：重置路由的方法
    const resetRouter = () => {
      // 移除所有动态添加的路由
      // 注意：如果你的动态路由有 name，可以通过 name 移除
      router.getRoutes().forEach((route) => {
        const { name } = route
        // 如果该路由不在静态路由表中，且有 name，则删除它
        if (name && !constantRoutes.find((r) => r.name === name)) {
          router.removeRoute(name)
        }
      })
    }

    // 删除token
    const logout = async () => {
      await fetchLogoutAPI()
      // 清理 Pinia (这里要确保 isFetched 重置为 false)
      isFetched.value = false
      resetRouter()
      token.value = ''
      userInfo.value = {}
      menuRoutes.value = constantRoutes
      btnPermissions.value = []
      routesPermissions.value = []
      // 彻底清理：直接跳转并让浏览器刷新
      window.location.href = '/nova/login'
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
