import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebaseApp/AuthSession'
import { useRouter } from 'next/router'

import { USER_LOGIN_STATES } from 'models/login'
import { IUser } from 'models/user'

const LOGIN_ROUTE = `/login`

export default function useUser() {
  const [user, setUser] = useState<IUser | undefined | null>(
    USER_LOGIN_STATES.NOT_KNOWN
  )
  const router = useRouter()

  useEffect(() => {
    onAuthStateChanged(setUser)
  }, [])

  useEffect(() => {
    if (user === USER_LOGIN_STATES.NOT_LOGGED) {
      router.replace(LOGIN_ROUTE)
    } else if (user && router.asPath === LOGIN_ROUTE) {
      router.replace('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return { user }
}
