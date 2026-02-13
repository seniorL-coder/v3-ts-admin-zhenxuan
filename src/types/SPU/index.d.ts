/**
 * model.ResponseSpuList
 */
export interface ResponseSpuList {
  current?: number
  pages?: number
  records?: ModelSpu[]
  searchCount?: boolean
  size?: number
  total?: number
  [property: string]: any
}

/**
 * model.Spu
 */
export interface ModelSpu {
  category3Id?: number
  createTime?: SimpleDateFormatSimpleDateFormat
  description?: string
  ID?: number
  id?: number
  spuImageList?: ModelSpuImage[]
  spuName?: string
  spuSaleAttrList?: ModelSpuSaleAttr[]
  tmId?: number
  updateTime?: SimpleDateFormatSimpleDateFormat
  [property: string]: any
}

/**
 * SimpleDateFormat.SimpleDateFormat
 */
export interface SimpleDateFormatSimpleDateFormat {
  'time.Time'?: string
  [property: string]: any
}

/**
 * model.SpuImage
 */
export interface ModelSpuImage {
  createTime?: SimpleDateFormatSimpleDateFormat
  ID?: number
  id?: number
  imgName?: string
  imgUrl?: string
  spuId?: number
  updateTime?: SimpleDateFormatSimpleDateFormat
  [property: string]: any
}

/**
 * model.SpuSaleAttr
 */
export interface ModelSpuSaleAttr {
  baseSaleAttrId?: number
  id?: number
  saleAttrName?: string
  spuId?: number
  spuSaleAttrValueList?: ModelSaleAttrValue[]
  [property: string]: any
}

/**
 * model.SaleAttrValue
 */
export interface ModelSaleAttrValue {
  baseSaleAttrId?: number
  createTime?: SimpleDateFormatSimpleDateFormat
  ID?: number
  id?: number
  saleAttrValueName?: string
  spuId?: number
  updateTime?: SimpleDateFormatSimpleDateFormat
  [property: string]: any
}

/**
 * model.SpuImage
 */
export interface ModelSpuImage {
  createTime?: SimpleDateFormatSimpleDateFormat
  ID?: number
  id?: number
  imgName?: string
  imgUrl?: string
  spuId?: number
  updateTime?: SimpleDateFormatSimpleDateFormat
  [property: string]: any
}

/**
 * model.SaleAttr 所有销售列表
 */
export interface ModelSaleAttr {
  createTime?: SimpleDateFormatSimpleDateFormat
  ID?: number
  /**
   * 销售属性ID
   */
  id?: number
  /**
   * 销售属性名称
   */
  name?: string
  updateTime?: SimpleDateFormatSimpleDateFormat
  [property: string]: any
}

/**
 * model.SpuSaleAttr 商品销售属性列表
 */
export interface ModelSpuSaleAttr {
  baseSaleAttrId?: number
  id?: number
  saleAttrName?: string
  spuId?: number
  spuSaleAttrValueList?: ModelSaleAttrValue[]
  [property: string]: any
}

/**
 * model.SaleAttrValue
 */
export interface ModelSaleAttrValue {
  baseSaleAttrId?: number
  createTime?: SimpleDateFormatSimpleDateFormat
  ID?: number
  id?: number
  saleAttrValueName?: string
  spuId?: number
  updateTime?: SimpleDateFormatSimpleDateFormat
  [property: string]: any
}
