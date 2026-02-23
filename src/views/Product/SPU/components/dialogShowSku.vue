<script setup lang="ts">
import settings from '@/settings.ts'
import type { SkuInfo } from '@/types/SKU'

const model = defineModel<boolean>()
defineProps<{
  skuList: SkuInfo[]
}>()

const close = () => {
  model.value = false
}
</script>

<template>
  <el-dialog v-model="model" title="SKU列表">
    <el-table border stripe :data="skuList">
      <el-table-column type="index" width="60" label="序号" />
      <el-table-column label="名称" prop="skuName" />
      <el-table-column label="价格" prop="price" />
      <el-table-column label="重量" prop="weight" />
      <el-table-column label="图片" prop="skuDefaultImg">
        <template #default="{ row }">
          <img
            :src="settings.imgPrefixUrl + row.skuDefaultImg.split('/api')[1]"
            :alt="row.skuName"
            :title="row.skuDesc"
          />
        </template>
      </el-table-column>
    </el-table>

    <template #footer>
      <el-button @click="close" type="primary">关闭</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
/* Your styles here */
</style>
