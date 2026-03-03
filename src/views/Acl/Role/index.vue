<script setup lang="ts">
import { ref } from 'vue'
import type { ModelRole } from '@/types/role'
import { fetchGetRoleList, fetchRemoveRole } from '@/api/role'
import UpdateAndAddRoleDialog from '@/types/user/components/UpdateAndAddRoleDialog.vue'
const roleName = ref('')
const roleList = ref<ModelRole[]>([])
// 添加的角色名称
const editRoleInfo = ref<ModelRole>({})
// 控制添加或者修改角色的弹窗变量
const isShowAddAndEditRoleDialog = ref(false)
const mode = ref<'add' | 'edit'>('add')

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
  roleList.value = data.records || []
  pagination.value.page = data.current || 1
  pagination.value.pageSize = data.size || 3
  pagination.value.pages = data.pages || 0
  pagination.value.total = data.total || 0
}
getRoleList(pagination.value.page, pagination.value.pageSize, roleName.value)

const handlePageChange = (page: number, pageSize: number) => {
  getRoleList(page, pageSize, roleName.value)
}

// 查询角色
const handleSearch = () => {
  getRoleList(1, pagination.value.pageSize, roleName.value)
}
// 重置查询输入框
const handleReset = () => {
  roleName.value = ''
  getRoleList(1, pagination.value.pageSize)
}
// 分配权限
const handleAssignPermission = () => {
  console.log('handleAssignPermission')
}
// 编辑
const handleEdit = (role: ModelRole) => {
  editRoleInfo.value = role
  isShowAddAndEditRoleDialog.value = true
  mode.value = 'edit'
}
// 删除
const handleDelete = async (row: ModelRole) => {
  await fetchRemoveRole(row.id!)
  await getRoleList(pagination.value.page, pagination.value.pageSize, roleName.value)
  ElMessage.success('删除成功')
}
// 添加角色
const handleAddRole = () => {
  isShowAddAndEditRoleDialog.value = true
  mode.value = 'add'
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
    <div class="mt-6! mb-5!">
      <el-button type="primary" @click="handleAddRole">添加</el-button>
    </div>
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
        <template #default="{ row }">
          <el-button type="success" size="small" icon="Setting" @click="handleAssignPermission"
            >分配权限</el-button
          >
          <el-button type="primary" size="small" icon="Edit" @click="handleEdit(row)"
            >编辑</el-button
          >
          <el-popconfirm title="确定要删除吗？" @confirm="handleDelete(row)">
            <template #reference>
              <el-button type="danger" size="small" icon="Delete">删除</el-button>
            </template>
          </el-popconfirm>
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
    <UpdateAndAddRoleDialog
      v-model="isShowAddAndEditRoleDialog"
      :mode="mode"
      :roleInfo="editRoleInfo"
      @updateRole="getRoleList(pagination.page, pagination.pageSize, roleName)"
    />
  </div>
</template>

<style scoped lang="sass"></style>
