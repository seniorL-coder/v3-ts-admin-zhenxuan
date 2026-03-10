<script setup lang="ts">
import { fetchCancelSale, fetchDeleteSku, fetchOnSale, fetchSkuIListPageLimit } from '@/api/SKU'
import { ref } from 'vue'
import type { SkuInfo } from '@/types/SKU'
import settings from '@/settings'
import SkuDetailDrawer from '@/views/Product/SKU/components/SkuDetailDrawer.vue'
const skuListPage = ref<SkuInfo[]>()
const isShowSkuDetailDrawer = ref(false) // 是否显示SKU详情抽屉，默认不显示
const currentSkuInfo = ref<SkuInfo>()
const pagination = ref({
  page: 1,
  pageSize: 3,
  pages: 0,
  pageSizes: [3, 5, 10, 15],
  total: 0,
})
const getSpuListPageLimit = async (page: number, limit: number) => {
  const { data } = await fetchSkuIListPageLimit(page, limit)
  skuListPage.value = data.records
  pagination.value.page = data.current!
  pagination.value.pageSize = data.size!
  pagination.value.total = data.total!
  pagination.value.pages = data.pages!
}
getSpuListPageLimit(1, 3)

const handlePageChange = (page: number, pageSize: number) => {
  getSpuListPageLimit(page, pageSize)
}
const handleShowSKUDetailInfo = (row: SkuInfo) => {
  isShowSkuDetailDrawer.value = true
  currentSkuInfo.value = row
}
/**
 * 处理删除SKU
 * @param row
 */
const handleDeleteSKU = async (row: SkuInfo) => {
  await fetchDeleteSku(row.id!)
  ElMessage.success('删除成功')
  await getSpuListPageLimit(pagination.value.page, pagination.value.pageSize)
}
/**
 * 处理编辑SKU
 * @param row
 */
const handleEditSKU = (row: SkuInfo) => {
  ElMessage.warning('玩命开发中...')
}
/**
 * 处理上架和下架
 * @param row
 */
const handleToggleOnSaleAndOffSale = (row: SkuInfo) => {
  if (row.isSale === 0) {
    fetchOnSale(row.id!)
    row.isSale = 1
    ElMessage.success('上架成功')
  } else if (row.isSale === 1) {
    fetchCancelSale(row.id!)
    row.isSale = 0
    ElMessage.success('下架成功')
  }
}
</script>

<template>
  <div>
    <el-table border stripe :data="skuListPage" :max-height="600">
      <el-table-column label="序号" align="center" type="index" width="100">
        <template #default="{ $index }">
          {{ (pagination.page - 1) * pagination.pageSize + $index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="名称" width="251" align="center" prop="skuName" />
      <el-table-column label="描述" width="350" align="center" prop="skuDesc" />
      <el-table-column label="默认图片" width="200" align="center">
        <template #default="{ row }">
          <div class="flex justify-center">
            <img
              class="w-[100px] h-[100px] object-contain"
              :src="settings.imgPrefixUrl + row.skuDefaultImg.split('/api')[1]"
              :alt="row.skuName"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="重量(g)" align="center" prop="weight" />
      <el-table-column label="价格(元)" align="center" prop="price" />
      <el-table-column label="操作" width="251" fixed="right" align="center">
        <template #default="{ row }">
          <el-button
            :icon="row.isSale === 0 ? 'Bottom' : 'Top'"
            :type="row.isSale === 0 ? 'info' : 'success'"
            size="small"
            @click="handleToggleOnSaleAndOffSale(row)"
          />
          <el-button icon="Edit" type="warning" size="small" @click="handleEditSKU(row)" />
          <el-button
            icon="InfoFilled"
            type="info"
            size="small"
            @click="handleShowSKUDetailInfo(row)"
          />
          <el-popconfirm title="确定要删除吗？" @confirm="handleDeleteSKU(row)">
            <template #reference>
              <el-button icon="Delete" type="danger" size="small" />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt-3!"
      background
      @change="handlePageChange"
      v-model:current-page="pagination.page"
      v-model:page-size="pagination.pageSize"
      :page-sizes="pagination.pageSizes"
      :total="pagination.total"
      layout="prev, pager, jumper, next,->,sizes, total"
    />
    <SkuDetailDrawer v-model:visible="isShowSkuDetailDrawer" :skuInfo="currentSkuInfo || {}" />
  </div>
</template>

<style scoped lang="sass"></style>
