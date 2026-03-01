<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { fetchUpdateUserAPI } from '@/api/user'
import type { ElForm } from 'element-plus'
// 表单实例
const formRef = ref<InstanceType<typeof ElForm>>()

const visible = defineModel<boolean>()

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  name: [{ required: true, message: '请输入用户昵称', trigger: 'blur' }],
}
const userInfo = ref<{
  username: string // 用户名
  name: string // 用户昵称
}>({ username: '', name: '' })
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
const emit = defineEmits(['updateUser'])
const handleUpdate = async () => {
  const isOK = await formRef.value?.validate()
  if (!isOK) {
    ElMessage.error('请填写完整信息')
    return
  }
  await fetchUpdateUserAPI({
    id: props.user.id,
    ...userInfo.value,
  })

  ElMessage.success('更新成功')

  emit('updateUser')
  visible.value = false
}
</script>

<template>
  <el-dialog v-model="visible" title="更新用户">
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
      <el-form-item class="ml-auto!">
        <el-button type="primary" @click="handleUpdate">更新</el-button>
        <el-button type="warning" @click="visible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped lang="sass"></style>
