import { useUserStore } from '@/stores/user'
import type { RouteRecordRaw } from 'vue-router'
// import { debounce } from 'radash'

// 过滤异步路由
export const filterAsyncRoutes = (asyncRoutes: RouteRecordRaw[]) => {
  const userStore = useUserStore()
  const filterResult: RouteRecordRaw[] = []
  asyncRoutes.filter((item) => {
    if (userStore.routesPermissions.includes(item.name as string)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoutes(item.children)
      }
      filterResult.push(item)
    }
  })
  return filterResult
}
