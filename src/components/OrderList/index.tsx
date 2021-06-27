import * as S from 'styles/content-base'

import { useEffect, useState } from 'react'
import ContentAPI from 'services/content-api'

import Loader from 'components/Loader'
import Bill from 'components/Bill'
import Button from '@material-ui/core/Button'

import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { useRouter } from 'next/router'

import { Color } from 'models/form'
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
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [messageAlert, setMessageAlert] = useState<string>('')
  const [filterState, setFilterState] = useState<string>('all')
  const [severityAlert, setSeverityAlert] = useState<Color>('success')

  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  const editRecord = (id: string) => {
    router.push({
      pathname: `/${PLURAL_COMPONENT_NAME}/editar/${id}`
    })
  }
  const removeRecord = (id: string): void => {
    try {
      const recordsUpdated = records.filter((record: ICategory) => {
        return record && record.id !== id
      })
      setRecords(recordsUpdated)
    } catch (e) {
      console.log(e)
    }
  }

  const deleteRecord = (id: string) => {
    setLoading(true)
    ContentAPI.delete(`/${BASE_NAME_END_POINT}/${id}`)
      .then(() => {
        setLoading(false)
        setOpenAlert(true)
        setMessageAlert('Se eliminó correctamente.')
        setSeverityAlert('success')
        removeRecord(id)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
        setOpenAlert(true)
        setMessageAlert('Ocurrió un error al eliminar el registro.')
        setSeverityAlert('error')
      })
  }

  const getRecords = () => {
    ContentAPI.get<ICategory[]>(`/${BASE_NAME_END_POINT}`)
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
    const name = event.target.name
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
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity={severityAlert}>
          {messageAlert}
        </Alert>
      </Snackbar>
    </S.Wrapper>
  )
}

export default OrderList
