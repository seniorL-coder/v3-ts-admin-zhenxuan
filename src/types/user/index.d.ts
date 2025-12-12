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
