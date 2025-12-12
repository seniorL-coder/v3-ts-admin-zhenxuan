import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchLoginAPI, fetchUserInfoAPI } from '@/api/user'
import type { loginParamsType, UserInfoType } from '@/types/user'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const userInfo = ref<UserInfoType>({} as UserInfoType)

    const login = async (userInfo: loginParamsType) => {
      const res = await fetchLoginAPI(userInfo)
      token.value = res.data
    }
    const getUserInfo = async () => {
      const res = await fetchUserInfoAPI()
      userInfo.value = res.data
    }

    return {
      token,
      userInfo,
      login,
      getUserInfo,
    }
  },
  {
    persist: true,
  },
)
