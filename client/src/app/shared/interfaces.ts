export interface User {
  email: string
  password: string
}

export interface Message {
  message: string
}

export interface Category {
  name: string
  imageSrc?: string
  user?: string
  _id?: string
}

export interface Position {
  name: string
  cost: number
  category: string
  user?: string
  _id?: string
  quantity?: number
}

export interface Order {
  list: OrderPosition[]
  _id?: string
  date?: Date
  user?: string
  order?: number
}

export interface OrderPosition {
  name: string
  cost: number
  quantity: number
  _id?: string
}

export interface Filter {
  start?: Date
  end?: Date
  order?: number
}

export interface OverviewPageItem {
  percent: number
  compare: number
  yesterday: number
  isHigher: boolean
}

export interface OverviewPage {
  orders: OverviewPageItem
  gain: OverviewPageItem
}

export interface AnalyticsPage {
  average: number
  chart: AnalyticsChartItem[]
}

export interface AnalyticsChartItem {
  gain: number
  order: number
  label: string
}
