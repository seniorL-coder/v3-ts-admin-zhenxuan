<script setup lang="ts">
import { useUserStore } from '@/stores/user.ts'
import { getTimePeriod } from '@/utils/getTimePeriodUtlis.ts'
import { watch } from 'vue'
// import 'cesium/Build/Cesium/Widgets/widgets.css'

// import FlyCesium from '@/views/Home/components/flyCesium.vue'
const userStore = useUserStore()
watch(
  () => userStore.userInfo.name,
  (name) => {
    if (!name) return

    ElNotification({
      title: name,
      message: `欢迎回来！${getTimePeriod(Date.now())}好！`,
      type: 'success',
    })
  },
)
</script>
<template>
  <!-- 首页内容 -->
  <div class="home-main">
    <el-row class="welcome-row" justify="center" align="top">
      <el-col :span="12" class="welcome-column">
        <div class="welcome-card">
          <h2 class="welcome-title">欢迎回来，{{ userStore.userInfo.name }}！</h2>
          <p class="welcome-message">很高兴你访问系统！祝你操作愉快。</p>
          <p class="footer-message">如果需要帮助，请随时联系我们！</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="sass">
.home-main
  padding: 50px
  background-color: #f4f7fc
  width: 100%
  height: calc(100vh - 10em)
  background-image: url("@/assets/images/welcome.png")
  background-size: cover

.welcome-row
  min-height: 400px

.welcome-column
  text-align: center

.welcome-card
  background-color: white
  padding: 40px
  border-radius: 10px
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1)

.welcome-title
  font-size: 24px;
  color: #409eff;
  margin-bottom: 20px;

.welcome-message
  font-size: 16px;
  color: #606266;
  margin-bottom: 30px;

.footer-message
  font-size: 14px;
  color: #909399;
  margin-top: 20px;
</style>
