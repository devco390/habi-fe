import * as S from './styles'

import IconButton from '@material-ui/core/IconButton'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import Button from '@material-ui/core/Button'
import { IUser } from 'models/user'
import { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { enumToArray } from 'utils/enum-utils'
import { USER_ROLES, USER_STATES } from 'models/login'
import { validateEmail } from 'utils/form-utils'
import { useRouter } from 'next/router'

export type UserFormProps = {
  initialState: IUser
  handleSubmit: (user: IUser) => void
}

const UserForm = ({ initialState, handleSubmit }: UserFormProps) => {
  const router = useRouter()
  const [state, setState] = useState<IUser>(initialState)

  const [errorEmail, setErrorEmail] = useState<boolean>(false)
  const [errorUserName, setErrorUserName] = useState<boolean>(false)

  const validateUserName = (userName: string): boolean => {
    return userName.trim().length > 0
  }

  const handleChangeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setErrorUserName(validateUserName(value))
    setState({ ...state, userName: value })
  }

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setErrorEmail(!validateEmail(value))
    setState({ ...state, email: value })
  }

  const handleChangeSelect = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof state
    setState({
      ...state,
      [name]: event.target.value
    })
  }

  const validateForm = (): boolean => {
    return validateEmail(state.email) && validateUserName(state.userName)
  }

  const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(state)
    handleSubmit(state)
  }

  return (
    <S.Wrapper noValidate autoComplete="off" onSubmit={onHandleSubmit}>
      <S.Header>
        <div>
          <IconButton
            aria-label="edit"
            title={'Volver'}
            onClick={() => {
              router.push({
                pathname: `/usuarios`
              })
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <h1>{state.id ? 'Editar' : 'Crear'} Usuario</h1>
        </div>

        <Button
          variant="contained"
          color="primary"
          type={'submit'}
          disabled={!validateForm()}
        >
          Guardar
        </Button>
      </S.Header>

      <S.WrapperInputs>
        <div>
          <TextField
            error={false}
            required
            id="username"
            label="Nombre"
            helperText={errorUserName && 'Campo obligatorio.'}
            variant="filled"
            value={state.userName}
            onChange={handleChangeUserName}
          />
        </div>
        <div>
          <TextField
            id="email"
            error={errorEmail}
            required
            type="email"
            label="Email"
            helperText={errorEmail && 'Email invalido'}
            variant="filled"
            value={state.email}
            onChange={handleChangeEmail}
          />
        </div>
        <FormControl variant="filled">
          <InputLabel htmlFor="rol">Rol</InputLabel>
          <Select
            native
            value={state.rol}
            onChange={handleChangeSelect}
            inputProps={{
              name: 'rol',
              id: 'rol'
            }}
          >
            {enumToArray(USER_ROLES).map((rol: any) => {
              return (
                <option key={rol.value} value={rol.value}>
                  {rol.text}
                </option>
              )
            })}
          </Select>
        </FormControl>
        <FormControl variant="filled">
          <InputLabel htmlFor="state">Estado</InputLabel>
          <Select
            native
            value={state.state}
            onChange={handleChangeSelect}
            inputProps={{
              name: 'state',
              id: 'state'
            }}
          >
            {enumToArray(USER_STATES).map((state: any) => {
              return (
                <option key={state.value} value={state.value}>
                  {state.text}
                </option>
              )
            })}
          </Select>
        </FormControl>
      </S.WrapperInputs>
    </S.Wrapper>
  )
}

export default UserForm
