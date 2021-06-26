import ContentAPI from 'services/content-api'

import { Color } from 'models/form'
import { useState } from 'react'
import Loader from 'components/Loader'

import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

import { useRouter } from 'next/router'
import { IProduct } from 'models/product'
import OrderForm from 'components/OrderForm'
import { IOrder } from 'models/order'

const PLURAL_COMPONENT_NAME = 'pedidos'
const BASE_NAME_END_POINT = 'orders'

const initialState: IOrder = {
  id: undefined
}

const OrderNew = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [messageAlert, setMessageAlert] = useState<string>('')
  const [severityAlert, setSeverityAlert] = useState<Color>('success')

  const onHandleSubmit = (data: IProduct) => {
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
      <OrderForm initialState={initialState} handleSubmit={onHandleSubmit} />
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
