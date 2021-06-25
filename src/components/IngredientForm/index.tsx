import * as S from './styles'

import IconButton from '@material-ui/core/IconButton'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import Button from '@material-ui/core/Button'

import { useState } from 'react'
import TextField from '@material-ui/core/TextField'

import { useRouter } from 'next/router'
import { IIngredient } from 'models/ingredients'

const PLURAL_COMPONENT_NAME = 'ingredientes'
const SINGULAR_COMPONENT_NAME = 'ingrediente'

export type IngredientFormProps = {
  initialState: IIngredient
  handleSubmit: (data: IIngredient) => void
}

const IngredientForm = ({
  initialState,
  handleSubmit
}: IngredientFormProps) => {
  const router = useRouter()
  const [state, setState] = useState<IIngredient>(initialState)

  const [errorPrice, setErrorPrice] = useState<boolean>(false)
  const [errorName, setErrorName] = useState<boolean>(false)

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
      validateMandatory(state.name) && validateMandatory(state.price.toString())
    )
  }

  const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(state)
    handleSubmit(state)
  }

  return (
    <S.Wrapper noValidate autoComplete="off" onSubmit={onHandleSubmit}>
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
          />
        </div>
      </S.WrapperInputs>
    </S.Wrapper>
  )
}

export default IngredientForm
