<script setup lang="ts">
import { MotionComponent } from '@vueuse/motion'
import Logo from '@/views/Layout/components/Logo/index.vue'

const cardMotion = {
  initial: {
    x: '100%', // 初始在右侧
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
  <el-container>
    <el-aside class="aside-nav">
      <Logo />
      <el-scrollbar class="scrollBar">
        <p v-for="i in 100">{{ i }}</p>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header><el-card>头部</el-card></el-header>
      <el-main>
        <el-card>
          <motion-component v-motion="cardMotion">
            <div class="content bg-blue-400">main</div>
          </motion-component>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="sass">
@use "@/styles/variable.scss" as *
.aside-nav
  height: 100vh
  width: $base-menu-width
  background-color: $base-menu-background
  color: $color
.scrollBar
  height: calc(100vh - $base-menu-logo-height)
</style>
