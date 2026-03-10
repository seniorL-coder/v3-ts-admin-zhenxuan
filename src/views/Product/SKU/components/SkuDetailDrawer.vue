<script setup lang="ts">
import type { SkuInfo } from '@/types/SKU'
import settings from '@/settings'
import { ref, watch } from 'vue'
import { fetchSkuDetailInfo } from '@/api/SKU'
const visible = defineModel<boolean>('visible')
const props = defineProps<{
  skuInfo: SkuInfo
}>()
const skuDetailInfo = ref<SkuInfo>({})

// 获取sku详情
const getSkuDetail = async () => {
  const { data } = await fetchSkuDetailInfo(+props.skuInfo.id!)
  skuDetailInfo.value = data
}

watch(
  () => props.skuInfo?.spuID,
  async (newVal) => {
    if (!newVal) return
    await getSkuDetail()
  },
  { immediate: true },
)
</script>

<template>
  <div>
    <el-drawer v-model="visible" title="SKU详情">
      <el-form label-width="100" label-position="left">
        <el-form-item label="SKU名称">
          <el-input :modelValue="skuDetailInfo.skuName || ''" readonly />
        </el-form-item>
        <el-form-item label="SKU价格">
          <el-input :modelValue="skuDetailInfo.price || ''" readonly />
        </el-form-item>
        <el-form-item label="SKU默认图片">
          <el-image :src="settings.imgPrefixUrl + skuDetailInfo.skuDefaultImg?.split('/api')[1]" />
        </el-form-item>
        <el-form-item label="SKU描述">
          <el-input :modelValue="skuDetailInfo.skuDesc || ''" readonly />
        </el-form-item>
        <el-form-item label="平台属性">
          <el-tag class="mr-2! mb-1!" v-for="item in skuDetailInfo.skuAttrValueList" :key="item.id"
            >{{ item.attrName }}: {{ item.valueName }}</el-tag
          >
        </el-form-item>
        <el-form-item label="销售属性">
          <el-tag
            class="mr-2! mb-1!"
            v-for="item in skuDetailInfo.skuSaleAttrValueList"
            :key="item.id"
            >{{ item.saleAttrName }}: {{ item.saleAttrValueName }}</el-tag
          >
        </el-form-item>
      </el-form>
      <div v-if="skuDetailInfo.skuImageList?.length">
        <span class="text-[#606266] text-[14px]">SPU图片列表</span>
        <el-carousel indicator-position="none" :interval="4000" type="card" height="200px" autoplay>
          <el-carousel-item
            class="rounded-lg"
            v-for="item in skuDetailInfo.skuImageList"
            :key="item.id"
          >
            <img
              class="object-cover w-full h-full"
              :src="settings.imgPrefixUrl + item.imgUrl?.split('/api')[1]"
              alt=""
            />
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-drawer>
  </div>
</template>

<style scoped lang="sass"></style>
