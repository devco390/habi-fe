import { useState } from 'react'

import * as S from './styles'

import { ICategory } from 'models/categories'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import { IProduct } from 'models/product'
import { orderAscByName } from 'utils/array-utils'

interface IControlOpenCategory {
  id: string
  open: boolean
}

export interface IMenuControlAction {
  category: ICategory
  product: IProduct
  add: boolean
}

export type MenuControlProps = {
  categories: ICategory[]
  onHandleProductSelected: (data: IMenuControlAction) => void
}

const MenuControl = ({
  categories,
  onHandleProductSelected
}: MenuControlProps) => {
  const [categoryControlOpen, setCategoryControlOpen] = useState<
    IControlOpenCategory[]
  >([])

  const handleClickOpenCategory = (id: string) => {
    const categoryControl: IControlOpenCategory[] = categoryControlOpen.filter(
      (control: IControlOpenCategory) => {
        return control.id === id
      }
    )

    const controls: IControlOpenCategory[] = [
      ...categoryControlOpen.filter((item: IControlOpenCategory) => {
        return item.id !== id
      }),
      {
        id,
        open: categoryControl.length === 0 ? true : !categoryControl[0].open
      }
    ]

    setCategoryControlOpen(controls)
  }

  const isCategoryOpen = (id: string): boolean => {
    const categoryControl: IControlOpenCategory[] = categoryControlOpen.filter(
      (control: IControlOpenCategory) => {
        return control.id === id
      }
    )
    return categoryControl.length === 0 ? false : categoryControl[0].open
  }

  const lessProduct = (category: ICategory, product: IProduct) => {
    onHandleProductSelected({ category, product, add: false })
  }

  const addProduct = (category: ICategory, product: IProduct) => {
    onHandleProductSelected({ category, product, add: true })
  }

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      style={{ width: '100%' }}
    >
      {categories.map((category: ICategory) => {
        return (
          <div key={category.id}>
            <ListItem
              button
              onClick={() => {
                handleClickOpenCategory(category.id as string)
              }}
            >
              <ListItemText>
                <S.CategoryTitle>{category.name}</S.CategoryTitle>
              </ListItemText>
              {isCategoryOpen(category.id as string) ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )}
            </ListItem>
            <Collapse
              in={isCategoryOpen(category.id as string)}
              timeout="auto"
              unmountOnExit
            >
              {category.products
                .sort(orderAscByName)
                .map((product: IProduct) => {
                  return (
                    <List key={product.id} component="div" disablePadding>
                      <ListItem button>
                        <ListItemText>
                          <S.WrapperProductItem>
                            <span>
                              {product.name} - ${' '}
                              {new Intl.NumberFormat().format(product.price)}
                            </span>
                            <ButtonGroup size="small" color="primary">
                              <Button
                                onClick={() => {
                                  lessProduct(category, product)
                                }}
                              >
                                <RemoveCircleOutlineIcon />
                              </Button>
                              <Button
                                onClick={() => {
                                  addProduct(category, product)
                                }}
                              >
                                <AddCircleOutlineIcon />
                              </Button>
                            </ButtonGroup>
                          </S.WrapperProductItem>
                        </ListItemText>
                      </ListItem>
                    </List>
                  )
                })}
            </Collapse>
          </div>
        )
      })}
    </List>
  )
}

export default MenuControl
