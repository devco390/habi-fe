export type UserState = 'active' | 'inactive'
export type UserRol = 'it_manager' | 'manager' | 'waiter'

export interface IUser {
  id?: string
  email: string
  rol: UserRol
  state: UserState
  userName: string
  createdAt?: string
  accessToken?: string
  idToken?: string
}

export interface IUserGmail {
  credential: {
    accessToken?: string
    idToken?: string
  }
  user: {
    email: string
  }
}
