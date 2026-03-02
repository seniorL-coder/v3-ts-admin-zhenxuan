<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { fetchSaveUserAPI, fetchUpdateUserAPI } from '@/api/user'
import type { ElForm } from 'element-plus'
import { useUserStore } from '@/stores/user.ts'
const userStore = useUserStore()

const title = ref('更新用户')
// 表单实例
const formRef = ref<InstanceType<typeof ElForm>>()

const visible = defineModel<boolean>()

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'change' }],
  name: [{ required: true, message: '请输入用户昵称', trigger: 'change' }],
  password: [{ required: true, message: '请输入密码', trigger: 'change' }],
}
const userInfo = ref<{
  username: string // 用户名
  name: string // 用户昵称
  password?: string // 密码
}>({ username: '', name: '', password: '' })
const props = defineProps<{
  user: {
    id: number // 用户ID
    username: string // 用户名
    name: string // 用户昵称
  }
}>()
watch(
  () => visible.value,
  (val) => {
    if (val) {
      nextTick(() => {
        formRef.value?.resetFields()
        userInfo.value = {
          username: props.user.username,
          name: props.user.name,
        }
      })
    }
  },
  {
    immediate: true,
  },
)
watch(
  () => props.user,
  (val) => {
    title.value = val.id ? '更新用户' : '新增用户'
  },
)
const emit = defineEmits(['updateUser'])
const handleUpdate = async () => {
  const isOK = await formRef.value?.validate()
  if (!isOK) {
    ElMessage.error('请填写完整信息')
    return
  }
  if (props.user.id) {
    await fetchUpdateUserAPI({
      id: props.user.id,
      ...userInfo.value,
    })
    // 如果用户更新的是自己, 则需要清除当前用户登录态
    if (props.user.username === userStore.userInfo.name) {
      await userStore.logout()
    }
  } else {
    await fetchSaveUserAPI({ ...userInfo.value })
  }

  ElMessage.success(title.value + '成功')

  emit('updateUser')
  visible.value = false
}
</script>

<template>
  <el-dialog v-model="visible" :title="title">
    <el-form
      :model="userInfo"
      label-position="left"
      ref="formRef"
      :rules="rules"
      label-width="90px"
    >
      <el-form-item label="用户名: " prop="username">
        <el-input v-model="userInfo.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="用户昵称: " prop="name">
        <el-input v-model="userInfo.name" placeholder="请输入用户昵称" />
      </el-form-item>
      <el-form-item v-if="!props.user.id" label="密码: " prop="password">
        <el-input v-model="userInfo.password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item class="ml-auto!">
        <el-button type="primary" @click="handleUpdate">{{ title }}</el-button>
        <el-button type="warning" @click="visible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped lang="sass"></style>
