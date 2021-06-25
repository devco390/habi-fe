import useUser from 'hooks/useUser'

import Login from 'components/Login'
import { USER_LOGIN_STATES } from 'models/login'
import Loader from 'components/Loader'

const LoginPage = () => {
  const { user } = useUser()

  return (
    <>
      {user === USER_LOGIN_STATES.NOT_LOGGED && <Login />}
      {user === USER_LOGIN_STATES.NOT_KNOWN && <Loader loading={true} />}
    </>
  )
}

export default LoginPage
