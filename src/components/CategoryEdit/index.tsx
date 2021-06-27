import ContentAPI from 'services/content-api'

import { Color } from 'models/form'
import { useEffect, useState } from 'react'
import Loader from 'components/Loader'

import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import CategoryForm from 'components/CategoryForm'
import { ICategory } from 'models/categories'

type CategoryEditProps = {
  id: string
}

const BASE_NAME_END_POINT = 'categories'

const CategoryEdit = ({ id }: CategoryEditProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [messageAlert, setMessageAlert] = useState<string>('')
  const [severityAlert, setSeverityAlert] = useState<Color>('success')
  const [initialState, setInitialState] = useState<ICategory>()

  useEffect(() => {
    ContentAPI.get(`/${BASE_NAME_END_POINT}/${id}`)
      .then(({ data: { data } }) => {
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

  const onHandleSubmit = (data: ICategory) => {
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
        <CategoryForm
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

export default CategoryEdit
