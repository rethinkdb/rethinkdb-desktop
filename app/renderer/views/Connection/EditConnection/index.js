import React, { PureComponent, Fragment } from 'react'
import connection from '../../../service/connection'
import AppHeader from '../../../components/AppHeader'
import Toast from '../../../components/Toast'
import EditConnectionForm from './EditConnectionForm'

class EditConnection extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      id: '',
      selected: {}
    }
  }

  onSaveConnection = values => {
    try {
      connection.update(this.state.id, values)
      Toast.success('Connection saved!')
    } catch (e) {}
  }

  componentDidMount () {
    const {
      match: {
        params: { id }
      }
    } = this.props
    const selected = connection.getConnectionById(id)
    this.setState({ selected, id })
  }

  render () {
    const { selected } = this.state
    return (
      <Fragment>
        <AppHeader />
        <EditConnectionForm connection={selected} onSave={this.onSaveConnection} />
      </Fragment>
    )
  }
}

export default EditConnection
