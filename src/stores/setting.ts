import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLayoutSeetingStore = defineStore(
  'layoutSetting',
  () => {
    // 定义是否折叠的变量
    const isCollapse = ref(false)
    const refresh = ref(false)
    // 切换折叠状态
    const toggleCollapse = () => {
      isCollapse.value = !isCollapse.value
    }
    // 刷新页面
    const refreshPage = () => {
      refresh.value = !refresh.value
    }
    return {
      isCollapse,
      toggleCollapse,
      refresh,
      refreshPage,
    }
  },
  // {
  //   persist: true,
  // },
)
