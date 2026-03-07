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

/**
 * SimpleDateFormat.SimpleDateFormat
 */
export interface SimpleDateFormatSimpleDateFormat {
  'time.Time'?: string
  [property: string]: any
}
