/**
 * model.Role
 */
export interface ModelRole {
  createTime?: SimpleDateFormatSimpleDateFormat
  ID?: number
  id?: number
  remark?: string
  roleName?: string
  updateTime?: SimpleDateFormatSimpleDateFormat
}

/**
 * SimpleDateFormat.SimpleDateFormat
 */
export interface SimpleDateFormatSimpleDateFormat {
  'time.Time'?: string
}

/**
 * model.Menu
 */
export interface ModelMenu {
  children?: ModelMenu[]
  code?: string
  createTime?: SimpleDateFormatSimpleDateFormat
  ID?: number
  id?: number
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
