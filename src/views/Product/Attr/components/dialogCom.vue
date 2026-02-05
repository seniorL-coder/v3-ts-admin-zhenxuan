<script setup lang="ts">
import { ref } from 'vue'
const dialogVisible = defineModel<boolean>('dialogVisible', { required: true })
console.log(dialogVisible.value)

const props = defineProps<{
  mode: 'add' | 'edit'
  currEditAttr: {
    id: number
    attrName: string
    attrValue: string
  }
}>()
const form = ref({
  attrName: '',
  attrValue: '',
})
const rules = {
  attrName: [{ required: true, message: '请输入属性名称', trigger: 'blur' }],
  attrValue: [{ required: true, message: '请输入属性值', trigger: 'blur' }],
}
const handleSubmit = () => {
  if (props.mode === 'add') {
    console.log(form.value)
  } else {
    console.log(form.value)
  }
}
</script>

<template>
  <el-dialog width="500px" title="添加属性" v-model="dialogVisible">
    <el-form :model="form" :rules="rules" label-width="100px">
      <el-form-item label="属性名称" prop="attrName">
        <el-input v-model="form.attrName" placeholder="请输入属性名称" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
      <el-button type="warning" @click="dialogVisible = false">取消</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
/* Your styles here */
</style>
