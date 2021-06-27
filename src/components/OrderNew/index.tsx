import ContentAPI from 'services/content-api'

import { Color } from 'models/form'
import { useState } from 'react'
import Loader from 'components/Loader'

import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

import { useRouter } from 'next/router'
import OrderForm from 'components/OrderForm'
import { IOrder, ORDER_STATES } from 'models/order'
import useUser from 'hooks/useUser'

const PLURAL_COMPONENT_NAME = 'pedidos'
const BASE_NAME_END_POINT = 'orders'

const makeId = (length: number): string => {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const OrderNew = () => {
  const router = useRouter()
  const { user } = useUser()

  const [loading, setLoading] = useState<boolean>(false)
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [messageAlert, setMessageAlert] = useState<string>('')
  const [severityAlert, setSeverityAlert] = useState<Color>('success')

  const initialState: IOrder = {
    id: undefined,
    code: `OR-${makeId(5)}`,
    categories: [],
    client: {
      name: '',
      phone: 0
    },
    user: user,
    state: 'in_progress' as ORDER_STATES
  }

  const onHandleSubmit = (data: IOrder) => {
    setLoading(true)
    ContentAPI.post(`/${BASE_NAME_END_POINT}`, data)
      .then(() => {
        setLoading(false)
        setOpenAlert(true)
        setMessageAlert('Se guardó correctamente.')
        setSeverityAlert('success')
        router.push({
          pathname: `/${PLURAL_COMPONENT_NAME}`
        })
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
        setOpenAlert(true)
        setMessageAlert('Ocurrió un error al guardar el registro.')
        setSeverityAlert('error')
      })
  }

  return (
    <>
      <Loader loading={loading} />
      {user && (
        <OrderForm
          initialState={{ ...initialState, user }}
          handleSubmit={onHandleSubmit}
        />
      )}

      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={() => {
          setOpenAlert(false)
        }}
      >
        <Alert
          onClose={() => {
            setOpenAlert(false)
          }}
          severity={severityAlert}
        >
          {messageAlert}
        </Alert>
      </Snackbar>
    </>
  )
}

export default OrderNew
