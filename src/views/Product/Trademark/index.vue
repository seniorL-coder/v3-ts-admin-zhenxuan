<script setup lang="ts">
import { ref } from 'vue'
import { fetchRemoveTrademark, fetchTrademarkList, fetchUpdateTrademark } from '@/api/product'
import type { ModelTrademark } from '@/types/trademark'
import UpdataTrademark from '@/views/Product/Trademark/components/UpdataTrademark.vue'

const pagnation = ref({
  page: 1,
  pageSize: 3,
  pageSizes: [3, 5, 10, 15, 20],
  total: 0,
})
const dialogVisible = ref(false) // 弹窗显示隐藏
const currEditorTrademark = ref({} as ModelTrademark)
const trademarkList = ref([] as ModelTrademark[])
const handlePageChange = async (page: number, limit: number) => {
  const res = await fetchTrademarkList({ page, limit })
  trademarkList.value = res.data.records
  pagnation.value.total = res.data.total
  pagnation.value.page = page
  pagnation.value.pageSize = limit
  trademarkList.value.forEach((item) => {
    item.logoUrl = `http://117.72.157.194:10086${item.logoUrl!.substring(4)}`
  })
}
handlePageChange(pagnation.value.page, pagnation.value.pageSize)

const handleEditor = (row: ModelTrademark) => {
  currEditorTrademark.value = row
  dialogVisible.value = true
}
const handleDelete = async (id: number) => {
  await fetchRemoveTrademark(id)
  // 如果当前页只剩 1 条，并且不是第一页，页码回退
  if (trademarkList.value.length === 1 && pagnation.value.page > 1) {
    pagnation.value.page--
  }
  await handlePageChange(pagnation.value.page, pagnation.value.pageSize)
  ElMessage.success('删除成功')
}

const handleSubmitUpdate = async (trademark: ModelTrademark) => {
  dialogVisible.value = false
  await fetchUpdateTrademark(trademark)
  await handlePageChange(pagnation.value.page, pagnation.value.pageSize)
  ElMessage.success('更新成功')
}
</script>

<template>
  <el-button type="primary" class="!mb-2" icon="Plus">添加品牌</el-button>
  <el-table border stripe :data="trademarkList">
    <el-table-column align="center" width="80px" label="序号">
      <template #default="scope">
        {{ scope.$index + 1 }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="品牌名称" prop="tmName" />
    <el-table-column align="center" label="品牌LOGO" prop="logoUrl">
      <template #default="{ row }">
        <el-image class="w-10" fit="cover" :src="row.logoUrl" alt="logo" />
      </template>
    </el-table-column>
    <el-table-column align="center" label="创建时间" prop="createTime" />
    <el-table-column align="center" label="更新时间" prop="updateTime" />
    <el-table-column align="center" label="操作">
      <template #default="{ row }">
        <el-button type="primary" icon="Edit" size="small" @click="handleEditor(row)"
          >编辑</el-button
        >

        <el-popconfirm
          title="确定要删除吗？"
          confirm-button-text="确定"
          cancel-button-text="取消"
          icon="Delete"
          icon-color="red"
          @confirm="handleDelete(row.id)"
        >
          <template #reference>
            <el-button type="danger" icon="Delete" size="small">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <el-row justify="end">
    <el-col>
      <el-pagination
        class="!mt-2"
        @change="handlePageChange"
        v-model:current-page="pagnation.page"
        v-model:page-size="pagnation.pageSize"
        :page-sizes="pagnation.pageSizes"
        :total="pagnation.total"
        layout=" prev, pager, jumper, next,->,sizes, total"
      />
    </el-col>
  </el-row>
  <el-dialog width="500px" title="添加品牌" v-model="dialogVisible">
    <UpdataTrademark
      :currEditTrademark="currEditorTrademark"
      @cancel="dialogVisible = false"
      @update="handleSubmitUpdate"
    />
  </el-dialog>
</template>

<style scoped lang="sass"></style>
