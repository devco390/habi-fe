import { useContext, createContext, useReducer } from 'react'
import { IUser } from 'models/user'

export interface IInitialContentSession {
  user?: IUser | null
}

export type DispatchType = {
  type: string
  payload: {
    key: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any
  }
}

export interface ContextDataSession {
  state: IInitialContentSession
  dispatch: (event: DispatchType) => void
}

export type ProviderProps = {
  children: React.ReactNode
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        [action.payload.key]: action.payload.value
      }
    default:
      throw new Error()
  }
}

export const sessionInitialValues: IInitialContentSession = {
  user: null
}

const SessionContextDefaultValues = {
  state: sessionInitialValues,
  dispatch: () => null
}

const SessionContext = createContext<ContextDataSession>(
  SessionContextDefaultValues
)

const SessionProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(formReducer, sessionInitialValues)

  return (
    <SessionContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

const useSession = () => useContext(SessionContext)

export { SessionProvider, useSession }
