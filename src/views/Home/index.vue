<script setup lang="ts">
import { useUserStore } from '@/stores/user.ts'
import { getTimePeriod } from '@/utils/getTimePeriodUtlis.ts'
// import 'cesium/Build/Cesium/Widgets/widgets.css'

// import FlyCesium from '@/views/Home/components/flyCesium.vue'
const userStore = useUserStore()

const getUserInfo = async () => {
  await userStore.getUserInfo()
  ElNotification({
    title: userStore.userInfo.name,
    message: `欢迎回来! ${getTimePeriod(Date.now())}好!`,
    type: 'success',
  })
}
getUserInfo()
</script>
<template>
  <iframe class="iframe" src="http://117.72.157.194:81/" width="100%" />
</template>

<style scoped lang="sass">
.iframe
  height: calc(100vh - 150px)
.cesium-widget-credits
  display: none !important
</style>
