<script setup lang="ts">
import type { ModelTrademark } from '@/types/trademark'
import { ref, watch } from 'vue'
import { fetchUploadImage } from '@/api/upload'
const emit = defineEmits(['update', 'cancel'])
const props = defineProps<{
  currEditTrademark: ModelTrademark
}>()
const formModel = ref<ModelTrademark>({ ...props.currEditTrademark })

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

const update = () => {
  emit('update', formModel.value)
}
</script>

<template>
  <el-form label-width="90px" label-position="left">
    <el-form-item label="品牌名称: ">
      <el-input placeholder="品牌名称" v-model="formModel.tmName"></el-input>
    </el-form-item>
    <el-form-item label="品牌LOGO:">
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
    <el-button type="primary" @click="update">修改</el-button>
    <el-button type="warning" @click="$emit('cancel')">取消</el-button>
  </el-row>
</template>

<style scoped lang="sass">

.avatar-uploader .el-upload
  border: 1px dashed var(--el-border-color)
  border-radius: 6px
  cursor: pointer
  position: relative
  overflow: hidden
  transition: var(--el-transition-duration-fast)


.avatar-uploader .el-upload:hover
  border-color: var(--el-color-primary)


.el-icon.avatar-uploader-icon
  font-size: 28px
  color: #8c939d
  width: 178px
  height: 178px
  text-align: center
</style>
