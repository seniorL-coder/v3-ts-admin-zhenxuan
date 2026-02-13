<script setup lang="ts">
import type { UploadProps } from 'element-plus'
import { ref } from 'vue'

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const emits = defineEmits(['update:scene'])
/**
 * 处理图片删除
 * @param uploadFile
 * @param uploadFiles
 */
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}
/**
 * 处理图片预览
 * @param uploadFile
 */
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
/**
 * 处理销售属性值删除
 * @param row
 */
const handleDelete = (row: any) => {
  console.log(row)
}
/**
 * 处理取消 切换场景值为 0, 并重置表单
 */
const handleCancel = () => {
  emits('update:scene', 0)
  console.log('cancel')
}
</script>

<template>
  <div>
    <h1>SPUForm</h1>
    <el-form labelWidth="100px" labelPosition="left">
      <el-form-item label="SPU名称:">
        <el-input placeholder="请输入SPU名称" />
      </el-form-item>
      <el-form-item label="SPU品牌:">
        <el-select placeholder="请选择SPU品牌">
          <el-option value="1" label="品牌一" />
          <el-option value="2" label="品牌二" />
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述:">
        <el-input placeholder="请输入SPU描述" type="textarea" />
      </el-form-item>
      <el-form-item label="SPU图片:">
        <!--照片墙静态-->
        <!--        v-model:file-list="fileList"-->
        <el-upload
          action=""
          :auto-upload="false"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="SPU销售属性:">
        <el-select class="w-60!" placeholder="请选择SPU销售属性">
          <el-option value="1" label="销售属性一" />
          <el-option value="2" label="销售属性二" />
        </el-select>
        <el-button class="ml-10!" type="primary" icon="Plus">添加销售属性</el-button>
        <el-table border stripe class="mt-6!">
          <el-table-column width="80px" label="序号" type="index" align="center" />
          <el-table-column width="160px" label="销售属性名称" align="center" />
          <el-table-column label="销售属性值" align="center" />
          <el-table-column width="120px" label="操作" align="center">
            <template #default="{ row }">
              <el-button type="danger" icon="Delete" @click="handleDelete(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-row>
        <el-col :offset="6" :span="4">
          <el-button class="w-full" type="primary">保存</el-button>
        </el-col>
        <el-col :span="4" :offset="4">
          <el-button class="w-full" type="warning" @click="handleCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<style scoped lang="sass"></style>
