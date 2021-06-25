export enum USER_STATES {
  active = 'Activo',
  inactive = 'Inactivo'
}

export enum USER_ROLES {
  it_manager = 'IT manager',
  manager = 'Administrador',
  waiter = 'Mesero'
}

export enum LOGIN_STATES {
  USER_NOT_KNOWN = 0,
  LOADING = 1,
  SUCCESS = 2,
  MODAL_IS_OPEN = 3,
  ERROR = -1
}

export const USER_LOGIN_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined
}
