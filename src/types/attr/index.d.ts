/**
 * model.Trademark
 */
export interface ModelGetCategory {
  id: number
  name: string
}

/**
 * 分类下已有的属性与属性值 类型
 */
export interface ModelAttrInfo {
  id: number
  attrName: string
  attrValueList: attrValueListType[]
  categoryId: number
  categoryLevel: number
}

/**
 * SimpleDateFormat.SimpleDateFormat
 */
interface attrValueListType {
  id?: number
  valueName: string
  attrId: number
}

/**
 * 添加或者修改已有的属性类型
 */
export interface AttrAddAndEditInfoType {
  /**
   * 属性名称
   */
  attrName: string
  /**
   * 属性值列表
   */
  attrValueList: ModelAttrValue[]
  /**
   * 三级分类ID
   */
  categoryId: number
  /**
   * 分类级别
   */
  categoryLevel: number
  createTime?: SimpleDateFormatSimpleDateFormat
  ID?: number
  /**
   * 属性ID
   */
  id?: number
  updateTime?: SimpleDateFormatSimpleDateFormat
  [property: string]: any
}

/**
 * model.AttrValue
 */
export interface ModelAttrValue {
  attrId?: number
  id?: number
  /**
   * 是否禁用输入框, 自定义属性字段
   */
  disabled?: boolean
  valueName: string
}

/**
 * SimpleDateFormat.SimpleDateFormat
 */
export interface SimpleDateFormatSimpleDateFormat {
  'time.Time'?: string
}
