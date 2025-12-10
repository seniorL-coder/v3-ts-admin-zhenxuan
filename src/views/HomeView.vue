<script setup lang="ts">
import { ref } from 'vue'
import { login } from '@/api/login.ts'
import type { DeptItem } from '@/types/dept/dept'
import { getDeptList } from '@/api/dept.ts'

const formData = ref({
  username: '',
  password: '',
})
const rules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' },
  ],
})
const tableData = ref<DeptItem[]>([])

const handleOK = async () => {
  const res = await login(formData.value)
  console.log(res)
}

const getDept = async () => {
  const res = await getDeptList()
  console.log(res.data)
  tableData.value = res.data
}
</script>

<template>
  <main>
    <el-button type="primary">button</el-button>
    <el-card class="w-96 h-96 ml-8 mt-6">
      <template #header>
        <span class="title">Home</span>
      </template>
      <el-form :model="formData" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="formData.password" placeholder="请输入密码" />
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="handleOK">登录</el-button>
    </el-card>
    <svg-icon name="phone" color="skyblue" />
  </main>

  <el-button @click="getDept" type="primary">get dept</el-button>
  <el-table :data="tableData">
    <el-table-column label="ID">
      <template #default="{ row }">
        {{ row.id }}
      </template>
    </el-table-column>
    <el-table-column label="Name">
      <template #default="{ row }">
        {{ row.name }}
      </template>
    </el-table-column>
    <el-table-column label="CreateTime">
      <template #default="{ row }">
        {{ row.createTime }}
      </template>
    </el-table-column>
    <el-table-column label="UpdateTime">
      <template #default="{ row }">
        {{ row.updateTime }}
      </template>
    </el-table-column>
  </el-table>
</template>

<style lang="sass">
@use "@/styles/variable.scss" as  *
.title
  color: $color
</style>
