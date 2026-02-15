/**
 * model.SkuInfo
 */
export interface SkuInfo {
  category3Id?: string
  id?: number
  isSale?: number
  price?: string
  skuAttrValueList?: ModelSkuAttrValueDTO[]
  skuDefaultImg?: string
  skuDesc?: string
  skuImageList?: ModelSkuImgDTO[]
  skuName?: string
  skuSaleAttrValueList?: ModelSkuSaleAttrValueDTO[]
  spuID?: string
  tmId?: string
  weight?: string
  [property: string]: any
}

/**
 * model.SkuAttrValueDTO
 */
export interface ModelSkuAttrValueDTO {
  /**
   * 平台属性ID
   */
  attrId?: string
  attrName?: string
  id?: number
  skuId?: number
  /**
   * 属性值ID
   */
  valueId?: string
  valueName?: string
  [property: string]: any
}

/**
 * model.SkuImgDTO
 */
export interface ModelSkuImgDTO {
  id?: number
  imgName?: string
  imgUrl?: string
  isDefault?: string
  skuId?: number
  spuImgId?: number
  [property: string]: any
}

/**
 * model.SkuSaleAttrValueDTO
 */
export interface ModelSkuSaleAttrValueDTO {
  id?: number
  /**
   * 销售属性ID
   */
  saleAttrId?: string
  saleAttrName?: string
  saleAttrValueId?: string
  saleAttrValueName?: string
  skuId?: number
  [property: string]: any
}
