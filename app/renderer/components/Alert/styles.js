import styled, {css} from 'react-emotion'

const success = css`
    color: #52c41a;
    background: #f6ffed;
    border-color: #b7eb8f;
`
const error = css`
    color: #f5222d;
    background: #fff1f0;
    border-color: #ffa39e;
`
const info = css`
    color: #1890ff;
    background: #e6f7ff;
    border-color: #91d5ff;
`
const warning = css`
    color: #fa8c16;
    background: #fff7e6;
    border-color: #ffd591;
`
const basic = css`
    border: 1px solid #d9d9d9;
    background: #fafafa;
    padding: 8px 12px;
    border-radius: 3px;
`

const alertTypes = {
  'basic': basic,
  'success': success,
  'error': error,
  'info': info,
  'warning': warning
}
const alertStyle = props =>
  css`${basic} ${alertTypes[props.type]}`

export const StyledAlert = styled('p')`
  ${alertStyle};
`
