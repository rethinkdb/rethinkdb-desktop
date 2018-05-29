import React from 'react'
import Icon from '../../../components/Icon'
import { css } from 'react-emotion'
import theme from '@/style/common'

const ConnectionListHeader = () => {
  const connectionListHeader = css({
    textAlign: 'center',
    paddingBottom: '8px'
  })

  return (
    <div className={connectionListHeader}>
      <Icon type="database" size={28} color={theme.mainColorLight} />
    </div>
  )
}

export default ConnectionListHeader