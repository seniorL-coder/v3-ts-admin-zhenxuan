<script setup lang="ts">
import { ref } from 'vue'
import type { ModelMenu, ModelRole } from '@/types/role'
import {
  fetchGetRoleList,
  fetchGetRolePermission,
  fetchRemoveRole,
  fetchSaveRolePermission,
} from '@/api/role'
import UpdateAndAddRoleDialog from '@/types/user/components/UpdateAndAddRoleDialog.vue'
import type { TreeInstance } from 'element-plus'

const loading = ref(true)
const roleName = ref('')
const roleList = ref<ModelRole[]>([])
// 添加的角色名称
const editRoleInfo = ref<ModelRole>({})
// 控制添加或者修改角色的弹窗变量
const isShowAddAndEditRoleDialog = ref(false)
const mode = ref<'add' | 'edit'>('add')
// 控制分配权限的抽屉显示与隐藏的变量
const isShowAssignPermission = ref(false)
const treeData = ref<ModelMenu[]>([])
const assignRoleInfo = ref<ModelRole>({})
const defaultCheckedKeys = ref<number[]>([])

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
// 辅助方法, 用于过滤出已经分配的权限id
const filterCheckedKeys = (data: ModelMenu[]) => {
  data.forEach((item) => {
    if (item.children && item.children.length > 0) {
      filterCheckedKeys(item.children)
    } else {
      item.select && defaultCheckedKeys.value.push(item.id!)
    }
  })
}

// 分配权限
const handleAssignPermission = async (row: ModelRole) => {
  assignRoleInfo.value = row
  isShowAssignPermission.value = true
  const { data } = await fetchGetRolePermission(row.id!)
  treeData.value = data
  filterCheckedKeys(data)
  loading.value = false
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
const treeRef = ref<TreeInstance>()

const getCheckedKeys = async () => {
  // 所有被完全选中的节点
  const checkedKeys = treeRef.value!.getCheckedKeys(false)
  // 所有被半选中的节点
  const halfCheckedIds = treeRef.value!.getHalfCheckedKeys()
  // 所有被选中的节点（包括半选中的节点）
  const allCheckedKeys = [...checkedKeys, ...halfCheckedIds] as number[]
  await fetchSaveRolePermission({
    roleId: assignRoleInfo.value.id!,
    permissionIds: allCheckedKeys,
  })
  isShowAssignPermission.value = false
  ElMessage.success('分配权限成功')
}

// const resetChecked = () => {
//   treeRef.value!.setCheckedKeys([], false)
// }

const defaultProps = {
  children: 'children',
  label: 'name',
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
          <el-button type="success" size="small" icon="Setting" @click="handleAssignPermission(row)"
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
    <el-drawer v-model="isShowAssignPermission">
      <template #title>
        <div>
          当前分配权限角色:
          <span class="ml-1! text-blue-500 font-bold">{{ assignRoleInfo.roleName }}</span>
        </div>
        <el-button class="mr-8!" size="small" @click="getCheckedKeys" type="success"
          >确认</el-button
        >
      </template>
      <el-tree
        v-loading="loading"
        ref="treeRef"
        style="max-width: 600px"
        :data="treeData"
        show-checkbox
        default-expand-all
        node-key="id"
        highlight-current
        :props="defaultProps"
        :default-checked-keys="defaultCheckedKeys"
      />
    </el-drawer>
  </div>
</template>

<style scoped lang="sass"></style>
