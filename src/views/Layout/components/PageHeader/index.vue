<script setup lang="ts">
import { useLayoutSeetingStore } from '@/stores/setting'
import { useUserStore } from '@/stores/user.ts'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const layoutSettingStore = useLayoutSeetingStore()
const userStore = useUserStore()
const handleCommand = async (command: string) => {
  if (command === 'logout') {
    await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    await userStore.logout()
    const redirect = route.fullPath
    router.replace({ path: '/login', query: { redirect: redirect } })
    ElMessage.success('退出成功')
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
        <el-avatar :src="userStore.userInfo.avatar" class="mr-2! ml-2!" />
        <el-dropdown @command="handleCommand">
          <span>
            {{ userStore.userInfo.name }}
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
