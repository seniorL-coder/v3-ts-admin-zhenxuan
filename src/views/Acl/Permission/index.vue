<script setup lang="ts">
import { fetchGetPermission } from '@/api/menu/index.ts'
import type { ModelMenu } from '@/types/menu'
import { ref } from 'vue'
const tableData = ref<ModelMenu[]>([])

const getPermission = async () => {
  const { data } = await fetchGetPermission()
  tableData.value = data
}
getPermission()
</script>

<template>
  <el-table :data="tableData" row-key="id" border :tree-props="{ children: 'children' }">
    <el-table-column prop="name" label="菜单名称" />

    <el-table-column prop="code" label="权限值" />

    <el-table-column prop="updateTime" label="修改时间" />
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button size="small" type="success">{{
          row.level === 4 ? '添加功能' : '添加菜单'
        }}</el-button>
        <el-button size="small">编辑</el-button>
        <el-button size="small" type="danger">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style lang="sass" scoped>
:deep(.el-table__row)
  animation: tableRowEnter 0.25s cubic-bezier(.25,.8,.25,1)
  transform-origin: top

@keyframes tableRowEnter
  0%
    opacity: 0
    transform: translateY(-12px) scaleY(.96)

  60%
    opacity: 0.9
    transform: translateY(2px) scaleY(1.01)

  100%
    opacity: 1
    transform: translateY(0) scaleY(1)
</style>
