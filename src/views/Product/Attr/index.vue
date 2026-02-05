<script setup lang="ts">
import { ref } from 'vue'
import dialogCom from './components/dialogCom.vue'

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
  pageSize: 3,
  pages: 0,
  pageSizes: [3, 5, 10, 15, 20],
  total: 0,
})
const attrList = ref([
  {
    id: 1,
    attrName: '颜色',
    attrValue: '红色,蓝色,绿色',
  },
  {
    id: 2,
    attrName: '尺寸',
    attrValue: '100cm,200cm,300cm',
  },
  {
    id: 3,
    attrName: '材质',
    attrValue: '棉,涤纶,尼龙',
  },
  {
    id: 4,
    attrName: '品牌',
    attrValue: '耐克,阿迪达斯,匡威',
  },
  {
    id: 5,
    attrName: '型号',
    attrValue: '1000,2000,3000',
  },
  {
    id: 6,
    attrName: '价格',
    attrValue: '100,200,300',
  },
])

const handlePageChange = (page: number, limit: number) => {
  console.log(page, limit)
}
</script>

<template>
  <el-card>
    <Category />
  </el-card>
  <el-card class="!mt-4">
    <el-table border stripe :data="attrList">
      <el-table-column label="序号" width="80" align="center">
        <template #default="scope">
          {{ (pagination.page - 1) * pagination.pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="属性名称" width="160" prop="attrName" align="center" />
      <el-table-column label="属性值" prop="attrValue" align="center" />
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
    <el-pagination
      class="!mt-2"
      @change="handlePageChange"
      v-model:current-page="pagination.page"
      v-model:page-size="pagination.pageSize"
      :page-sizes="pagination.pageSizes"
      :total="pagination.total"
      layout=" prev, pager, jumper, next,->,sizes, total"
    />
  </el-card>
  <dialogCom :mode="dialogMode" :currEditAttr="currEditAttr" v-model="dialogVisible" />
</template>

<style scoped lang="sass"></style>
