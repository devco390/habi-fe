import * as S from 'styles/content-base'

import { useEffect, useState } from 'react'
import ContentAPI from 'services/content-api'

import Loader from 'components/Loader'
import Bill from 'components/Bill'
import Button from '@material-ui/core/Button'

import { useRouter } from 'next/router'

import { ICategory } from 'models/categories'
import { IOrder } from 'models/order'
import EditIcon from '@material-ui/icons/Edit'

import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { ORDER_STATES } from 'models/order'
import { enumToArray } from 'utils/enum-utils'

const SINGULAR_COMPONENT_NAME = 'pedido'
const PLURAL_COMPONENT_NAME = 'pedidos'
const BASE_NAME_END_POINT = 'orders'

const OrderList = () => {
  const router = useRouter()
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState<boolean>(true)
  const [filterState, setFilterState] = useState<string>('all')

  const editRecord = (id: string) => {
    router.push({
      pathname: `/${PLURAL_COMPONENT_NAME}/editar/${id}`
    })
  }

  const getRecords = () => {
    ContentAPI.get<ICategory[]>(`/${BASE_NAME_END_POINT}`)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then(({ data: { data } }: any) => {
        setLoading(false)
        setRecords(data)
      })
      .catch((e) => {
        setLoading(false)
        console.log(e)
      })
  }

  const redirectNewForm = () => {
    router.push({
      pathname: `/${PLURAL_COMPONENT_NAME}/nuevo`
    })
  }

  const handleChangeSelect = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    setFilterState(event.target.value as string)
  }

  useEffect(() => {
    getRecords()
  }, [])

  return (
    <S.Wrapper>
      <Loader loading={loading} />
      <S.WrapperAction style={{ width: 850 }}>
        <S.Title>{PLURAL_COMPONENT_NAME}</S.Title>
        <Button variant="contained" color="primary" onClick={redirectNewForm}>
          Crear {SINGULAR_COMPONENT_NAME}
        </Button>
      </S.WrapperAction>
      <S.Filters>
        <FormControl variant="filled">
          <InputLabel htmlFor="state">Estado</InputLabel>
          <Select
            native
            value={filterState}
            onChange={handleChangeSelect}
            inputProps={{
              name: 'state',
              id: 'state'
            }}
          >
            <option value={'all'}>Todos</option>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {enumToArray(ORDER_STATES).map((state: any) => {
              return (
                <option key={state.value} value={state.value}>
                  {state.text}
                </option>
              )
            })}
          </Select>
        </FormControl>
      </S.Filters>
      <S.WrapperGrid className="orders">
        {records
          .filter((order: IOrder) => {
            if (filterState === 'in_progress') {
              return order.state === ('in_progress' as ORDER_STATES)
            } else if (filterState === 'closed') {
              return order.state === ('closed' as ORDER_STATES)
            }
            return true
          })
          .map((order: IOrder) => {
            return (
              <Bill key={order.id} order={order} showExpand={true}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<EditIcon />}
                  style={{ marginLeft: '1rem' }}
                  onClick={() => {
                    editRecord(order.id as string)
                  }}
                >
                  Editar
                </Button>
              </Bill>
            )
          })}
      </S.WrapperGrid>
    </S.Wrapper>
  )
}

export default OrderList
