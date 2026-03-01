export interface loginParamsType {
  username: string
  password: string
}

/**
 * 用户信息类型
 */
export interface UserInfoType {
  avatar?: string
  buttons?: string[]
  name?: string
  roles?: string[]
  routes?: string[]
  [property: string]: any
}

/**
 * model.ResponseUser
 */
export interface ModelResponseUser {
  createTime?: SimpleDateFormatSimpleDateFormat
  ID?: number
  id?: number
  name?: string
  password?: string
  phone?: string
  roleName?: string
  updateTime?: SimpleDateFormatSimpleDateFormat
  username?: string
  [property: string]: any
}

/**
 * SimpleDateFormat.SimpleDateFormat
 */
export interface SimpleDateFormatSimpleDateFormat {
  'time.Time'?: string
  [property: string]: any
}
