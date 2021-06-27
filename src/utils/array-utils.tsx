import { ICategory } from 'models/categories'
import { IProduct } from 'models/product'

export const orderAscByName = (
  a: ICategory | IProduct,
  b: ICategory | IProduct
) => {
  if (a.name < b.name) {
    return -1
  }
  if (a.name > b.name) {
    return 1
  }
  return 0
}
