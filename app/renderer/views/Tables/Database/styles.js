import styled from 'react-emotion'
import theme from '@/style/common'

export const StyledDatabaseList = styled('ul')({
  padding: '15px',
  listStyle: 'none'
})

export const StyledDatabaseItem = styled('li')({
  border: `1px solid ${theme.mainBorderColor}`,
  marginBottom: '10px',
  'header': {
    background: theme.contrastColor,
    padding: '8px',
    borderBottom: `1px solid ${theme.mainBorderColor}`,
    '.db-name': {
      paddingLeft: '20px',
      fontWeight: 500,
      fontSize: '16px'
    }
  },
  'section': {
    padding: '8px',
    background: '#fff'
  }
})

export const DBLabel = styled('span')({
  display: 'inline-block',
  padding: '0 7px',
  height: '22px',
  lineHeight: '20px',
  textAlign: 'center',
  color: '#eb2f96',
  background: '#fff0f6',
  border: '1px solid #ffadd2',
  fontSize: '12px'

})
