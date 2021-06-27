import { IUser } from 'models/user'

import ContentAPI from 'services/content-api'

import UserForm from 'components/UserForm'
import { Color } from 'models/form'
import { useEffect, useState } from 'react'
import Loader from 'components/Loader'

import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

type userEditProps = {
  id: string
}

const UserEdit = ({ id }: userEditProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [messageAlert, setMessageAlert] = useState<string>('')
  const [severityAlert, setSeverityAlert] = useState<Color>('success')
  const [initialState, setInitialState] = useState<IUser>()

  useEffect(() => {
    ContentAPI.get(`/users/${id}`)
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

  const onHandleSubmit = (user: IUser) => {
    console.log(user)
    setLoading(true)
    ContentAPI.put(`/users/${id}`, user)
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
        <UserForm initialState={initialState} handleSubmit={onHandleSubmit} />
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

export default UserEdit
