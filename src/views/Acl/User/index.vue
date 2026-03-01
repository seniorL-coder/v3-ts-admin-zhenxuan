<script setup lang="ts">
import { ref } from 'vue'
import { fetchDeleteUserAPI, fetchUserListAPI } from '@/api/user'
import type { ModelResponseUser } from '@/types/user'
import UpdateUsernameDialog from '@/views/Acl/User/components/UpdateUsernameDialog.vue'
const updateUser = ref({ id: 0, username: '', name: '' })
const isVisibleUpdateUserDialog = ref(false)
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
const getUserList = async (page: number, pageSize: number) => {
  const { data } = await fetchUserListAPI(page, pageSize)
  userList.value = data.records || []
  pagination.value.total = data.total || 0
  pagination.value.pages = data.pages || 0
  pagination.value.page = data.current || 1
  pagination.value.pageSize = data.size || 0
}
getUserList(1, 3)

/**
 * 处理分页变化
 * @param page
 * @param pageSize
 */
const handlePageChange = (page: number, pageSize: number) => {
  getUserList(page, pageSize)
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
 * 删除用户
 * @param user
 */
const handleDeleteUser = async (user: ModelResponseUser) => {
  await fetchDeleteUserAPI(user.id!)
  await getUserList(pagination.value.page, pagination.value.pageSize)
  ElMessage.success('删除成功')
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
          <el-button type="primary">查询</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="mt-6!">
      <el-button type="primary">添加</el-button>
      <el-button type="danger">批量删除</el-button>
    </div>
    <el-table :max-height="500" class="mt-5!" :data="userList || []" border stripe>
      <el-table-column align="center" type="selection" width="55" />
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
          <el-button type="primary" icon="User" size="small">分配角色</el-button>
          <el-button type="primary" icon="Edit" size="small" @click="handleUpdateUser(row)"
            >编辑</el-button
          >
          <el-popconfirm title="确定要删除吗？" @confirm="handleDeleteUser(row)">
            <template #reference>
              <el-button type="danger" icon="Delete" size="small">删除</el-button>
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
      @update-user="getUserList(pagination.page, pagination.pageSize)"
      v-model="isVisibleUpdateUserDialog"
    />
  </div>
</template>

<style scoped></style>
