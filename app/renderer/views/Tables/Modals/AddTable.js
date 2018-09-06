import React, { Component } from 'react'
import Modal from '../../../components/Modal'
import Alert from '../../../components/Alert'
import Switch from '../../../components/Switch'
import { StyledModal, StyledModalActions, ActionButton, ModalTextInput, ModalRow } from './styles'

class AddTable extends Component {
  state = {
    tblName: '',
    primaryKey: '',
    durability: true
  }

  onClose = e => {
    this.setState({
      tblName: '',
      primaryKey: '',
      durability: true
    })
  }

  onNameChange = e => {
    this.setState({ tblName: e.currentTarget.value })
  }
  onPrimaryKeyChange = e => {
    this.setState({ primaryKey: e.currentTarget.value })
  }
  onDurabilityChange = checked => {
    this.setState({ durability: checked })
  }
  onAdd = () => {
    const { onSubmit } = this.props
    const { tblName, primaryKey, durability } = this.state
    this.setState({
      tblName: '',
      primaryKey: '',
      durability: true
    })
    onSubmit({ name: tblName, primaryKey, durability })
  }
  renderError = error => {
    return <Alert type='error'>{error}</Alert>
  }

  render () {
    const { error, onCancel } = this.props
    const { dbName, primaryKey, durability } = this.state
    return (
      <Modal {...this.props} afterClose={this.onClose}>
        <StyledModal>
          {error ? this.renderError(error) : null}
          <input
            name='tableName'
            type='text'
            maxLength={60}
            className={ModalTextInput}
            placeholder='Table name'
            onChange={this.onNameChange}
            value={dbName}
          />
          <input
            name='primaryKey'
            type='text'
            maxLength={60}
            className={ModalTextInput}
            placeholder="Primary key (defaults to 'id')"
            onChange={this.onPrimaryKeyChange}
            value={primaryKey}
          />
          <div className={ModalRow}>
            <label className={ModalRow}>Acknowledge writes only when written to disk</label>
          </div>
          <div className={ModalRow}>
            <label htmlFor='durability-switch'>
              <Switch
                onChange={this.onDurabilityChange}
                checked={durability}
                id='durability-switch'
              />
            </label>
          </div>
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

export default AddTable
