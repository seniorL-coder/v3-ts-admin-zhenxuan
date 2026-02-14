<script setup lang="ts">
import { ElForm, ElInput, type FormRules, type UploadProps } from 'element-plus'
import { computed, nextTick, ref, watch } from 'vue'
import type {
  ModelSaleAttr,
  ModelSaleAttrValue,
  ModelSpu,
  ModelSpuImage,
  ModelSpuSaleAttr,
} from '@/types/SPU'
import {
  fetchBaseSaleAttrList,
  fetchSaveSpuInfo,
  fetchSpuImageList,
  fetchSpuSaleAttrList,
  fetchTrademarkList,
} from '@/api/SPU'
import type { ModelTrademark } from '@/types/trademark'
import { fetchUploadImage } from '@/api/upload'

const skuFormTitle = ref('添加SPU')
const spuName = ref('')
const description = ref('') // SPU描述
const trademarkList = ref<ModelTrademark[]>([])
const trademarkId = ref<number>() // SPU品牌ID
const spuImages = ref<UploadProps['fileList']>([]) // SPU图片列表
const baseSaleAttrList = ref<ModelSaleAttr[]>([]) // 所有销售属性列表
const baseSaleAttrId = ref<number>() // SPU销售属性ID
const spuSaleAttrList = ref<ModelSpuSaleAttr[]>([]) // SPU销售属性列表
const spu = ref<ModelSpu>({}) // 用于组装spu信息
// 包装成一个伪对象供表单校验使用
const formModel = computed(() => ({
  spuName: spuName.value,
  description: description.value,
  trademarkId: trademarkId.value,
  spuImages: spuImages.value,
  spuSaleAttrList: spuSaleAttrList.value,
}))
const props = defineProps<{
  skuInfo: { mode: 'edit' | 'add'; row: ModelSpu }
}>()
const rules: FormRules = {
  spuName: [
    { required: true, message: '请输入SPU名称', trigger: 'change' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'change' },
  ],
  description: [
    { required: true, message: '请输入SPU描述', trigger: 'change' },
    { min: 2, max: 200, message: '长度在 2 到 200 个字符', trigger: 'change' },
  ],
  // 品牌 ID：通常是数字或字符串，直接判断是否真值即可
  trademarkId: [
    {
      required: true,
      validator: (_, value, callback) => {
        return value ? callback() : callback(new Error('请选择SPU品牌'))
      },
      trigger: 'change',
    },
  ],
  // 图片列表：校验数组长度
  spuImages: [
    {
      required: true,
      validator: (_, value, callback) => {
        return value && value.length > 0 ? callback() : callback(new Error('请至少上传一张SPU图片'))
      },
      trigger: 'change',
    },
  ],
  // 销售属性列表：校验至少包含一个属性，且属性下必须有属性值
  spuSaleAttrList: [
    {
      required: true,
      validator: (_, value, callback) => {
        if (!value || value.length === 0) {
          return callback(new Error('请添加SPU销售属性'))
        }
        // 进阶校验：如果属性行存在但没有具体的属性值列表，也可以在这里拦截
        const hasValues = value.every((attr: any) => attr.spuSaleAttrValueList?.length > 0)
        return hasValues ? callback() : callback(new Error('每个销售属性至少需要包含一个属性值'))
      },
      trigger: 'change',
    },
  ],
}
watch(
  () => props.skuInfo,
  async (newValue) => {
    formRef.value?.resetFields()
    skuFormTitle.value = newValue.mode === 'edit' ? '编辑SPU' : '添加SPU'
    await getTrademarkList()
    await getBaseSaleAttrList()
    if (newValue.mode === 'edit') {
      spuName.value = newValue.row.spuName!
      trademarkId.value = newValue.row.tmId!
      description.value = newValue.row.description!

      await getSPUImages(newValue.row.id!)
      await getSPUSaleAttrList(newValue.row.id!)
    } else {
      spu.value = {}
      spuImages.value = []
      spuSaleAttrList.value = []
      spuName.value = ''
      description.value = ''
      trademarkId.value = undefined
    }
  },
)

// 获取SPU品牌列表
const getTrademarkList = async () => {
  const { data } = await fetchTrademarkList()
  trademarkList.value = data
}

// 获取SPU图片
const getSPUImages = async (id: number) => {
  const { data } = await fetchSpuImageList(id)
  // /api/static/img/sph/20241215/oppo1.jpeg
  // 剔除 /api 拼接上 http://117.72.157.194:10086
  spuImages.value = data.map((item) => {
    return {
      name: item.imgName!,
      url: item.imgUrl!.replace('/api', 'http://117.72.157.194:10086'),
      uid: item.id!,
    }
  })
}

// 获取所有销售列表
const getBaseSaleAttrList = async () => {
  const { data } = await fetchBaseSaleAttrList()
  baseSaleAttrList.value = data
}

// 获取商品销售属性列表
const getSPUSaleAttrList = async (id: number) => {
  const { data } = await fetchSpuSaleAttrList(id)
  data.forEach((item) => {
    item.spuSaleAttrValueList?.forEach((item2) => {
      item2.isVisible = false
    })
  })
  spuSaleAttrList.value = data
}

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const emits = defineEmits(['update:scene'])

/**
 * 处理图片预览
 * @param uploadFile
 */
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const uploadImage: UploadProps['httpRequest'] = async (option) => {
  const formData = new FormData()
  formData.append('file', option.file)

  const res = await fetchUploadImage(formData)

  // 设置当前文件为 success (不要在这里调用 onSuccess 会导致 onSuccess 被调用两次)
  // option.onSuccess(res.data)
  return res.data
}

const handleSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  // 设置当前文件的响应数据
  // response: 后端返回的响应数据
  // uploadFile: 当前文件对象
  // 第三个参数 uploadFiles: 文件列表
  uploadFile.response = response
}

/**
 * 处理添加销售属性
 */
const handleAddSaleAttr = () => {
  const findBaseSaleAttr = baseSaleAttrList.value.find((item) => item.id === baseSaleAttrId.value)
  if (findBaseSaleAttr) {
    spuSaleAttrList.value.push({
      baseSaleAttrId: findBaseSaleAttr.id,
      saleAttrName: findBaseSaleAttr.name,
      spuId: props.skuInfo.row.id!,
      spuSaleAttrValueList: [],
    })
  }
  baseSaleAttrId.value = undefined
}
/**
 * 处理添加销售属性值
 * @param row
 */
const handleAddSaleAttrValue = (row: ModelSpuSaleAttr) => {
  if (!row.spuSaleAttrValueList) {
    row.spuSaleAttrValueList = []
  }
  row.spuSaleAttrValueList!.push({
    saleAttrValueName: '',
    spuId: props.skuInfo.row.id!,
    baseSaleAttrId: row.baseSaleAttrId,
    isVisible: true,
  })
  // tagInputRefs 最后一个元素 聚焦
  nextTick(() => {
    tagInputRefs.value[tagInputRefs.value.length - 1]?.focus()
  })
}
// 用于比对 baseSaleAttrList  与  spuSaleAttrList 的 差集
// 只需要负责获取基础数据和 SPU 数据
// 剩下的交给计算属性自动处理
const availableBaseAttr = computed(() => {
  const existingIds = spuSaleAttrList.value.map((attr) => attr.baseSaleAttrId)
  return baseSaleAttrList.value.filter((base) => !existingIds.includes(base.id))
})
// 1. 定义一个存储引用的对象或数组
const tagInputRefs = ref<any[]>([])

const toggleVisible = (item: ModelSaleAttrValue, index: number) => {
  // 重置所有状态
  spuSaleAttrList.value.forEach((attr) => {
    attr.spuSaleAttrValueList?.forEach((val) => {
      val.isVisible = false
    })
  })

  // 设置当前项可见
  item.isVisible = true

  // 2. 在 DOM 更新后，通过索引找到对应的 input 并聚焦
  nextTick(() => {
    // Element Plus 的输入框实例需要调用其内部的 focus 方法
    tagInputRefs.value[index]?.focus()
  })
}

const handleTagInputBlur = (row: ModelSpuSaleAttr, index: number) => {
  // 1. 恢复显示状态
  row.spuSaleAttrValueList![index]!.isVisible = false

  // 2. 检查值是否为空
  if (
    !row.spuSaleAttrValueList?.[index] ||
    !row.spuSaleAttrValueList?.[index].saleAttrValueName!.trim()
  ) {
    // 直接从 row（当前行对象）的 list 中删除
    // 这里的 index 对应的是 v-for="(item, index) in row.spuSaleAttrValueList"
    row.spuSaleAttrValueList?.splice(index, 1)
  }
}

/**
 * 处理销售属性值删除
 * @param row
 * @param index
 */
const handleDeleteTag = (row: ModelSpuSaleAttr, index: number) => {
  row.spuSaleAttrValueList?.splice(index, 1)
}

/**
 * 处理删除销售属性
 * @param row
 */
const handleDelete = (row: ModelSpuSaleAttr) => {
  spuSaleAttrList.value = spuSaleAttrList.value.filter(
    (item) => item.baseSaleAttrId !== row.baseSaleAttrId,
  )
}
/**
 * 处理取消 切换场景值为 0, 并重置表单
 */
const handleCancel = () => {
  emits('update:scene', 0)
}
const formRef = ref<InstanceType<typeof ElForm>>()

const handleSave = async () => {
  const imageList: ModelSpuImage[] = spuImages.value.map((item) => {
    if (item.url) {
      item.url = '/api' + item.url.substring(item.url.indexOf('/static'))
    }
    return {
      imgName: item.name,
      imgUrl: (item.response as string) ?? item.url ?? '',
      spuId: props.skuInfo.row.id!,
    }
  })
  // spuName
  spu.value.spuName = spuName.value
  spu.value.description = description.value
  spu.value.spuImageList = imageList
  spu.value.spuSaleAttrList = spuSaleAttrList.value
  spu.value.tmId = trademarkId.value
  spu.value.category3Id = props.skuInfo.row.category3Id
  formRef.value?.validate(async (valid) => {
    if (valid) {
      if (props.skuInfo.mode === 'edit') {
        // 编辑
        await fetchSaveSpuInfo(spu.value)
        ElMessage.success('编辑成功')
      } else {
        // 添加
        await fetchSaveSpuInfo(spu.value)
        ElMessage.success('添加成功')
      }
      // 切换场景值为 0, 表示返回列表页面
      emits('update:scene', 0)
    }
  })
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-2!">{{ skuFormTitle }}</h1>
    <el-form
      labelWidth="110px"
      labelPosition="right"
      :rules="rules"
      ref="formRef"
      :model="formModel"
    >
      <el-form-item label="SPU名称:" prop="spuName">
        <el-input placeholder="请输入SPU名称" v-model="spuName" />
      </el-form-item>
      <el-form-item label="SPU品牌:" prop="trademarkId">
        <el-select placeholder="请选择SPU品牌" v-model="trademarkId">
          <el-option
            v-for="item in trademarkList"
            :key="item.id"
            :value="item.id!"
            :label="item.tmName"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述:" prop="description">
        <el-input placeholder="请输入SPU描述" type="textarea" v-model="description" />
      </el-form-item>
      <el-form-item label="SPU图片:" prop="spuImages">
        <!--照片墙静态-->
        <el-upload
          v-model:file-list="spuImages"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :http-request="uploadImage"
          :on-change="() => formRef?.validateField('spuImages')"
          :on-success="handleSuccess"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="SPU销售属性:" prop="spuSaleAttrList">
        <el-select
          class="w-60!"
          :placeholder="'还有' + availableBaseAttr.length + '个销售属性可选'"
          v-model="baseSaleAttrId"
        >
          <el-option
            v-for="item in availableBaseAttr"
            :key="item.id"
            :value="item.id!"
            :label="item.name!"
          />
        </el-select>
        <el-button
          :disabled="!baseSaleAttrId"
          class="ml-10!"
          type="primary"
          icon="Plus"
          @click="handleAddSaleAttr"
          >添加销售属性</el-button
        >
        <el-table border stripe class="mt-6!" :data="spuSaleAttrList">
          <el-table-column width="80px" label="序号" type="index" align="center" />
          <el-table-column width="160px" label="销售属性名称" align="center" prop="saleAttrName" />
          <el-table-column label="销售属性值" align="center">
            <template #default="{ row }">
              <template v-for="(item, index) in row.spuSaleAttrValueList" :key="item.id">
                <el-tag
                  class="ml-2!"
                  v-if="!item.isVisible"
                  closable
                  @click="toggleVisible(item, index)"
                  @close="handleDeleteTag(row, index)"
                >
                  {{ item.saleAttrValueName }}
                </el-tag>
                <el-input
                  :ref="(el: any) => (tagInputRefs[index] = el)"
                  v-else
                  size="small"
                  class="w-[150px]! ml-2!"
                  @blur="handleTagInputBlur(row, index)"
                  v-model="item.saleAttrValueName"
                />
              </template>
              <el-button
                class="ml-2!"
                title="添加销售属性值"
                type="primary"
                size="small"
                icon="Plus"
                @click="handleAddSaleAttrValue(row)"
              />
            </template>
          </el-table-column>
          <el-table-column width="120px" label="操作" align="center">
            <template #default="{ row }">
              <el-popconfirm title="确定要删除吗？" @confirm="handleDelete(row)">
                <template #reference>
                  <el-button type="danger" icon="Delete" size="small" title="删除销售属性" />
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-row>
        <el-col :offset="6" :span="4">
          <el-button class="w-full" type="primary" @click="handleSave">保存</el-button>
        </el-col>
        <el-col :span="4" :offset="4">
          <el-button class="w-full" type="warning" @click="handleCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<style scoped lang="sass"></style>
