import { IUser, UserRol, UserState } from 'models/user'

import ContentAPI from 'services/content-api'

import UserForm from 'components/UserForm'
import { Color } from 'models/form'
import { useState } from 'react'
import Loader from 'components/Loader'

import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { USER_ROLES, USER_STATES } from 'models/login'
import { getStringValuesFromEnum } from 'utils/enum-utils'
import { useRouter } from 'next/router'

const initialState: IUser = {
  id: undefined,
  userName: '',
  email: '',
  state: getStringValuesFromEnum(USER_STATES, USER_STATES.active) as UserState,
  rol: getStringValuesFromEnum(USER_ROLES, USER_ROLES.waiter) as UserRol
}

const UserNew = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [messageAlert, setMessageAlert] = useState<string>('')
  const [severityAlert, setSeverityAlert] = useState<Color>('success')

  const onHandleSubmit = (user: IUser) => {
    console.log(user)
    setLoading(true)
    ContentAPI.post(`/users`, user)
      .then(() => {
        setLoading(false)
        setOpenAlert(true)
        setMessageAlert('Se guardó correctamente.')
        setSeverityAlert('success')
        router.push({
          pathname: `/usuarios`
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
      <UserForm initialState={initialState} handleSubmit={onHandleSubmit} />
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

export default UserNew
