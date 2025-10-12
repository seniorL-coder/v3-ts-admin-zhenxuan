<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import { Icon } from '@iconify/vue'
defineProps(['userRoutes'])
// 工具方法：展开 layout 的 children
function flattenRoutes(routes: RouteRecordRaw[]) {
  return routes.flatMap((route) => {
    // 直接返回layout的 children
    return route.name === 'layout' && route.children ? route.children : route
  })
}
</script>
<script lang="ts">
export default {
  name: 'MyMenu'
}
</script>

<template>
  <el-menu 
  :default-active="$route.path" 
  background-color="#efefef" 
  router 
  :default-openeds="flattenRoutes(userRoutes).map(item => item.path)">
    <!-- 渲染无嵌套的路由    -->
    <template v-for="item in flattenRoutes(userRoutes)" :key="item.path">
      <el-menu-item
        v-if="!item.children && !item.meta?.hidden"
        :index="`${item.path}`"
      >
        <Icon class="menu-icon" :icon="item.meta?.Icon as string" />
        <span class="menu-title"> {{ item.meta?.title }} </span>
      </el-menu-item>
      <!-- 如果只有一个children -->
      <el-menu-item
        v-if="item.children && item.children.length === 1 && !item.meta?.hidden"
        :index="`${item.children[0].path}`"
      >
        <Icon class="menu-icon" :icon="item.children[0].meta?.Icon as string" />
        <span class="menu-title"> {{ item.children[0].meta?.title }} </span>
      </el-menu-item>
      <!--   渲染有children属性的路由 且 children 长度大于1  -->
      <el-sub-menu
        v-if="
          item.children?.length &&
          item.children?.length > 1 &&
          !item.meta?.hidden
        "
        :index="item.path"
        :key="item.path"
      >
        <template #title>
          <Icon class="menu-icon" :icon="item.meta?.Icon as string" />
          <span class="menu-title">{{ item.meta?.title }}</span></template
        >
        <!--  递归组件  -->
        <MyMenu :userRoutes="item.children" />
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<style scoped lang="scss">
.menu-title {
  padding: 0 1rem;
}
.menu-icon {
  font-size: 1.2rem;
  color: deepskyblue;
}
</style>
