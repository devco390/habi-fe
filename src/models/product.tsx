import { IIngredient } from './ingredients'

export interface IProduct {
  id?: string
  name: string
  price: number
  ingredients: IIngredient[]
}
