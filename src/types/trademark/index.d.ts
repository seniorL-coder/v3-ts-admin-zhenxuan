export interface FetchTrademarkParams {
  page: number
  limit: number
}

/**
 * model.Trademark
 */
export interface ModelTrademark {
  createTime?: SimpleDateFormatSimpleDateFormat
  ID?: number
  id?: number
  logoUrl?: string
  tmName?: string
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
