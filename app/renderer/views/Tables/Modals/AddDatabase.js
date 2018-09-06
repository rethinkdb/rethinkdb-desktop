import React, { Component } from 'react'
import Modal from '../../../components/Modal'
import Alert from '../../../components/Alert'
import { StyledModal, StyledModalActions, ActionButton, ModalTextInput } from './styles'

class AddDatabase extends Component {
  state = {
    dbName: ''
  }

  onNameChange = e => {
    this.setState({ dbName: e.currentTarget.value })
  }
  onAdd = () => {
    const { onSubmit } = this.props
    const { dbName } = this.state
    this.setState({ dbName: '' })
    onSubmit(dbName)
  }
  renderError = error => {
    return <Alert type="error">{error}</Alert>
  }

  render() {
    const { error, onCancel } = this.props
    const { dbName } = this.state
    return (
      <Modal {...this.props}>
        <StyledModal>
          {error ? this.renderError(error) : null}
          <input
            name="databaseName"
            type="text"
            maxLength={60}
            className={ModalTextInput}
            placeholder="Database name"
            onChange={this.onNameChange}
            value={dbName}
          />
          <StyledModalActions>
            <button className={ActionButton} onClick={this.onAdd}>
              Add
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

export default AddDatabase
