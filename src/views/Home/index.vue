<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
// 进入页面就获取用户信息
const getUserInfo = async () => {
  await userStore.setUserInfo()
}
getUserInfo()
</script>
<template>
  <div class="home">我是home, 数据总览 dashboard (指标 +图表)</div>
  <SvgIcon name="lock" color="skyblue" />
  <el-image
    :src="userStore.userInfo?.checkUser.avatar"
    style="width: 50px; height: 50px"
  />
</template>

<style lang="scss" scoped>
//@use '@/styles/variable.scss' as *; // 使用 * 来导入所有变量
//
//.home {
//  color: $color-primary;
//}
</style>
