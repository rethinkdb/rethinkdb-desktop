import React, { PureComponent, Fragment } from 'react'
import { Title, StyledNewConnection } from './styles'

class NewConnectionForm extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      address: '',
      username: '',
      password: ''
    }
  }

  onNameChange = event => {
    this.setState({ name: event.target.value })
  }

  onAddressChange = event => {
    this.setState({ address: event.target.value })
  }

  onUsernameChange = event => {
    this.setState({ username: event.target.value })
  }

  onPasswordChange = event => {
    this.setState({ password: event.target.value })
  }

  handleCreate = () => {
    const { onCreate } = this.props
    const { name, address, username, password } = this.state
    onCreate(name, address, username, password)
  }

  render () {
    const { defaultName, defaultAddress, defaultUsername, defaultPassword } = this.props
    return (
      <Fragment>
        <Title>Add New Connection</Title>
        <StyledNewConnection>
          <div className='row'>
            <input
              type='text'
              placeholder={defaultName}
              onChange={this.onNameChange}
              maxLength={20}
            />
          </div>
          <div className='row'>
            <input type='text' placeholder={defaultAddress} onChange={this.onAddressChange} />
          </div>
          <div className='row'>
            <input type='text' placeholder={defaultUsername} onChange={this.onUsernameChange} />
          </div>
          <div className='row'>
            <input type='password' placeholder={defaultPassword} onChange={this.onPasswordChange} />
          </div>
          <div className='row actions'>
            <button onClick={this.handleCreate}>Connect</button>
          </div>
        </StyledNewConnection>
      </Fragment>
    )
  }
}

export default NewConnectionForm
