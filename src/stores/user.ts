import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchLoginAPI } from '@/api/user'
import type { loginParamsType } from '@/types/user/login'

export const useUserStore = defineStore('user', () => {
  const token = ref('')

  const login = async (userInfo: loginParamsType) => {
    const res = await fetchLoginAPI(userInfo)
    token.value = res.data
  }

  return {
    token,
    login,
  }
})
