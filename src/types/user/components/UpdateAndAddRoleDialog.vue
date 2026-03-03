<script setup lang="ts">
// 控制弹窗显示与隐藏的 defineModel
import type { ModelRole } from '@/types/role'
import { nextTick, ref, watch } from 'vue'
import { fetchSaveRole, fetchUpdateRole } from '@/api/role'
import type { ElForm } from 'element-plus'
const role = ref<ModelRole>({})
const visible = defineModel<boolean>()
const fromRef = ref<InstanceType<typeof ElForm>>()

const props = defineProps<{
  roleInfo: ModelRole
  mode: 'add' | 'edit'
}>()
const emit = defineEmits(['updateRole'])
const rules = {
  roleName: [
    { required: true, message: '请输入角色名称', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
  ],
}
watch(visible, (val) => {
  if (!val) return
  nextTick(() => {
    fromRef.value?.resetFields()
  })
  if (props.mode === 'edit') {
    role.value.roleName = props.roleInfo.roleName ?? ''
  } else {
    role.value.roleName = ''
  }
})
const handleSubmit = async () => {
  if (props.mode === 'edit') {
    await fetchUpdateRole({
      id: props.roleInfo.id!,
      roleName: role.value.roleName!,
    })
  } else {
    await fromRef.value?.validate()
    await fetchSaveRole({
      roleName: role.value.roleName!,
    })
  }
  visible.value = false
  emit('updateRole')
  ElMessage.success(props.mode === 'add' ? '新增角色成功' : '更新角色成功')
}
</script>

<template>
  <el-dialog v-model="visible" :title="props.mode === 'add' ? '新增角色' : '编辑角色'">
    <el-form inline ref="fromRef" :model="role" :rules="rules">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="role.roleName" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="warning" size="small" @click="visible = false">取消</el-button>
        <el-button type="primary" size="small" @click="handleSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped lang="sass"></style>
