/**
 * model.Menu
 */
export interface ModelMenu {
  children?: ModelMenu[]
  code?: string
  createTime?: SimpleDateFormatSimpleDateFormat
  ID?: number
  id?: number | null
  level?: number
  name?: string
  pid?: number
  select?: boolean
  status?: string
  toCode?: string
  type?: number
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

// 新增菜单所需要的类型
export interface AddMenu {
  id: number | null
  code: string
  level: number
  name: string
  pid: number
  /**
   * 菜单类型 1:菜单 2:功能
   */
  type: number
}
