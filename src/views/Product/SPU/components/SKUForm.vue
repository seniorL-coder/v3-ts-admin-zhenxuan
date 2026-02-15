<script setup lang="ts">
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'
import type { SkuInfo } from '@/types/SKU/index.d.s.ts'
const emits = defineEmits(['update:scene'])
// 获取表单实例引用（用于校验）
const skuFormRef = ref<FormInstance>()

// 初始化表单数据
const skuForm = ref<SkuInfo>({
  skuName: '',
  price: '',
  weight: '',
  skuDesc: '',
  category3Id: '', // 建议从父组件传入
  spuId: '', // 建议从父组件传入
  tmId: '', // 建议从父组件传入
  skuDefaultImg: '',
  skuAttrValueList: [], // 平台属性
  skuSaleAttrValueList: [], // 销售属性
  skuImageList: [], // 图片列表
})
const rules = {
  skuName: [
    { required: true, message: '请输入SKU名称', trigger: 'change' },
    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'change' },
  ],
  price: [
    { required: true, message: '请输入价格', trigger: 'change' },
    // 简单的数字正则校验
    {
      pattern: /^\d+(\.\d{1,2})?$/,
      message: '请输入正确的金额格式（最多两位小数）',
      trigger: 'change',
    },
  ],
  weight: [
    { required: true, message: '请输入重量', trigger: 'change' },
    { pattern: /^\d+(\.\d{1,2})?$/, message: '请输入数值', trigger: 'change' },
  ],
  skuDesc: [
    { required: true, message: '请输入描述', trigger: 'change' },
    { min: 2, max: 60, message: '长度在 2 到 50 个字符', trigger: 'change' },
  ],
}
// 取消, 切换到SPU列表
const cancel = () => {
  emits('update:scene', 0)
}

// 假设这是你从父组件或 API 获取的属性列表
const attrList = ref([
  { id: 1, attrName: '内存', attrValueList: [{ id: 10, valueName: '8GB' }] },
  { id: 2, attrName: '颜色', attrValueList: [{ id: 20, valueName: '红色' }] },
  // ...
])

const saleAttrList = ref([
  { id: 2, saleAttrName: '颜色', spuSaleAttrValueList: [{ id: 20, saleAttrValueName: '红色' }] },
  { id: 3, saleAttrName: '内存', spuSaleAttrValueList: [{ id: 30, saleAttrValueName: '8GB' }] },
  // ...
])
</script>

<template>
  <h1>添加SKU</h1>
  <el-form
    labelPosition="left"
    label-width="100px"
    ref="skuFormRef"
    :model="skuForm"
    :rules="rules"
  >
    <el-form-item label="名称" prop="skuName">
      <el-input v-model="skuForm.skuName" placeholder="请输入名称" />
    </el-form-item>
    <el-form-item label="价格" prop="price">
      <el-input v-model="skuForm.price" placeholder="请输入价格" />
    </el-form-item>
    <el-form-item label="重量" prop="weight">
      <el-input v-model="skuForm.weight" placeholder="请输入重量" />
    </el-form-item>
    <el-form-item label="描述" prop="skuDesc">
      <el-input v-model="skuForm.skuDesc" placeholder="请输入描述" />
    </el-form-item>
    <el-form-item label="平台属性">
      <div class="flex flex-wrap gap-2">
        <el-form-item
          labelWidth="60px"
          v-for="(item, index) in attrList"
          :key="item.id"
          :label="item.attrName"
          :prop="'skuAttrValueList.' + index + '.valueId'"
          :rules="{ required: true, message: '请选择' + item.attrName, trigger: 'change' }"
        >
          <el-select placeholder="请选择" class="w-50!">
            <el-option
              v-for="val in item.attrValueList"
              :key="val.id"
              :label="val.valueName"
              :value="val.id"
            />
          </el-select>
        </el-form-item>
      </div>
    </el-form-item>
    <el-form-item label="销售属性">
      <div class="flex flex-wrap gap-2">
        <el-form-item
          labelWidth="60px"
          v-for="(item, index) in saleAttrList"
          :key="item.id"
          :label="item.saleAttrName"
          :prop="'skuSaleAttrValueList.' + index + '.saleAttrValueId'"
          :rules="{ required: true, message: '请选择' + item.saleAttrName, trigger: 'change' }"
        >
          <el-select placeholder="请选择" class="w-50!">
            <el-option
              v-for="val in item.spuSaleAttrValueList"
              :key="val.id"
              :label="val.saleAttrValueName"
              :value="val.id"
            />
          </el-select>
        </el-form-item>
      </div>
    </el-form-item>
    <el-form-item label="图片">
      <el-table border stripe :data="[]">
        <el-table-column type="selection" width="60" align="center" />
        <el-table-column label="图片" width="380" align="center">
          <template #default="{ row }">
            <img :src="row.img" alt="" />
          </template>
        </el-table-column>
        <el-table-column label="名称" align="center">
          <template #default="{ row }">
            {{ row.name }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <el-button type="primary" icon="Setting">设为默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
  </el-form>
  <el-row>
    <el-col :offset="6" :span="4">
      <el-button type="warning" @click="cancel">取消</el-button>
    </el-col>
    <el-col :span="4">
      <el-button type="primary">保存</el-button>
    </el-col>
  </el-row>
</template>

<style scoped lang="sass"></style>
