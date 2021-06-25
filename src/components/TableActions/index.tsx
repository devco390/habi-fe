import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'

import DialogDelete from 'components/DialogDelete'

export type TableActionsProps = {
  id: string
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

const TableActions = ({ id, onEdit, onDelete }: TableActionsProps) => {
  return (
    <div>
      <DialogDelete id={id} onDelete={onDelete} />
      <IconButton
        aria-label="edit"
        onClick={() => {
          onEdit(id)
        }}
      >
        <EditIcon />
      </IconButton>
    </div>
  )
}

export default TableActions
