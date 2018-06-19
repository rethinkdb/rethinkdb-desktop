import styled from 'react-emotion'
import theme from '@/style/common'

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
