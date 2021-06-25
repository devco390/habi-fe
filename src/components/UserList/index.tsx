import * as S from 'styles/content-base'

import { useEffect, useState } from 'react'
import { IUser } from 'models/user'
import ContentAPI from 'services/content-api'

import { DataGrid, ColDef, CellParams } from '@material-ui/data-grid'

import Loader from 'components/Loader'
import TableActions from 'components/TableActions'
import Button from '@material-ui/core/Button'

import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { USER_ROLES, USER_STATES } from 'models/login'
import { useRouter } from 'next/router'

import { Color } from 'models/form'

const UserList = () => {
  const router = useRouter()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState<boolean>(true)
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [messageAlert, setMessageAlert] = useState<string>('')
  const [severityAlert, setSeverityAlert] = useState<Color>('success')

  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  const editUser = (id: string) => {
    router.push({
      pathname: `/usuarios/editar/${id}`
    })
  }
  const removeUser = (id: string): void => {
    try {
      const usersUpdated = users.filter((user: IUser) => {
        return user && user.id !== id
      })
      setUsers(usersUpdated)
    } catch (e) {
      console.log(e)
    }
  }

  const deleteUser = (id: string) => {
    setLoading(true)
    ContentAPI.delete(`/users/${id}`)
      .then(() => {
        setLoading(false)
        setOpenAlert(true)
        setMessageAlert('Se eliminó correctamente.')
        setSeverityAlert('success')
        removeUser(id)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
        setOpenAlert(true)
        setMessageAlert('Ocurrió un error al eliminar el registro.')
        setSeverityAlert('error')
      })
  }

  const renderCell = (params: CellParams) => (
    <TableActions
      id={params.value as string}
      onEdit={editUser}
      onDelete={deleteUser}
    />
  )
  const renderCellRol = (params: CellParams) => (
    <span>{USER_ROLES[params.value as keyof typeof USER_ROLES]}</span>
  )
  const renderCellState = (params: CellParams) => (
    <span>{USER_STATES[params.value as keyof typeof USER_STATES]}</span>
  )

  const columns: ColDef[] = [
    {
      field: 'userName',
      headerName: 'Nombre',
      width: 200
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 300
    },
    {
      field: 'rol',
      headerName: 'Rol',
      width: 150,
      renderCell: renderCellRol
    },
    {
      field: 'state',
      headerName: 'Estado',
      width: 150,
      renderCell: renderCellState
    },
    {
      field: 'id',
      headerName: 'Acciones',
      renderCell: renderCell,
      width: 150,
      sortable: false
    }
  ]

  const getUsers = () => {
    ContentAPI.get<IUser[]>('/users')
      .then(({ data: { data } }: any) => {
        setLoading(false)
        setUsers(data)
      })
      .catch((e) => {
        setLoading(false)
        console.log(e)
      })
  }

  const redirectNewForm = () => {
    router.push({
      pathname: `/usuarios/nuevo`
    })
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <S.Wrapper>
      <Loader loading={loading} />
      <S.WrapperAction>
        <S.Title>Usuarios</S.Title>
        <Button variant="contained" color="primary" onClick={redirectNewForm}>
          Crear usuario
        </Button>
      </S.WrapperAction>
      <S.WrapperGrid style={{ height: 300, width: 950 }}>
        <DataGrid columns={columns} rows={users} />
      </S.WrapperGrid>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity={severityAlert}>
          {messageAlert}
        </Alert>
      </Snackbar>
    </S.Wrapper>
  )
}

export default UserList
