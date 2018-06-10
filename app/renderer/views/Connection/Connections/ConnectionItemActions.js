import React, { PureComponent } from 'react'
import Menu, { Item as MenuItem, Divider } from 'rc-menu'
import Dropdown from '../../../components/Dropdown'
import { StyledActionsButton, MenuItemIcon } from './styles'

class ConnectionItemActions extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showActions: false
    }
  }

  onAction = ({ key }) => {
    const { connectionId, onEdit, onDelete } = this.props
    if (key === 'edit') {
      onEdit(connectionId)
    }
    if (key === 'delete') {
      onDelete(connectionId)
    }
  }

  onVisibleChange = visible => {
    console.log(visible)
  }

  menu = (
    <Menu onSelect={this.onAction}>
      <MenuItem key="edit" className={MenuItemIcon}><i className="icon-pencil" /> Edit</MenuItem>
      <Divider />
      <MenuItem key="delete" className={MenuItemIcon}><i className="icon-trash" /> Delete</MenuItem>
    </Menu>
  )

  render() {
    return (
      <Dropdown
        trigger={['click']}
        overlay={this.menu}
        animation="slide-up"
        onVisibleChange={this.onVisibleChange}
      >
        <StyledActionsButton><i className="icon-options" /></StyledActionsButton>
      </Dropdown>
    )
  }
}

export default ConnectionItemActions
