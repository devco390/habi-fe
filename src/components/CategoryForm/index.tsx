import * as S from './styles'

import ContentAPI from 'services/content-api'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import Button from '@material-ui/core/Button'
import AddCircleIcon from '@material-ui/icons/AddCircle'

import { DataGrid, ColDef, CellParams } from '@material-ui/data-grid'
import { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'

import { useRouter } from 'next/router'
import { ICategory } from 'models/categories'
import { IProduct } from 'models/product'
import Loader from 'components/Loader'
import Chip from '@material-ui/core/Chip'
import { IIngredient } from 'models/ingredients'

const PLURAL_COMPONENT_NAME = 'categorias'
const SINGULAR_COMPONENT_NAME = 'categoría'

export type CategoryFormProps = {
  initialState: ICategory
  handleSubmit: (data: ICategory) => void
}

const CategoryForm = ({ initialState, handleSubmit }: CategoryFormProps) => {
  const router = useRouter()
  const [state, setState] = useState<ICategory>(initialState)
  const [loading, setLoading] = useState<boolean>(false)
  const [products, setCategories] = useState([])
  const [errorName, setErrorName] = useState<boolean>(false)

  const getProducts = () => {
    setLoading(true)
    ContentAPI.get<IProduct[]>(`/products`)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then(({ data: { data } }: any) => {
        setLoading(false)
        setCategories(data)
      })
      .catch((e) => {
        setLoading(false)
        console.log(e)
      })
  }

  const validateMandatory = (value: string): boolean => {
    return value !== undefined && value.trim().length > 0
  }

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setErrorName(!validateMandatory(value))
    setState({ ...state, name: value })
  }

  const validateForm = (): boolean => {
    return validateMandatory(state.name) && state.products.length > 0
  }

  const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(state)
    handleSubmit(state)
  }

  const addProduct = (id: string) => {
    const data = products.filter((item: IProduct) => {
      return item.id === id
    })

    const productsUpdated = [...state.products, data[0]]

    setState({ ...state, products: productsUpdated as IProduct[] })
  }

  const removeChip = (id: string) => {
    const data = state.products
      .filter((item: IProduct) => {
        return item.id !== id
      })
      .map(({ id, name, price }: IProduct) => {
        return { id, name, price }
      })

    setState({ ...state, products: data as IProduct[] })
  }

  const renderCell = (params: CellParams) => (
    <>
      <IconButton
        aria-label="remove"
        color="primary"
        onClick={() => {
          addProduct(params.value as string)
        }}
      >
        <AddCircleIcon />
      </IconButton>
    </>
  )

  const renderCellIngredients = (params: CellParams) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const text = ((params.value as any[]) || [])
      .map((item: IIngredient) => {
        return item.name
      })
      .join(', ')
    return <span>{text}</span>
  }

  const columns: ColDef[] = [
    {
      field: 'id',
      headerName: 'Acciones',
      renderCell: renderCell,
      width: 100,
      sortable: false
    },
    {
      field: 'name',
      headerName: 'Nombre',
      width: 200
    },
    {
      field: 'price',
      headerName: 'precio',
      width: 200
    },
    {
      field: 'ingredients',
      headerName: 'Ingredientes',
      width: 200,
      renderCell: renderCellIngredients
    }
  ]

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <S.Wrapper noValidate autoComplete="off" onSubmit={onHandleSubmit}>
      <Loader loading={loading} />
      <S.Header>
        <div>
          <IconButton
            aria-label="edit"
            title={'Volver'}
            onClick={() => {
              router.push({
                pathname: `/${PLURAL_COMPONENT_NAME}`
              })
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <h1>
            {state.id ? 'Editar' : 'Crear'} {SINGULAR_COMPONENT_NAME}
          </h1>
        </div>

        <Button
          variant="contained"
          color="primary"
          type={'submit'}
          disabled={!validateForm()}
        >
          Guardar
        </Button>
      </S.Header>

      <S.WrapperInputs>
        <div>
          <TextField
            error={errorName}
            required
            id="name"
            label="Nombre"
            helperText={errorName && 'Campo obligatorio.'}
            variant="filled"
            value={state.name}
            onChange={handleChangeName}
          />
        </div>
      </S.WrapperInputs>
      {state.products.length > 0 && (
        <S.WrapperChips>
          {state.products.map((item: IProduct) => {
            return (
              <Chip
                key={item.id}
                label={`${item.name} - $ ${new Intl.NumberFormat().format(
                  item.price
                )}`}
                onDelete={() => {
                  removeChip(item.id as string)
                }}
                color="primary"
              />
            )
          })}
        </S.WrapperChips>
      )}

      <div>
        <S.TitleAdd>Agregar Productos</S.TitleAdd>
        <S.WrapperGrid style={{ height: 300, width: 550 }}>
          <DataGrid
            columns={columns}
            rows={products.filter((item: IProduct) => {
              const exits = state.products.filter((nose) => {
                return nose.id === item.id
              })

              return exits.length === 0
            })}
          />
        </S.WrapperGrid>
      </div>
    </S.Wrapper>
  )
}

export default CategoryForm
