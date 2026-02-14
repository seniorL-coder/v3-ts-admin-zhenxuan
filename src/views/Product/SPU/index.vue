<script setup lang="ts">
import Category from '@/components/Category/index.vue'
import { fetchSpuList } from '@/api/SPU'
import { ref, watch } from 'vue'
import type { ModelSpu, ResponseSpuList } from '@/types/SPU'
import SPUForm from '@/views/Product/SPU/components/SPUForm.vue'
import SKUForm from '@/views/Product/SPU/components/SKUForm.vue'
const spuList = ref<ResponseSpuList>({})
const category3Id = ref<number>(0)
const flag = ref<boolean>(false) // 是否显示添加SPU按钮
const scene = ref<number>(0) // 0: 展示SPU列表，1: 添加编辑SPU，2: 添加SKU

// 给子组件传递数据 要修改的SKU, 同时标记是添加SKU还是编辑SKU
const skuInfo = ref<{ mode: 'add' | 'edit'; row: ModelSpu }>({
  mode: 'edit',
  row: {},
})

const pagination = ref({
  page: 1,
  pageSize: 3,
  pages: 0,
  pageSizes: [3, 5, 10, 15],
  total: 0,
})
// 获取SPU分页列表
const getSPUList = async (page: number, limit: number, category3Id: number) => {
  const res = await fetchSpuList(page, limit, category3Id)
  spuList.value = res.data
  pagination.value.page = res.data.current!
  pagination.value.pageSize = res.data.size!
  pagination.value.pages = res.data.pages!
  pagination.value.total = res.data.total!
}
// 进入页面时获取SPU列表(要确保分类id有值)
watch(
  () => scene.value,
  (newValue) => {
    if (newValue === 0 && flag.value) {
      getSPUList(pagination.value.page, pagination.value.pageSize, category3Id.value)
    }
  },
)

const handleUpdateCategoryIds = (categoryIds: number[]) => {
  flag.value = categoryIds.map((item) => !!item).every((item) => item)
  scene.value = 0 // 分类发生变化时，重置场景为0
  spuList.value = [] // 分类发生变化时，重置SPU列表
  if (flag.value) {
    category3Id.value = categoryIds[2]!
    getSPUList(1, pagination.value.pageSize, category3Id.value)
  }
}
const handlePageChange = async (page: number, pageSize: number) => {
  await getSPUList(page, pageSize, category3Id.value)
}
/**
 * 删除SPU
 * @param row
 */
const handleDeleteSPU = (row: any) => {
  console.log('删除SPU', row)
}
/**
 * 编辑SPU
 * @param row
 */
const handleEditSPU = (row: ModelSpu) => {
  scene.value = 1
  console.log('编辑SPU', row)
  skuInfo.value = { mode: 'edit', row }
}
/**
 * 添加SPU
 */
const handleAddSPU = () => {
  scene.value = 1
  console.log('添加SPU')
  skuInfo.value = { mode: 'add', row: { category3Id: category3Id.value } }
}
/**
 * 查看已有SKU
 * @param row
 */
const handleViewSKUs = (row: any) => {
  console.log('查看已有SKU', row)
}
/**
 * 添加SKU
 * @param row
 */
const handleAddSKU = (row: ModelSpu) => {
  console.log('添加SKU', row)
}
/**
 * 监听子组件的 取消按钮点击事件, 切换场景
 * @param num
 */
const handleUpdateScene = (num: number) => {
  scene.value = num
}
</script>

<template>
  <el-card>
    <Category @updateCategoryIds="handleUpdateCategoryIds" />
  </el-card>
  <el-card v-show="scene === 0">
    <div class="d-flex mb-2!">
      <el-button :disabled="!flag" icon="Plus" type="primary" @click="handleAddSPU"
        >添加SPU</el-button
      >
    </div>
    <el-table :data="spuList.records" border stripe>
      <el-table-column label="序号" width="50px" align="center">
        <template #default="scope">
          {{ (pagination.page - 1) * pagination.pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="SPU名称" width="150px" align="center" prop="spuName" />
      <el-table-column label="SPU描述" align="center" prop="description" />
      <el-table-column label="操作" align="center" width="250px">
        <template #default="{ row }">
          <el-button
            type="primary"
            icon="Plus"
            size="small"
            @click="handleAddSKU(row)"
            title="添加SKU"
          />
          <el-button
            type="success"
            icon="View"
            size="small"
            @click="handleViewSKUs(row)"
            title="查看已有SKU"
          />
          <el-button
            type="primary"
            icon="Edit"
            size="small"
            @click="handleEditSPU(row)"
            title="编辑SPU"
          />
          <el-popconfirm title="确定要删除吗？" @confirm="handleDeleteSPU(row)">
            <template #reference>
              <el-button type="danger" icon="Delete" size="small" title="删除SPU" />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt-2!"
      background
      @change="handlePageChange"
      v-model:current-page="pagination.page"
      v-model:page-size="pagination.pageSize"
      :page-sizes="pagination.pageSizes"
      :total="pagination.total"
      layout=" prev, pager, jumper, next,->,sizes, total"
    />
  </el-card>
  <el-card class="mt-5!" v-show="scene === 1">
    <SPUForm :skuInfo="skuInfo" @update:scene="handleUpdateScene" />
  </el-card>
  <el-card class="mb-5!" v-show="scene === 2">
    <SKUForm />
  </el-card>
</template>

<style scoped lang="sass"></style>
