import React from 'react'
import ReactSwitch from 'react-switch'
import theme from '@/style/common'

export const Switch = props => {
  return <ReactSwitch {...props} onColor={theme.success} offColor='#ccc' />
}

export default Switch
