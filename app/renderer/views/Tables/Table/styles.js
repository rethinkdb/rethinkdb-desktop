import styled from 'react-emotion'
import theme from '@/style/common'

export const StyledTableList = styled('ul')({
  listStyle: 'none',
  background: '#fff'
})

export const StyledTableItem = styled('li')({
  padding: '12px 8px',
  display: 'grid',
  gridTemplateColumns: '42px 1fr 300px 130px',
  gridTemplateRows: 'auto',
  gridTemplateAreas: "'select name shardsReplicas status'",
  borderBottom: `1px solid ${theme.mainBorderColor}`,
  '.tableSelect': {
    gridArea: 'select'
  },
  '.tableName': {
    gridArea: 'name',
    a: {
      fontSize: '16px',
      fontWeight: 600,
      textDecoration: 'none',
      color: '#444258',
      transition: 'all fadeIn 300ms',
      '&:hover': {
        color: '#eb48ca'
      }
    }
  },
  '.tableShardsReplicas': {
    gridArea: 'shardsReplicas',
    '.tableShardsReplicasIcon': {
      position: 'relative',
      top: '3px'
    },
    '.tableShardsReplicasText': {
      paddingLeft: '8px'
    }
  },
  '.tableStatus': {
    gridArea: 'status'
  },
  ':last-child': {
    borderBottom: 'none'
  }
})

const sLevels = {
  success: theme.success,
  'partial-success': theme.warning,
  failure: theme.error
}
export const TableStatus = styled('div')(props => ({
  '&:before': {
    content: "''",
    display: 'inline-block',
    marginRight: '8px',
    width: '11px',
    height: '11px',
    borderRadius: '50%',
    verticalAlign: 'middle',
    background: sLevels[props.status]
  }
}))
