<script setup lang="ts">
import bg_img from '@/assets/images/background-img.svg'
import { MotionComponent } from '@vueuse/motion'

/**
 * 左侧滑入 → 刹车 → 轻微回弹 → 停止
 */
const cardMotion = {
  initial: {
    x: 500, // 初始在右侧
    opacity: 0,
  },
  enter: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      easing: 'ease-out',
      type: 'spring', // 弹性刹车
      stiffness: 300, // 越大越明显
      damping: 15, // 阻尼越小，弹性越明显
    },
  },
}
</script>

<template>
  <div class="w-full h-full overflow-hidden">
    <el-row class="h-full bg-blue-400" align="middle">
      <el-col :span="12"><el-image :src="bg_img" /></el-col>
      <el-col :span="9" :offset="3" class="form_container">
        <motion-component v-motion="cardMotion">
          <el-card class="w-100">
            <template #header>
              <h1 class="text-3xl">欢迎来到</h1>
              <div>Vue3 + TypeScript Admin</div>
            </template>
            <el-form>
              <el-form-item label="用户名: " label-width="60px" label-position="left">
                <el-input placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码: " label-width="60px" label-position="left">
                <el-input placeholder="请输入密码" type="password"></el-input>
              </el-form-item>
            </el-form>
            <el-row>
              <el-col :span="12" class="!flex justify-center items-center">
                <el-button type="primary">登录</el-button>
              </el-col>
              <el-col :span="12" align="center">
                <el-button type="warning">重置</el-button>
              </el-col>
            </el-row>
          </el-card></motion-component
        >
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="sass">
.form_container
  background-image: url("/public/favicon.ico")
  background-position: top right
</style>
