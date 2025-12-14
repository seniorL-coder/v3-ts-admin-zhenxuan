<script setup lang="ts">
import { useLayoutSeetingStore } from '@/stores/setting'
const layoutSettingStore = useLayoutSeetingStore()
const handleCommand = async (command: string) => {
  if (command === 'logout') {
    await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
  }
}
// 折叠切换
const handleCollapse = () => {
  layoutSettingStore.toggleCollapse()
}
// 刷新
const handleRefresh = () => {
  layoutSettingStore.refreshPage()
}

// 全屏
const handleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}
</script>

<template>
  <el-page-header
    title=" "
    @back="handleCollapse"
    :icon="layoutSettingStore.isCollapse ? 'Fold' : 'Expand'"
  >
    <template #content>
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item
          v-for="item in $route.matched"
          v-show="item.meta.title"
          :key="item.path"
          :to="item.path"
        >
          <el-icon><component :is="item.meta.icon" /></el-icon>
          <span class="ml-1!">{{ item.meta.title }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </template>
    <template #extra>
      <div class="flex items-center">
        <el-button size="small" icon="Refresh" @click="handleRefresh" />
        <el-button size="small" icon="FullScreen" @click="handleFullScreen" />
        <el-button size="small" icon="Setting" />
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <el-dropdown @command="handleCommand">
          <span>
            admin
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="logout"> 退出登录 </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </template>
  </el-page-header>
</template>

<style scoped lang="sass">
:deep(.el-breadcrumb__inner)
  display: flex
  align-items: center
  justify-content: center
</style>
