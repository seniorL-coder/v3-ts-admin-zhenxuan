<script setup lang="ts">
import Category from '@/components/Category/index.vue'
import { fetchSpuList } from '@/api/SPU'
import { ref } from 'vue'
import type { ResponseSpuList } from '@/types/SPU'
const spuList = ref<ResponseSpuList>({})
const category3Id = ref<number>(0)
const pagination = ref({
  page: 1,
  pageSize: 2,
  pages: 0,
  pageSizes: [3, 5, 10, 15, 20],
  total: 0,
})
// 获取SPU分页列表
const getSPUList = async (page: number, limit: number, category3Id: number) => {
  const res = await fetchSpuList(page, limit, category3Id)
  console.log(res.data)
  spuList.value = res.data
  pagination.value.page = res.data.current!
  pagination.value.pageSize = res.data.size!
  pagination.value.pages = res.data.pages!
  pagination.value.total = res.data.total!
}

const handleUpdateCategoryIds = (categoryIds: number[]) => {
  const flag = categoryIds.map((item) => !!item).every((item) => item)
  if (flag) {
    category3Id.value = categoryIds[2]!
    getSPUList(1, 2, category3Id.value)
  }
}

const handlePageChange = async (page: number) => {
  console.log(page)
  await getSPUList(page, pagination.value.pageSize, category3Id.value)
}
</script>

<template>
  <el-card>
    <Category @updateCategoryIds="handleUpdateCategoryIds" />
  </el-card>
  <el-card>
    <el-table :data="spuList.records" border stripe>
      <el-table-column label="序号">
        <template #default="scope">
          {{ (pagination.page - 1) * pagination.pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="SPU名称" prop="spuName" />
      <el-table-column label="SPU描述" prop="description" />
      <el-table-column label="操作">
        <template #default>
          <el-button type="primary" size="small">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
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
</template>

<style scoped lang="sass"></style>
