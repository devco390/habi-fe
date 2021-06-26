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
import { IOrder } from 'models/order'
import { IIngredient } from 'models/ingredients'
import Loader from 'components/Loader'
import Chip from '@material-ui/core/Chip'

const PLURAL_COMPONENT_NAME = 'productos'
const SINGULAR_COMPONENT_NAME = 'producto'

export type OrderFormProps = {
  initialState: IOrder
  handleSubmit: (data: IOrder) => void
}

const OrderForm = ({ initialState, handleSubmit }: OrderFormProps) => {
  const router = useRouter()
  const [state, setState] = useState<IOrder>(initialState)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {}, [])

  const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(state)
    handleSubmit(state)
  }

  return (
    <S.Wrapper noValidate autoComplete="off" onSubmit={onHandleSubmit}>
      <Loader loading={loading} />
      <h1>SIIU</h1>
    </S.Wrapper>
  )
}

export default OrderForm
