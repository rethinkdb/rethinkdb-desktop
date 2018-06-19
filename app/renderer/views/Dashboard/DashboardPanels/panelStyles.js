import styled from 'react-emotion'
import theme from '@/style/common'

export const StyledPanels = styled('div')({
  padding: '10px',
  display: 'flex',
  justifyContent: 'space-around',
  width: '100%',
  backgroundColor: '#fff',
  boxShadow: '1px 1px 3px rgba(88, 66, 88, 0.1)'
})

export const StyledPanel = styled('div')({
  outline: 'none',
  padding: '10px',
  margin: '5px'
})

export const StyledPanelContent = styled('div')(({ hasIssues }) => ({
  h3: {
    fontWeight: 700,
    position: 'relative',
    marginBottom: '5px',
    '&:before': {
      content: "''",
      display: 'inline-block',
      marginRight: '6px',
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      background: hasIssues ? theme.error : theme.success
    }
  },
  ul: {
    listStyle: 'none',
    li: {
      lineHeight: '22px',
      span: {
        fontWeight: 700,
        marginRight: '4px'
      }
    }
  }
}))
