<script setup lang="ts">
import { fetchGetPermission, fetchRemovePermission } from '@/api/menu/index.ts'
import type { ModelMenu } from '@/types/menu'
import { ref } from 'vue'
import AddAndUpdatePermission from '@/views/Acl/Permission/components/addAndUpdatePermission.vue'
const tableData = ref<ModelMenu[]>([])
const mode = ref<'add' | 'update'>('add')
const currentRow = ref<ModelMenu>({})
const isShowDialog = ref<boolean>(false)

const getPermission = async () => {
  const { data } = await fetchGetPermission()
  tableData.value = data
}
getPermission()
const addPermission = (row: ModelMenu) => {
  mode.value = 'add'
  currentRow.value = row
  isShowDialog.value = true
}
const deletePermission = async (row: ModelMenu) => {
  await fetchRemovePermission(row.id!)
  await getPermission()
  ElMessage.success('删除成功')
}

const updatePermission = (row: ModelMenu) => {
  mode.value = 'update'
  currentRow.value = row
  isShowDialog.value = true
}
</script>

<template>
  <div>
    <el-table
      :expand-row-keys="['1']"
      :data="tableData"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="name" label="菜单名称" />

      <el-table-column prop="code" label="权限值" />

      <el-table-column prop="updateTime" label="修改时间" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            @click="addPermission(row)"
            v-if="row.level <= 3"
            size="small"
            type="success"
            >{{ row.level === 3 ? '添加功能' : '添加菜单' }}</el-button
          >
          <el-button size="small" @click="updatePermission(row)">编辑</el-button>
          <el-popconfirm title="确定要删除吗？" @confirm="deletePermission(row)">
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <add-and-update-permission
      @get-permission-list="getPermission"
      :mode="mode"
      :row="currentRow"
      v-model="isShowDialog"
    />
  </div>
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
