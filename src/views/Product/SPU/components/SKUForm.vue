<script setup lang="ts">
import { ref, watch } from 'vue'
import type { FormInstance } from 'element-plus'
import type { SkuInfo, ModelSkuImgDTO } from '@/types/SKU'
import { fetchSpuImageList, fetchSpuSaleAttrList } from '@/api/SPU'
import { fetchAttrInfoList } from '@/api/attr'
import { fetchSaveSkuInfo } from '@/api/SKU'

const emits = defineEmits(['update:scene'])
const skuFormRef = ref<FormInstance>()
const imageTableRef = ref()
const props = defineProps<{
  categoryIds: number[]
  spuId: number
  scene: number
  tmId: number
}>()

// 获取分类下已有的属性与属性值，映射为带 valueId 的表单项（便于 v-model 收集）
const getAttrList = async () => {
  const { data } = await fetchAttrInfoList(
    props.categoryIds[0]!,
    props.categoryIds[1]!,
    props.categoryIds[2]!,
  )
  skuForm.value.skuAttrValueList = (data ?? []).map((item) => ({
    attrId: String(item.id),
    attrName: item.attrName,
    valueId: '' as string,
    attrValueList: item.attrValueList ?? [],
  }))
}
// 获取商品销售属性列表，映射为带 saleAttrId / saleAttrValueId 的表单项
const getSaleAttrList = async () => {
  const { data } = await fetchSpuSaleAttrList(props.spuId)
  skuForm.value.skuSaleAttrValueList = (data ?? []).map((item) => ({
    saleAttrId: String(item.id ?? item.baseSaleAttrId),
    saleAttrName: item.saleAttrName,
    saleAttrValueId: '' as string,
    spuSaleAttrValueList: item.spuSaleAttrValueList ?? [],
  }))
}

// 获取商品图片列表，映射为带 isDefault、spuImgId 的项（便于表格多选与默认图）
const getImageList = async () => {
  const { data } = await fetchSpuImageList(props.spuId)
  skuForm.value.skuImageList = (data ?? []).map((img) => ({
    imgName: img.imgName,
    imgUrl: img.imgUrl ?? '',
    spuImgId: img.id,
    isDefault: '0' as string,
  }))
}
const initSkuData = () => {
  getAttrList()
  getSaleAttrList()
  getImageList()
}
// 初始化表单数据
const skuForm = ref<SkuInfo>({
  isSale: 0, // 是否上架
  skuName: 'vivo x300s',
  price: '3999',
  weight: '500',
  skuDesc: '看似我在拉香蕉, 实则是香蕉拉了我一把。______奥德彪',
  category3Id: '', // 建议从父组件传入
  spuId: 0, // 建议从父组件传入
  tmId: '', // 建议从父组件传入
  skuDefaultImg: '',
  skuAttrValueList: [], // 平台属性
  skuSaleAttrValueList: [], // 销售属性
  skuImageList: [], // 图片列表
})
// 监听 scene 的变化
watch(
  () => props.scene,
  (newVal) => {
    if (newVal === 2) {
      // 只有切换到当前场景时才发请求
      // 调用初始化方法
      initSkuData()
      skuForm.value.category3Id = String(props.categoryIds[2]!)
      skuForm.value.spuId = props.spuId
      skuForm.value.tmId = String(props.tmId)
    }
  },
  { immediate: true },
) // immediate 确保如果是初始进入也能触发

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
    { pattern: /^\d+(\.\d{1,2})?$/, message: '请输入整数或最多两位小数的数值', trigger: 'change' },
  ],
  skuDesc: [
    { required: true, message: '请输入描述', trigger: 'change' },
    { min: 2, max: 60, message: '长度在 2 到 50 个字符', trigger: 'change' },
  ],
}

let isUpdating = false
const onImageSelectionChange = (rows: ModelSkuImgDTO[]) => {
  if (isUpdating || rows.length === 0) return

  // 只保留最后一个
  const last = rows[rows.length - 1]

  // 强制单选
  isUpdating = true
  imageTableRef.value?.clearSelection()
  imageTableRef.value?.toggleRowSelection(last, true)
  // 3. 这里的代码执行完后，UI 更新触发的下一次 onImageSelectionChange
  // 就会因为上面的 if (isUpdating) return 被拦截掉

  // 所有图片取消默认
  skuForm.value.skuImageList?.forEach((item) => {
    item.isDefault = '0'
  })

  // 当前设为默认
  last!.isDefault = '1'
  skuForm.value.skuDefaultImg = last!.imgUrl

  // 最后把锁打开，允许下一次用户真实的手动操作
  isUpdating = false
}

const setDefaultImage = (row: ModelSkuImgDTO) => {
  const list = skuForm.value.skuImageList
  if (!list) return
  list.forEach((img) => {
    img.isDefault = img.imgUrl === row.imgUrl ? '1' : '0'
  })
  skuForm.value.skuDefaultImg = row.imgUrl ?? ''
  // ⭐ 自动勾选当前行(先把其他的取消勾选)
  imageTableRef.value?.clearSelection()
  imageTableRef.value?.toggleRowSelection(row, true)
}

const handleSave = () => {
  skuFormRef.value?.validate(async (valid) => {
    if (valid) {
      // 校验是否选择默认图片
      if (skuForm.value.skuDefaultImg !== '') {
        await fetchSaveSkuInfo(skuForm.value)
        ElMessage.success('保存成功')
        emits('update:scene', 0)
      } else {
        ElMessage.error('请选择默认图片')
      }
    }
  })
}
const cancel = () => {
  // 重置表单
  skuFormRef.value?.resetFields()
  emits('update:scene', 0)
}
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
      <!-- 加上边距 -->
      <div class="flex flex-wrap gap-2">
        <el-form-item
          labelWidth="100px"
          class="mb-3!"
          labelPosition="left"
          v-for="(item, index) in skuForm.skuAttrValueList"
          :key="item.attrId"
          :label="item.attrName"
          :prop="'skuAttrValueList.' + index + '.valueId'"
          :rules="{ required: true, message: '请选择' + item.attrName, trigger: 'change' }"
        >
          <el-select v-model="item.valueId" placeholder="请选择" class="w-50!" value-key="id">
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
          class="mb-3!"
          labelWidth="100px"
          v-for="(item, index) in skuForm.skuSaleAttrValueList"
          :key="item.id"
          :label="item.saleAttrName"
          :prop="'skuSaleAttrValueList.' + index + '.saleAttrValueId'"
          :rules="{ required: true, message: '请选择' + item.saleAttrName, trigger: 'change' }"
        >
          <el-select placeholder="请选择" class="w-50!" v-model="item.saleAttrValueId">
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
      <el-table
        ref="imageTableRef"
        border
        stripe
        :data="skuForm.skuImageList"
        @selection-change="onImageSelectionChange"
      >
        <el-table-column type="selection" width="60" align="center" />
        <el-table-column label="图片" width="380" align="center">
          <template #default="{ row }">
            <img
              class="w-30 h-30"
              :src="
                'http://117.72.157.194:10086' + row.imgUrl.substring(row.imgUrl.indexOf('/static'))
              "
              alt=""
            />
          </template>
        </el-table-column>
        <el-table-column label="名称" align="center">
          <template #default="{ row }">
            {{ row.imgName }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <el-button
              :type="row.isDefault === '1' ? 'primary' : 'warning'"
              :disabled="row.isDefault === '1'"
              icon="Setting"
              size="small"
              @click="setDefaultImage(row)"
            >
              设为默认
            </el-button>
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
      <el-button type="primary" @click="handleSave">保存</el-button>
    </el-col>
  </el-row>
</template>

<style scoped lang="sass"></style>
