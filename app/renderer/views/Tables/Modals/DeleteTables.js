import React from 'react'
import Modal from '../../../components/Modal'
import Alert from '../../../components/Alert'
import { StyledModal, StyledModalActions, ActionButton } from './styles'

const DeleteTables = props => {
  const { selectedTables, onCancel, onDelete } = props
  const deleteText = selectedTables.length === 1 ? 'this table' : 'these tables'
  return (
    <Modal {...props}>
      <StyledModal>
        <Alert type='error'>
          Deleting a table will delete all its data. This action cannot be reversed.
        </Alert>

        <h4>{`Are you sure you want to delete ${deleteText}:`}</h4>

        <ul className='table-list'>
          {selectedTables.map(table => (
            <li key={table.id}>
              <a href={`#/tables/${table.id}`}>
                {table.db}.{table.name}
              </a>
            </li>
          ))}
        </ul>
        <StyledModalActions>
          <button className={ActionButton} onClick={onDelete}>
            Delete
          </button>
          <button className={ActionButton} onClick={onCancel}>
            Cancel
          </button>
        </StyledModalActions>
      </StyledModal>
    </Modal>
  )
}

export default DeleteTables
