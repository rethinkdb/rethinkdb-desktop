import React, { PureComponent } from 'react'
import { connect } from '../../../service/ipc'
import {isValidUrl} from '../../../helpers/validator'
import { StyledNewConnection, ConnectionInfo } from './styles'
import AppHeader from '../../../components/AppHeader'
import SideBar from '../../../components/SideBar'
import MainContent from '../../../components/MainContent'

class Index extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      name: 'local',
      address: 'http://localhost:28015',
      error: undefined
    }
  }

  onCreate = () => {
    const { name, address } = this.state
    console.log(isValidUrl(address))
    console.log(isValidUrl(name))
    //console.log(name, address)
  }

  onNameChange = event => {
    this.setState({ name: event.target.value })
  }

  onAddressChange = event => {
    this.setState({ address: event.target.value })
  }

  render() {
    return (
      <div>
        <AppHeader />
        <SideBar />
        <MainContent>
          <StyledNewConnection>
            <div className="row">
              <input type="text" placeholder="local" onChange={this.onNameChange} maxLength={20}/>
            </div>
            <div className="row">
              <input
                type="text"
                placeholder="https://localhost:28015"
                onChange={this.onAddressChange}
              />
            </div>
            <div className="row actions">
              <button onClick={this.onCreate}>Connect</button>
            </div>
          </StyledNewConnection>

          <ConnectionInfo>
            By default RebirthDB will connect to <span>localhost:28015</span> with connection name{' '}
            <span>local</span>
          </ConnectionInfo>
        </MainContent>
      </div>
    )
  }
}
Index.propTypes = {}

export default Index
