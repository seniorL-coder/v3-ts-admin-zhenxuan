<script setup lang="ts">
// 向父组件传递分类id
const emits = defineEmits(['updateCategoryIds'])
// 获取一级分类
import { fetchCategory1, fetchCategory2, fetchCategory3 } from '@/api/attr'
import { ref, watch } from 'vue'
import type { ModelGetCategory } from '@/types/attr'
const category1List = ref<ModelGetCategory[]>([])
const category2List = ref<ModelGetCategory[]>([])
const category3List = ref<ModelGetCategory[]>([])

const category1Id = ref<number | null>(null)
const category2Id = ref<number | null>(null)
const category3Id = ref<number | null>(null)

const getCategory1 = async () => {
  const res = await fetchCategory1()
  category1List.value = res.data
}
getCategory1()
// 获取二级分类
const handleCategory1Change = async (id: number) => {
  category2List.value = []
  category2Id.value = null
  category3List.value = []
  category3Id.value = null
  const res = await fetchCategory2(id)
  category2List.value = res.data
}
// 获取三级分类
const handleCategory2Change = async (id: number) => {
  category3List.value = []
  category3Id.value = null
  const res = await fetchCategory3(id)
  category3List.value = res.data
}

watch(
  () => [category1Id.value, category2Id.value, category3Id.value],
  ([c1, c2, c3]) => {
    emits('updateCategoryIds', [c1, c2, c3])
  },
)
</script>

<template>
  <el-form :inline="true">
    <el-form-item label="一级分类">
      <el-select
        class="w-60!"
        placeholder="请选择一级分类"
        v-model="category1Id"
        @change="handleCategory1Change"
      >
        <el-option
          v-for="item in category1List"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="二级分类">
      <el-select
        class="w-60!"
        placeholder="请选择二级分类"
        v-model="category2Id"
        @change="handleCategory2Change"
      >
        <el-option
          v-for="item in category2List"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="三级分类">
      <el-select class="w-60!" placeholder="请选择三级分类" v-model="category3Id">
        <el-option
          v-for="item in category3List"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="sass"></style>
