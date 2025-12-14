<script setup lang="ts">
import { useUserStore } from '@/stores/user.ts'
import { getTimePeriod } from '@/utils/getTimePeriodUtlis.ts'
const userStore = useUserStore()

const getUserInfo = async () => {
  await userStore.getUserInfo()
  ElNotification({
    title: userStore.userInfo.name,
    message: `欢迎回来! ${getTimePeriod(Date.now())}好!`,
    type: 'success',
  })
}
// getUserInfo()
</script>
<template>
  <h1>Home</h1>
</template>

<style scoped lang="sass"></style>
