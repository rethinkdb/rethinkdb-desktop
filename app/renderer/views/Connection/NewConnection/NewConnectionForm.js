import React, { PureComponent } from 'react'
import { StyledNewConnection } from './styles'

class NewConnectionForm extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      address: ''
    }
  }

  onNameChange = event => {
    this.setState({ name: event.target.value })
  }

  onAddressChange = event => {
    this.setState({ address: event.target.value })
  }

  handleCreate = () => {
    const { onCreate } = this.props
    const { name, address } = this.state
    onCreate(name, address)
  }

  render() {
    const { defaultName, defaultAddress } = this.props
    return (
      <StyledNewConnection>
        <div className="row">
          <input
            type="text"
            placeholder={defaultName}
            onChange={this.onNameChange}
            maxLength={20}
          />
        </div>
        <div className="row">
          <input type="text" placeholder={defaultAddress} onChange={this.onAddressChange} />
        </div>
        <div className="row actions">
          <button onClick={this.handleCreate}>Connect</button>
        </div>
      </StyledNewConnection>
    )
  }
}

export default NewConnectionForm
