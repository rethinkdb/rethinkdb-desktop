import React, { Component } from 'react'
import Modal from '../../../components/Modal'
import Alert from '../../../components/Alert'
import { StyledModal, StyledModalActions, ActionButton, ModalTextInput } from './styles'

class DeleteDatabase extends Component {
  state = {
    dbName: '',
    validationError: undefined
  }

  onNameChange = e => {
    this.setState({ dbName: e.currentTarget.value })
  }
  onClose = e => {
    this.setState({ dbName: '', validationError: undefined })
  }
  handleDelete = () => {
    const { onDelete, dbToDelete } = this.props
    const { dbName } = this.state
    if (dbName !== dbToDelete) {
      this.setState({
        validationError: "This name doesn't match the name of the database you're trying to delete."
      })
    } else {
      this.setState({ dbName: '', validationError: undefined })
      onDelete(dbToDelete)
    }
  }

  renderError = error => {
    return <Alert type="error">{error}</Alert>
  }

  render() {
    const { error, onCancel } = this.props
    const { dbName, validationError } = this.state
    const err = error || validationError
    return (
      <Modal {...this.props} afterClose={this.onClose}>
        <StyledModal>
          <Alert type="warning">
            Deleting the database will delete all the tables in it.
            <br />
            This action <strong>cannot</strong> be undone.
          </Alert>
          {err ? this.renderError(err) : null}
          <input
            name="databaseName"
            type="text"
            maxLength={60}
            className={ModalTextInput}
            placeholder="Name of the database"
            onChange={this.onNameChange}
            value={dbName}
          />
          <StyledModalActions>
            <button className={ActionButton} onClick={this.handleDelete}>
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
}

export default DeleteDatabase
