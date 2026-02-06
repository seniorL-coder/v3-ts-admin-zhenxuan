<script setup lang="ts">
import { ref, watch } from 'vue'
import dialogCom from './components/dialogCom.vue'
import { fetchAttrInfoList } from '@/api/attr'
// 定义接收三个分类id的参数
const categoryIds = ref<number[]>([])
const dialogMode = ref<'add' | 'edit'>('add')
const currEditAttr = ref({
  id: 0,
  attrName: '',
  attrValue: '',
})
const dialogVisible = ref(false)
const handleEditor = (row: { id: number; attrName: string; attrValue: string }) => {
  dialogMode.value = 'edit'
  currEditAttr.value = row
  dialogVisible.value = true
}
const handleAdd = () => {
  dialogMode.value = 'add'
  currEditAttr.value = {} as { id: number; attrName: string; attrValue: string }
  dialogVisible.value = true
}
const handleDelete = (id: number) => {
  console.log(id)
}
const pagination = ref({
  page: 1,
  pageSize: 5,
  pages: 0,
  pageSizes: [3, 5, 10, 15, 20],
  total: 0,
})
const attrList = ref()
// 判断分类id是否合法
const isValidIds = (ids: number[]) => ids.length === 3 && ids.every((id) => Number.isFinite(id))
const handlePageChange = (page: number, limit: number) => {
  console.log(page, limit)
}
const handleUpdateCategoryIds = async (ids: number[]) => {
  categoryIds.value = ids
  if (isValidIds(ids)) {
    const res = await fetchAttrInfoList(ids[0]!, ids[1]!, ids[2]!)
    attrList.value = res.data
  }
}
</script>

<template>
  <el-card>
    <!--  自定义事件, 用于接收 子组件传来的 categoryIds   -->
    <Category @updateCategoryIds="handleUpdateCategoryIds" />
  </el-card>
  <el-card class="!mt-4">
    <el-button
      class="mb-2!"
      type="primary"
      @click="handleAdd"
      icon="Plus"
      :disabled="!isValidIds(categoryIds)"
      >添加属性</el-button
    >
    <el-table border stripe :data="attrList">
      <el-table-column label="序号" width="80" align="center">
        <template #default="scope">
          {{ (pagination.page - 1) * pagination.pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="属性名称" width="160" prop="attrName" align="center" />
      <el-table-column label="属性值" prop="attrValueList" align="center">
        <template #default="{ row }">
          <el-tag
            class="ml-2!"
            v-for="(item, index) in row.attrValueList"
            :key="item"
            :type="index % 2 == 0 ? 'primary' : 'warning'"
          >
            {{ item.valueName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template #default="{ row }">
          <el-button type="primary" icon="Edit" size="small" @click="handleEditor(row)"
            >编辑</el-button
          >
          <el-button type="danger" icon="Delete" size="small" @click="handleDelete(row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--    <el-pagination-->
    <!--      class="!mt-2"-->
    <!--      @change="handlePageChange"-->
    <!--      v-model:current-page="pagination.page"-->
    <!--      v-model:page-size="pagination.pageSize"-->
    <!--      :page-sizes="pagination.pageSizes"-->
    <!--      :total="pagination.total"-->
    <!--      layout=" prev, pager, jumper, next,->,sizes, total"-->
    <!--    />-->
  </el-card>
  <dialogCom
    :mode="dialogMode"
    :currEditAttr="currEditAttr"
    v-model:dialogVisible="dialogVisible"
  />
</template>

<style scoped lang="sass"></style>
