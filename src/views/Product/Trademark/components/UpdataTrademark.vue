<script setup lang="ts">
import type { ModelTrademark } from '@/types/trademark'
import { ref, watch } from 'vue'
import { fetchUploadImage } from '@/api/upload'
import type { FormInstance } from 'element-plus'
const emit = defineEmits(['update', 'cancel', 'add'])
const props = defineProps<{
  mode: 'add' | 'edit'
  currEditTrademark: ModelTrademark
}>()
const formRef = ref<FormInstance>()

const rules = {
  tmName: [{ required: true, message: '请输入品牌名称', trigger: 'blur' }],
  logoUrl: [
    { required: true, message: '请上传品牌logo', trigger: 'change' },
    {
      validator(_rule: unknown, value: string, callback: (message?: Error) => void) {
        if (props.mode === 'add' && !value) {
          callback(new Error('请上传品牌logo'))
        } else {
          callback()
        }
      },
      trigger: 'change',
    },
  ],
}

const formModel = ref<ModelTrademark>({ ...props.currEditTrademark })
watch(
  () => props.currEditTrademark,
  (currEditTrademark) => {
    if (props.mode === 'add') {
      formRef.value?.resetFields()
      formModel.value = {
        tmName: '',
        logoUrl: '',
      }
      previewUrl.value = ''
    } else {
      formModel.value = { ...currEditTrademark }
    }
  },
)
// 专门用于回显
const previewUrl = ref<string>('')

const beforeAvatarUpload = async (file: File) => {
  if (file.type.indexOf('image') === -1) {
    ElMessage.error('上传图片格式错误')
  }
  const formData = new FormData()
  formData.append('file', file)
  const res = await fetchUploadImage(formData)
  formModel.value.logoUrl = res.data
  const fileReader = new FileReader()
  fileReader.readAsDataURL(file)
  fileReader.onload = () => {
    previewUrl.value = fileReader.result as string
  }
  return false
}

const update = async () => {
  if (props.mode === 'add') {
    await formRef.value?.validate()
    emit('add', formModel.value)
  } else {
    formModel.value.logoUrl =
      '/api' + formModel.value.logoUrl!.substring(formModel.value.logoUrl!.indexOf('/static'))
    emit('update', formModel.value)
  }
}
</script>

<template>
  <el-form
    ref="formRef"
    label-width="110px"
    label-position="left"
    :rules="rules"
    :model="formModel"
  >
    <el-form-item label="品牌名称: " prop="tmName">
      <el-input placeholder="品牌名称" v-model="formModel.tmName" />
    </el-form-item>
    <el-form-item label="品牌LOGO:" prop="logoUrl">
      <el-upload
        class="avatar-uploader"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
      >
        <img
          v-if="previewUrl || formModel.logoUrl"
          :src="previewUrl || formModel.logoUrl"
          class="avatar w-20"
        />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </el-form-item>
  </el-form>
  <el-row justify="space-around" align="middle">
    <el-button type="primary" @click="update">{{
      props.mode === 'add' ? '添加' : '更新'
    }}</el-button>
    <el-button type="warning" @click="$emit('cancel')">取消</el-button>
  </el-row>
</template>

<style scoped lang="sass">

.avatar-uploader
   :deep(.el-upload)
    border: 1px dashed var(--el-border-color) !important
    border-radius: 6px
    cursor: pointer
    position: relative
    overflow: hidden
    transition: var(--el-transition-duration-fast)

.avatar-uploader
  :deep(.el-upload:hover)
    border-color: var(--el-color-primary) !important



:deep(.el-icon.avatar-uploader-icon)
  font-size: 28px
  color: #8c939d
  width: 178px
  height: 178px
  text-align: center
</style>
