<script setup lang="ts">
import LogoConfig from '@/settings.ts'
</script>

<template>
  <div class="logo flex items-center justify-around">
    <el-image fit="cover" class="w-20" :src="LogoConfig.logo" alt="logo" />
    <h1>{{ LogoConfig.title }}</h1>
  </div>
</template>

<style scoped lang="sass">
@use '@/styles/variable.scss' as *
.logo
  height: $base-menu-logo-height
  padding-top: 10px
</style>
