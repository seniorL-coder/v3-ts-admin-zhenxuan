<script setup lang="ts">
import { ref } from 'vue'
import type { ModelRole } from '@/types/role'
import { fetchGetRoleList } from '@/api/role'
const roleName = ref('')
const roleList = ref<ModelRole[]>([])
const pagination = ref({
  page: 1,
  pageSize: 3,
  pages: 0,
  pageSizes: [3, 5, 10, 15],
  total: 0,
})
// 获取角色列表
const getRoleList = async (page: number, pageSize: number, roleName?: string) => {
  const { data } = await fetchGetRoleList(page, pageSize, roleName)
  console.log(data)
  roleList.value = data.records || []
  pagination.value.page = data.current || 1
  pagination.value.pageSize = data.size || 3
  pagination.value.pages = data.pages || 0
  pagination.value.total = data.total || 0
}
getRoleList(pagination.value.page, pagination.value.pageSize, roleName.value)

const handlePageChange = (page: number, pageSize: number) => {
  console.log('handlePageChange', page, pageSize)
  getRoleList(page, pageSize)
}

// 查询角色
const handleSearch = () => {
  console.log('handleSearch')
}
// 重置查询输入框
const handleReset = () => {
  roleName.value = ''
}
// 分配权限
const handleAssignPermission = () => {
  console.log('handleAssignPermission')
}
// 编辑
const handleEdit = () => {
  console.log('handleEdit')
}
// 删除
const handleDelete = () => {
  console.log('handleDelete')
}
</script>

<template>
  <div>
    <el-card class="h-18">
      <el-form class="flex">
        <el-form-item label="角色名: ">
          <el-input v-model="roleName" placeholder="请输入角色名" />
        </el-form-item>
        <el-form-item class="ml-auto! mr-15!">
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="mt-5!">
      <el-table :data="roleList" border stripe>
        <el-table-column align="center" label="序号" width="60">
          <template #default="{ $index }">
            {{ $index + 1 + (pagination.page - 1) * pagination.pageSize }}
          </template>
        </el-table-column>
        <el-table-column prop="id" align="center" label="角色ID" width="150" />
        <el-table-column prop="roleName" align="center" label="角色名称" width="200" />
        <el-table-column prop="createTime" align="center" label="创建时间" width="200" />
        <el-table-column prop="updateTime" align="center" label="更新时间" width="200" />
        <el-table-column align="center" label="操作">
          <template #default>
            <el-button type="success" size="small" icon="Setting" @click="handleAssignPermission"
              >分配权限</el-button
            >
            <el-button type="primary" size="small" icon="Edit" @click="handleEdit">编辑</el-button>
            <el-button type="danger" size="small" icon="Delete" @click="handleDelete"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="mt-2!"
        background
        @change="handlePageChange"
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.pageSize"
        :page-sizes="pagination.pageSizes"
        :total="pagination.total"
        layout="prev, pager, jumper, next,->,sizes, total"
      />
    </el-card>
  </div>
</template>

<style scoped lang="sass"></style>
