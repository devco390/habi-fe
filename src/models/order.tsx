import { IProduct } from './product'
import { IUser } from './user'

export interface IProductQuantity extends IProduct {
  quantity: number
}

export interface IClient {
  name: string
  phone?: number
}

export interface ICategoryGroup {
  id: string
  name: string
  products: IProductQuantity[]
}

export enum ORDER_STATES {
  in_progress = 'En progreso',
  closed = 'Cerrada'
}

export interface IOrder {
  id?: string
  code: string
  categories: ICategoryGroup[]
  client: IClient
  user: IUser | null | undefined
  state: ORDER_STATES
  createdAt?: Date
}
