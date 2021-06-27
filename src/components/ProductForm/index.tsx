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
import { IProduct } from 'models/product'
import { IIngredient } from 'models/ingredients'
import Loader from 'components/Loader'
import Chip from '@material-ui/core/Chip'

const PLURAL_COMPONENT_NAME = 'productos'
const SINGULAR_COMPONENT_NAME = 'producto'

export type ProductFormProps = {
  initialState: IProduct
  handleSubmit: (data: IProduct) => void
}

const ProductForm = ({ initialState, handleSubmit }: ProductFormProps) => {
  const router = useRouter()
  const [state, setState] = useState<IProduct>(initialState)
  const [loading, setLoading] = useState<boolean>(false)
  const [ingredients, setIngredients] = useState([])

  const [errorPrice, setErrorPrice] = useState<boolean>(false)
  const [errorName, setErrorName] = useState<boolean>(false)

  const getIngredients = () => {
    setLoading(true)
    ContentAPI.get<IIngredient[]>(`/ingredients`)
      .then(({ data: { data } }: any) => {
        setLoading(false)
        setIngredients(data)
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

  const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setErrorPrice(!validateMandatory(value))
    const price = value as unknown as number
    setState({ ...state, price })
  }

  const validateForm = (): boolean => {
    return (
      validateMandatory(state.name) &&
      state.price > 0 &&
      state.ingredients.length > 0
    )
  }

  const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(state)
    handleSubmit(state)
  }

  const addIngredient = (id: string) => {
    const data = ingredients.filter((item: IIngredient) => {
      return item.id === id
    })

    const ingredientsUpdated = [...state.ingredients, data[0]]

    setState({ ...state, ingredients: ingredientsUpdated as IIngredient[] })
  }

  const removeChip = (id: string) => {
    const data = state.ingredients
      .filter((item: IIngredient) => {
        return item.id !== id
      })
      .map(({ id, name, price }: IIngredient) => {
        return { id, name, price }
      })

    setState({ ...state, ingredients: data as IIngredient[] })
  }

  const renderCell = (params: CellParams) => (
    <>
      <IconButton
        aria-label="remove"
        color="primary"
        onClick={() => {
          addIngredient(params.value as string)
        }}
      >
        <AddCircleIcon />
      </IconButton>
    </>
  )

  const columns: ColDef[] = [
    {
      field: 'id',
      headerName: 'Acciones',
      renderCell: renderCell,
      width: 150,
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
    }
  ]

  useEffect(() => {
    getIngredients()
  }, [])

  useEffect(() => {
    const prices = state.ingredients.map((item: IIngredient) => {
      return item.price
    })
    let price = 0
    if (prices.length > 0) {
      price = prices.reduce((accumulator: number, currentValue: number) => {
        return (
          parseInt(accumulator as unknown as string, 10) +
          parseInt(currentValue as unknown as string, 10)
        )
      })
    }
    setState({ ...state, price })
  }, [state.ingredients])

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
        <div>
          <TextField
            id="price"
            error={errorPrice}
            required
            type="number"
            label="Precio"
            helperText={errorPrice && 'Campo obligatorio.'}
            variant="filled"
            value={state.price}
            onChange={handleChangePrice}
            InputProps={{
              readOnly: true
            }}
          />
        </div>
      </S.WrapperInputs>
      {state.ingredients.length > 0 && (
        <S.WrapperChips>
          {state.ingredients.map((item: IIngredient) => {
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
        <S.TitleAdd>Agregar Ingredientes</S.TitleAdd>
        <S.WrapperGrid style={{ height: 300, width: 550 }}>
          <DataGrid
            columns={columns}
            rows={ingredients.filter((item: IIngredient) => {
              const exits = state.ingredients.filter((nose) => {
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

export default ProductForm
