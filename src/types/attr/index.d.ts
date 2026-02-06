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
  id: number
  valueName: string
  attrId: number
}
