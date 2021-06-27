import * as S from 'styles/content-base'

import { useEffect, useState } from 'react'
import ContentAPI from 'services/content-api'
import { IUser } from 'models/user'
import { DataGrid, ColDef, CellParams } from '@material-ui/data-grid'

import Loader from 'components/Loader'
import TableActions from 'components/TableActions'
import Button from '@material-ui/core/Button'

import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { USER_ROLES, USER_STATES } from 'models/login'
import { useRouter } from 'next/router'

import { Color } from 'models/form'

const SINGULAR_COMPONENT_NAME = 'usuario'
const PLURAL_COMPONENT_NAME = 'usuarios'
const BASE_NAME_END_POINT = 'users'

const UserList = () => {
  const router = useRouter()
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState<boolean>(true)
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [messageAlert, setMessageAlert] = useState<string>('')
  const [severityAlert, setSeverityAlert] = useState<Color>('success')

  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  const editRecord = (id: string) => {
    router.push({
      pathname: `/${PLURAL_COMPONENT_NAME}/editar/${id}`
    })
  }
  const removeRecord = (id: string): void => {
    try {
      const recordsUpdated = records.filter((record: IUser) => {
        return record && record.id !== id
      })
      setRecords(recordsUpdated)
    } catch (e) {
      console.log(e)
    }
  }

  const deleteRecord = (id: string) => {
    setLoading(true)
    ContentAPI.delete(`/${BASE_NAME_END_POINT}/${id}`)
      .then(() => {
        setLoading(false)
        setOpenAlert(true)
        setMessageAlert('Se eliminó correctamente.')
        setSeverityAlert('success')
        removeRecord(id)
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
      onEdit={editRecord}
      onDelete={deleteRecord}
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

  const getRecords = () => {
    ContentAPI.get<IUser[]>(`/${BASE_NAME_END_POINT}`)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then(({ data: { data } }: any) => {
        setLoading(false)
        setRecords(data)
      })
      .catch((e) => {
        setLoading(false)
        console.log(e)
      })
  }

  const redirectNewForm = () => {
    router.push({
      pathname: `/${PLURAL_COMPONENT_NAME}/nuevo`
    })
  }

  useEffect(() => {
    getRecords()
  }, [])

  return (
    <S.Wrapper>
      <Loader loading={loading} />
      <S.WrapperAction>
        <S.Title>{PLURAL_COMPONENT_NAME}</S.Title>
        <Button variant="contained" color="primary" onClick={redirectNewForm}>
          Crear {SINGULAR_COMPONENT_NAME}
        </Button>
      </S.WrapperAction>
      <S.WrapperGrid style={{ height: 300, width: 950 }}>
        <DataGrid columns={columns} rows={records} />
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
