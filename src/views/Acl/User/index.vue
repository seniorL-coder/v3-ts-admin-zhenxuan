<script setup lang="ts">
import { ref } from 'vue'
import {
  fetchAllRolesAndUserRolesAPI,
  fetchAssignRolesAPI,
  fetchBatchDeleteUserAPI,
  fetchDeleteUserAPI,
  fetchUserListAPI,
} from '@/api/user'
import type { ModelResponseUser, ModelRole } from '@/types/user'
import UpdateUsernameDialog from '@/views/Acl/User/components/UpdateUsernameDialog.vue'
import type { CheckboxValueType } from 'element-plus'
const updateUser = ref({ id: 0, username: '', name: '' })
const isVisibleUpdateUserDialog = ref(false)
const ids = ref<number[]>([])
const isShowAssignRoleDrawer = ref(false)
const checkAll = ref(false)
const isIndeterminate = ref(false)
// 所有的角色列表
const allRoles = ref<ModelRole[]>([])
// 用户的角色列表
const userRoles = ref<number[]>([])

const pagination = ref({
  page: 1,
  pageSize: 3,
  pages: 0,
  pageSizes: [3, 5, 10, 15],
  total: 0,
})
const username = ref('')
const userList = ref<ModelResponseUser[]>([])
// 分页获取用户列表
const getUserList = async (page: number, pageSize: number, username?: string) => {
  const { data } = await fetchUserListAPI(page, pageSize, username)
  userList.value = data.records || []
  pagination.value.total = data.total || 0
  pagination.value.pages = data.pages || 0
  pagination.value.page = data.current || 1
  pagination.value.pageSize = data.size || 0
}
getUserList(1, 3, username.value)

/**
 * 处理分页变化
 * @param page
 * @param pageSize
 */
const handlePageChange = (page: number, pageSize: number) => {
  getUserList(page, pageSize, username.value)
}
/**
 * 修改用户信息
 * @param user
 */
const handleUpdateUser = (user: ModelResponseUser) => {
  updateUser.value = { id: user.id!, username: user.username!, name: user.name! }
  isVisibleUpdateUserDialog.value = true
}
/**
 * 添加用户
 */
const handleAddUser = () => {
  isVisibleUpdateUserDialog.value = true
  updateUser.value = { id: 0, username: '', name: '' }
}
/**
 * 删除用户
 * @param user
 */
const handleDeleteUser = async (user: ModelResponseUser) => {
  await fetchDeleteUserAPI(user.id!)
  await getUserList(pagination.value.page, pagination.value.pageSize, username.value)
  ElMessage.success('删除成功')
}
/**
 * 处理选中行变化
 * @param selection
 */
const handleSelectionChange = async (selection: ModelResponseUser[]) => {
  ids.value = selection.map((item) => item.id!)
}
/**
 * 批量删除用户
 */
const handleBatchDeleteUser = async () => {
  if (ids.value.length === 0) {
    ElMessage.warning('请至少选择一个用户进行删除')
    return
  }
  await fetchBatchDeleteUserAPI(ids.value)
  // 边界判断，如果删除的是最后一页的数据, page - 1
  if (pagination.value.page === 1) pagination.value.page = 1
  else if (
    pagination.value.page === pagination.value.pages &&
    ids.value.length === userList.value.length
  ) {
    pagination.value.page -= 1
  }
  await getUserList(pagination.value.page, pagination.value.pageSize, username.value)
  ElMessage.success('删除成功')
}
// 获取所有角色列表 和 用户的角色列表
const getAllRolesAndUserRoles = async (id: number) => {
  const { data } = await fetchAllRolesAndUserRolesAPI(id)
  allRoles.value = data.allRolesList!
  userRoles.value = data.assignRoles?.map((item: ModelRole) => item.id!) || []
  checkAll.value = userRoles.value.length === allRoles.value.length
}

const handleAssignRole = (user: ModelResponseUser) => {
  isShowAssignRoleDrawer.value = true
  updateUser.value = { id: user.id!, username: user.username!, name: user.name! }
  getAllRolesAndUserRoles(user.id!)
}
// 处理全选变化
const handleCheckAllChange = (val: CheckboxValueType) => {
  userRoles.value = val ? allRoles.value.map((item) => item.id!) : []
  isIndeterminate.value = false
}
// 处理选中角色变化
const handleCheckedRolesChange = (val: CheckboxValueType[]) => {
  isIndeterminate.value = !(val.length === allRoles.value.length)
}
// 提交分配角色
const handleSubmitAssignRole = async () => {
  await fetchAssignRolesAPI({ userId: updateUser.value.id!, roleIdList: userRoles.value })
  await getUserList(pagination.value.page, pagination.value.pageSize, username.value)
  ElMessage.success('分配角色成功')
  isShowAssignRoleDrawer.value = false
}
// 处理搜索
const handleSearch = () => {
  getUserList(1, pagination.value.pageSize, username.value)
}
const handleReset = () => {
  username.value = ''
  getUserList(1, pagination.value.pageSize)
}
</script>
<template>
  <div>
    <el-card class="h-18">
      <el-form class="flex">
        <el-form-item label="用户名: ">
          <el-input v-model="username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item class="ml-auto! mr-15!">
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="mt-6!">
      <el-button v-btn-permission="'btn.User.add'" type="primary" @click="handleAddUser"
        >添加</el-button
      >
      <el-popconfirm title="确定要删除吗？" @confirm="handleBatchDeleteUser">
        <template #reference>
          <el-button type="danger" :disabled="!ids.length">批量删除</el-button>
        </template>
      </el-popconfirm>
    </div>
    <el-table
      :max-height="500"
      class="mt-5!"
      :data="userList || []"
      border
      stripe
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" type="selection" width="55" fixed="left" />
      <el-table-column align="center" label="序号" width="55">
        <template #default="{ $index }">
          {{ (pagination.page - 1) * pagination.pageSize + $index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="ID" width="180" prop="id" />
      <el-table-column align="center" label="用户名" prop="username" width="180" />
      <el-table-column
        align="center"
        label="用户昵称"
        prop="name"
        width="180"
        show-overflow-tooltip
      />
      <el-table-column align="center" label="用户角色" prop="roleName" width="150" />
      <el-table-column align="center" label="创建时间" prop="createTime" width="200" />
      <el-table-column align="center" label="修改时间" prop="updateTime" width="200" />
      <el-table-column fixed="right" label="操作" align="center" width="280">
        <template #default="{ row }">
          <el-button
            v-btn-permission="'btn.User.assgin'"
            type="primary"
            icon="User"
            size="small"
            @click="handleAssignRole(row)"
            >分配角色</el-button
          >
          <el-button
            v-btn-permission="'btn.User.update'"
            type="primary"
            icon="Edit"
            size="small"
            @click="handleUpdateUser(row)"
            >编辑</el-button
          >
          <el-popconfirm title="确定要删除吗？" @confirm="handleDeleteUser(row)">
            <template #reference>
              <el-button
                v-btn-permission="'btn.User.remove'"
                type="danger"
                icon="Delete"
                size="small"
                >删除</el-button
              >
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
    <UpdateUsernameDialog
      :user="updateUser"
      @update-user="getUserList(pagination.page, pagination.pageSize, username)"
      v-model="isVisibleUpdateUserDialog"
    />
    <el-drawer title="分配角色" v-model="isShowAssignRoleDrawer">
      <el-checkbox
        v-model="checkAll"
        :indeterminate="isIndeterminate"
        @change="handleCheckAllChange"
      >
        Check all
      </el-checkbox>
      <el-checkbox-group v-model="userRoles" @change="handleCheckedRolesChange">
        <el-checkbox v-for="role in allRoles" :key="role.id" :label="role.id" :value="role.id">
          {{ role.roleName }}
        </el-checkbox>
      </el-checkbox-group>
      <el-button type="primary" @click="handleSubmitAssignRole">分配角色</el-button>
    </el-drawer>
  </div>
</template>

<style scoped></style>
