<script setup lang="ts">
import type { UploadProps } from 'element-plus'
import { ref, watch } from 'vue'
import type {
  ModelSaleAttr,
  ModelSaleAttrValue,
  ModelSpu,
  ModelSpuImage,
  ModelSpuSaleAttr,
} from '@/types/SPU'
import {
  fetchBaseSaleAttrList,
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

const props = defineProps<{
  skuInfo: { mode: 'edit' | 'add'; row: ModelSpu }
}>()
watch(
  () => props.skuInfo,
  (newValue) => {
    skuFormTitle.value = newValue.mode === 'edit' ? '编辑SPU' : '添加SPU'
    if (newValue.mode === 'edit') {
      spuName.value = newValue.row.spuName!
      trademarkId.value = newValue.row.tmId!
      description.value = newValue.row.description!
      getTrademarkList()
      getSPUImages(newValue.row.id!)
      getBaseSaleAttrList()
      getSPUSaleAttrList(newValue.row.id!)
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
  console.log(data)
  baseSaleAttrList.value = data
}

// 获取商品销售属性列表
const getSPUSaleAttrList = async (id: number) => {
  const { data } = await fetchSpuSaleAttrList(id)
  console.log(data)
  spuSaleAttrList.value = data
}

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const emits = defineEmits(['update:scene'])
/**
 * 处理图片删除
 * @param uploadFile
 * @param uploadFiles
 */
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}
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

  // 设置当前文件为 success
  // option.onSuccess(res.data)
  console.log(spuImages.value)
  return res.data
}

const handleSuccess: UploadProps['onSuccess'] = (uploadFile, uploadFiles) => {
  uploadFiles.response = uploadFile
}

/**
 * 处理销售属性值删除
 * @param tag
 */
const handleDeleteTag = (tag: ModelSaleAttrValue) => {
  console.log(tag)
}

const handleDelete = (row: ModelSpuSaleAttr) => {
  console.log('delete')
  console.log(row)
}
/**
 * 处理取消 切换场景值为 0, 并重置表单
 */
const handleCancel = () => {
  emits('update:scene', 0)
}
const handleSave = () => {
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
  console.log(imageList)
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-2!">{{ skuFormTitle }}</h1>
    <el-form labelWidth="100px" labelPosition="left">
      <el-form-item label="SPU名称:" prop="spuName">
        <el-input placeholder="请输入SPU名称" v-model="spuName" />
      </el-form-item>
      <el-form-item label="SPU品牌:">
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
      <el-form-item label="SPU图片:">
        <!--照片墙静态-->
        <el-upload
          v-model:file-list="spuImages"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :http-request="uploadImage"
          :on-success="handleSuccess"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="SPU销售属性:">
        <el-select class="w-60!" placeholder="请选择SPU销售属性" v-model="baseSaleAttrId">
          <el-option
            v-for="item in baseSaleAttrList"
            :key="item.id"
            :value="item.id!"
            :label="item.name!"
          />
        </el-select>
        <el-button class="ml-10!" type="primary" icon="Plus">添加销售属性</el-button>
        <el-table border stripe class="mt-6!" :data="spuSaleAttrList">
          <el-table-column width="80px" label="序号" type="index" align="center" />
          <el-table-column width="160px" label="销售属性名称" align="center" prop="saleAttrName" />
          <el-table-column label="销售属性值" align="center">
            <template #default="{ row }">
              <el-tag
                class="ml-2!"
                v-for="item in row.spuSaleAttrValueList"
                :key="item.id"
                closable
                @close="handleDeleteTag(item)"
              >
                {{ item.saleAttrValueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column width="120px" label="操作" align="center">
            <template #default="{ row }">
              <el-button type="danger" icon="Delete" size="small" @click="handleDelete(row)"
                >删除</el-button
              >
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
