<script setup lang="ts">
import { ref, watch } from 'vue'
import type { AddMenu, ModelMenu } from '@/types/menu'
import type { ElForm } from 'element-plus'
import { fetchAddPermission, fetchUpdatePermission } from '@/api/menu'
const visible = defineModel<boolean>()
const props = defineProps<{
  mode: 'add' | 'update'
  row: ModelMenu
}>()
const emits = defineEmits(['getPermissionList'])
const formRef = ref<InstanceType<typeof ElForm>>()

const formData = ref<AddMenu>({
  id: null,
  code: '',
  level: 0,
  name: '',
  pid: 0,
  type: 0,
})
const rules = {
  name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  code: [{ required: true, message: '请输入权限值', trigger: 'blur' }],
}
watch(
  () => visible.value,
  (val) => {
    if (!val) return
    if (props.mode === 'update') {
      formData.value = {
        id: props.row.id!,
        pid: props.row.pid!,
        code: props.row.code!,
        level: props.row.level!,
        type: props.row.type!,
        name: props.row.name!,
      }
    }
    formRef.value?.resetFields()
  },
)
const handleSubmit = async () => {
  const isOK = await formRef.value?.validate()
  if (!isOK) return

  if (props.mode === 'update') {
    await fetchUpdatePermission(formData.value)
  } else if (props.mode === 'add') {
    formData.value.type = props.row.level === 3 ? 2 : 1
    formData.value.pid = props.row.id!
    formData.value.level = props.row.level! + 1
    await fetchAddPermission(formData.value)
  }
  emits('getPermissionList')
  visible.value = false

  ElMessage.success(props.mode === 'add' ? '新增成功' : '更新成功')
}
</script>

<template>
  <el-dialog
    v-model="visible"
    :title="props.mode === 'add' ? (props.row.level === 3 ? '添加功能' : '添加菜单') : '更新'"
  >
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="80px">
      <el-form-item :label="props.row.level! < 3 ? '菜单名称' : '功能名称'" prop="name">
        <el-input v-model="formData.name" placeholder="请输入菜单名称" />
      </el-form-item>
      <el-form-item label="权限值" prop="code">
        <el-input v-model="formData.code" placeholder="请输入权限值" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="visible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped lang="sass"></style>
