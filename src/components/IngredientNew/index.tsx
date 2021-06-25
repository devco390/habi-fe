import ContentAPI from 'services/content-api'

import { Color } from 'models/form'
import { useState } from 'react'
import Loader from 'components/Loader'

import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

import { useRouter } from 'next/router'
import { IIngredient } from 'models/ingredients'
import IngredientForm from 'components/IngredientForm'

const PLURAL_COMPONENT_NAME = 'ingredientes'
const BASE_NAME_END_POINT = 'ingredients'

const initialState: IIngredient = {
  id: undefined,
  name: '',
  price: 0
}

const IngredientNew = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [messageAlert, setMessageAlert] = useState<string>('')
  const [severityAlert, setSeverityAlert] = useState<Color>('success')

  const onHandleSubmit = (data: IIngredient) => {
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
      <IngredientForm
        initialState={initialState}
        handleSubmit={onHandleSubmit}
      />
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

export default IngredientNew
