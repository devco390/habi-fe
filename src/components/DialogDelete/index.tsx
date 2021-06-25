import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useState } from 'react'
import { Button } from '@material-ui/core'

export type DialogDeleteProps = {
  id: string
  onDelete: (id: string) => void
}

const DialogDelete = ({ id, onDelete }: DialogDeleteProps) => {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }
  const showDialogDelete = () => {
    setOpen(true)
  }

  return (
    <>
      <IconButton
        aria-label="delete"
        onClick={() => {
          showDialogDelete()
        }}
      >
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Eliminar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Está seguro de eliminar el registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              setOpen(false)
              onDelete(id)
            }}
            color="primary"
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DialogDelete
