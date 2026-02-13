<script setup lang="ts">
import LogoConfig from '@/settings.ts'
import { useLayoutSeetingStore } from '@/stores/setting.ts'
const layoutSettingStore = useLayoutSeetingStore()
</script>

<template>
  <div class="logo flex items-center justify-center">
    <el-image
      fit="cover"
      :class="{ 'w-10': layoutSettingStore.isCollapse, 'w-15': !layoutSettingStore.isCollapse }"
      :src="LogoConfig.logo"
      alt="logo"
    />
    <h1
      class="font-bold uppercase ml-2! text-xl overflow-hidden"
      v-show="!layoutSettingStore.isCollapse"
    >
      {{ LogoConfig.title }}
    </h1>
  </div>
</template>

<style scoped lang="sass">
@use '@/styles/element/index.scss' as *
.logo
  height: $base-menu-logo-height
  min-width: 64px
  padding-top: 10px
  &>h1
    white-space: nowrap
</style>
