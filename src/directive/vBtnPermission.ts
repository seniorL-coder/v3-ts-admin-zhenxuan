import { useUserStore } from '@/stores/user.ts'

export default {
  mounted(el: HTMLElement, binding: any) {
    const value = binding.value
    const userStore = useUserStore()
    if (!userStore.btnPermissions.includes(value)) {
      // 移除无权限的按钮
      el.parentNode?.removeChild(el)
    }
  },
}
