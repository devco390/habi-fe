import * as S from './styles'

import { useEffect, useState } from 'react'
import ContentAPI from 'services/content-api'

import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { useRouter } from 'next/router'
import {
  ICategoryGroup,
  IOrder,
  IProductQuantity,
  ORDER_STATES
} from 'models/order'
import Loader from 'components/Loader'
import TextField from '@material-ui/core/TextField'

import { ICategory } from 'models/categories'
import { orderAscByName } from 'utils/array-utils'

import MenuControl, { IMenuControlAction } from 'components/MenuControl'
import { IProduct } from 'models/product'
import { enumToArray } from 'utils/enum-utils'
import Bill from 'components/Bill'

export type OrderFormProps = {
  initialState: IOrder
  handleSubmit: (data: IOrder) => void
}

const OrderForm = ({ initialState, handleSubmit }: OrderFormProps) => {
  const [errorPhone, setErrorPhone] = useState<boolean>(false)
  const [errorName, setErrorName] = useState<boolean>(false)
  const [state, setState] = useState<IOrder>(initialState)
  const router = useRouter()

  const [categories, setCategories] = useState<ICategory[]>([])

  const [loading, setLoading] = useState<boolean>(false)

  const getCategories = () => {
    ContentAPI.get<ICategory[]>(`/categories`)
      .then(({ data: { data } }: any) => {
        setLoading(false)
        setCategories(data.sort(orderAscByName))
      })
      .catch((e) => {
        setLoading(false)
        console.log(e)
      })
  }

  useEffect(() => {
    getCategories()
  }, [])

  const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(state)
    handleSubmit(state)
  }

  const addLessQuantity = (
    { quantity }: IProductQuantity,
    add: boolean
  ): number => {
    return add ? quantity + 1 : quantity - 1
  }

  const getProductQuantity = (
    productIdToAdd: string,
    currentProductsInCategory: IProductQuantity[],
    add: boolean
  ): number => {
    const existingProduct = currentProductsInCategory.filter(
      (product: IProductQuantity) => {
        return product.id === productIdToAdd
      }
    )[0]
    return existingProduct === undefined
      ? add
        ? 1
        : 0
      : addLessQuantity(existingProduct, add)
  }

  const getProductsUpdated = (
    productsToAdd: IProduct,
    currentProductsInCategory: IProductQuantity[],
    add: boolean
  ): IProductQuantity[] => {
    const quantity = getProductQuantity(
      productsToAdd.id as string,
      currentProductsInCategory,
      add
    )

    const productUpdated = { ...productsToAdd, quantity }

    const productWithoutProductUpdated = currentProductsInCategory.filter(
      (product: IProductQuantity) => {
        return product.id !== productUpdated.id
      }
    )

    const productsUpdated =
      quantity <= 0
        ? [...productWithoutProductUpdated]
        : [...productWithoutProductUpdated, productUpdated]

    return productsUpdated
  }

  const getProductsByCategory = (
    categoryId: string,
    categoriesData: ICategoryGroup[]
  ): IProductQuantity[] => {
    const categoriesFiltered = categoriesData.filter(
      (category: ICategoryGroup) => {
        return category.id === categoryId
      }
    )

    return categoriesFiltered.length === 0 ? [] : categoriesFiltered[0].products
  }

  const handleProductSelected = (data: IMenuControlAction) => {
    const existingProducts = getProductsByCategory(
      data.category.id as string,
      state.categories
    )

    const productsQuantityToAdd = getProductsUpdated(
      data.product,
      existingProducts,
      data.add
    )

    const categoryToAdd: ICategoryGroup = {
      id: data.category.id as string,
      name: data.category.name,
      products: productsQuantityToAdd
    }

    const categoriesWithoutCategoryToAdd = state.categories.filter(
      (category: ICategoryGroup) => {
        return category.id !== categoryToAdd.id
      }
    )

    const categoriesUpdated =
      categoryToAdd.products.length > 0
        ? [...categoriesWithoutCategoryToAdd, categoryToAdd]
        : [...categoriesWithoutCategoryToAdd]

    setState({
      ...state,
      categories: categoriesUpdated
    })
  }

  const validateMandatory = (data: string | undefined): boolean => {
    return data !== undefined && data.toString().trim().length > 0
  }

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setErrorName(!validateMandatory(value))
    setState({ ...state, client: { ...state.client, name: value } })
  }

  const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setErrorPhone(!validateMandatory(value))
    setState({ ...state, client: { ...state.client, phone: parseInt(value) } })
  }
  const handleChangeSelect = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof state
    setState({
      ...state,
      [name]: event.target.value
    })
  }

  const validateForm = (): boolean => {
    const phone =
      state.client.phone === undefined ? '' : state.client.phone.toString()
    return (
      validateMandatory(state.client.name) &&
      validateMandatory(phone) &&
      state.categories.length > 0
    )
  }

  return (
    <S.Wrapper noValidate autoComplete="off" onSubmit={onHandleSubmit}>
      <Loader loading={loading} />
      <S.Actions>
        <IconButton
          aria-label="edit"
          title={'Volver'}
          onClick={() => {
            router.push({
              pathname: `/pedidos`
            })
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <div>
          <TextField
            error={errorName}
            required
            id="name"
            label="Nombre"
            helperText={errorName && 'Campo obligatorio.'}
            variant="filled"
            value={state.client.name}
            onChange={handleChangeName}
          />
        </div>
        <div>
          <TextField
            error={errorPhone}
            required
            type="number"
            id="phone"
            label="Teléfono"
            helperText={errorName && 'Campo obligatorio.'}
            variant="filled"
            value={
              state.client.phone === 0 || !state.client.phone
                ? ''
                : state.client.phone
            }
            onChange={handleChangePhone}
          />
        </div>
        <FormControl variant="filled">
          <InputLabel htmlFor="state">Estado</InputLabel>
          <Select
            native
            value={state.state}
            onChange={handleChangeSelect}
            inputProps={{
              name: 'state',
              id: 'state'
            }}
          >
            {enumToArray(ORDER_STATES).map((state: any) => {
              return (
                <option key={state.value} value={state.value}>
                  {state.text}
                </option>
              )
            })}
          </Select>
        </FormControl>
        <S.WrapperButton>
          <Button
            variant="contained"
            color="primary"
            type={'submit'}
            disabled={!validateForm()}
          >
            Guardar
          </Button>
        </S.WrapperButton>
      </S.Actions>
      <S.Content>
        <S.WrapperControl>
          <h1>Menu</h1>
          {categories.length > 0 && (
            <div>
              <MenuControl
                categories={categories}
                onHandleProductSelected={handleProductSelected}
              />
            </div>
          )}
        </S.WrapperControl>
        <S.WrapperBill>
          <Bill order={state} />
        </S.WrapperBill>
      </S.Content>
    </S.Wrapper>
  )
}

export default OrderForm
