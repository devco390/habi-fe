import ContentAPI from 'services/content-api'

import { Color } from 'models/form'
import { useEffect, useState } from 'react'
import Loader from 'components/Loader'

import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import ProductForm from 'components/ProductForm'
import { IProduct } from 'models/product'

type ProductEditProps = {
  id: string
}

const BASE_NAME_END_POINT = 'products'

const ProductEdit = ({ id }: ProductEditProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [messageAlert, setMessageAlert] = useState<string>('')
  const [severityAlert, setSeverityAlert] = useState<Color>('success')
  const [initialState, setInitialState] = useState<IProduct>()

  useEffect(() => {
    ContentAPI.get(`/${BASE_NAME_END_POINT}/${id}`)
      .then(({ data: { data } }) => {
        console.log(data)
        setInitialState(data)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
        setOpenAlert(true)
        setMessageAlert('Ocurrió al consultar registro.')
        setSeverityAlert('error')
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onHandleSubmit = (data: IProduct) => {
    setLoading(true)
    ContentAPI.put(`/${BASE_NAME_END_POINT}/${id}`, data)
      .then(() => {
        setLoading(false)
        setOpenAlert(true)
        setMessageAlert('Se editó correctamente.')
        setSeverityAlert('success')
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
        setOpenAlert(true)
        setMessageAlert('Ocurrió un error al editar el registro.')
        setSeverityAlert('error')
      })
  }

  return (
    <>
      <Loader loading={loading} />
      {initialState && (
        <ProductForm
          initialState={initialState}
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

export default ProductEdit
