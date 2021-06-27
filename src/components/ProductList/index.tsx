import * as S from 'styles/content-base'

import { useEffect, useState } from 'react'
import ContentAPI from 'services/content-api'

import { DataGrid, ColDef, CellParams } from '@material-ui/data-grid'

import Loader from 'components/Loader'
import TableActions from 'components/TableActions'
import Button from '@material-ui/core/Button'

import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { useRouter } from 'next/router'

import { Color } from 'models/form'
import { IProduct } from 'models/product'
import { IIngredient } from 'models/ingredients'

const SINGULAR_COMPONENT_NAME = 'producto'
const PLURAL_COMPONENT_NAME = 'productos'
const BASE_NAME_END_POINT = 'products'

const ProductList = () => {
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
      const recordsUpdated = records.filter((record: IProduct) => {
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

  const renderCellIngredients = (params: CellParams) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const text = ((params.value as any[]) || [])
      .map((item: IIngredient) => {
        return item.name
      })
      .join(', ')
    return <span>{text}</span>
  }

  const columns: ColDef[] = [
    {
      field: 'name',
      headerName: 'Nombre',
      width: 200
    },
    {
      field: 'price',
      headerName: 'precio',
      width: 200
    },
    {
      field: 'ingredients',
      headerName: 'Ingredientes',
      width: 200,
      renderCell: renderCellIngredients
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
    ContentAPI.get<IProduct[]>(`/${BASE_NAME_END_POINT}`)
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
      <S.WrapperAction style={{ width: 750 }}>
        <S.Title>{PLURAL_COMPONENT_NAME}</S.Title>
        <Button variant="contained" color="primary" onClick={redirectNewForm}>
          Crear {SINGULAR_COMPONENT_NAME}
        </Button>
      </S.WrapperAction>
      <S.WrapperGrid style={{ height: 300, width: 750 }}>
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

export default ProductList
