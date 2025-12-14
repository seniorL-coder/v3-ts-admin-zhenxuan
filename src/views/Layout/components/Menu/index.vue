<script setup lang="ts">
defineOptions({
  name: 'menu-component',
})
const { menuList } = defineProps(['menuList'])
console.log(menuList)
</script>

<template>
  <template v-for="item in menuList" :key="item.path">
    <template v-if="!item.children && !item.meta.hidden">
      <el-menu-item :index="item.path">
        <el-icon><component :is="item.meta.icon" /></el-icon>
        <template #title>
          <span> {{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <template v-else-if="item.children?.length === 1 && !item.meta.hidden">
      <menu-component :menu-list="item.children" />
    </template>
    <template v-else-if="item.children?.length > 1 && !item.meta.hidden">
      <el-sub-menu :index="item.path">
        <template #title>
          <el-icon><component :is="item.meta.icon" /></el-icon>
          <span> {{ item.meta.title }}</span>
        </template>
        <menu-component :menu-list="item.children" />
      </el-sub-menu>
    </template>
  </template>
</template>

<style scoped lang="sass">
@use '@/styles/element/index.scss' as *
.el-menu-item
  color: $base-menu-text-color
  background-color: $base-menu-bg-color
  &:hover
    background-color: $base-menu-hover-bg-color
    color: $base-menu-hover-text-color


:deep(.el-sub-menu__title)
  color: $base-menu-text-color
  background-color: $base-menu-bg-color
  &:hover
    background-color: $base-menu-hover-bg-color
</style>
