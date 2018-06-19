// formatBytes
// from http://stackoverflow.com/a/18650828/180718
export const formatBytes = (bytes, decimals) => {
  if (decimals == null) {
    decimals = 1
  }
  if (bytes === 0) {
    return '0 Bytes'
  }
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return (bytes / Math.pow(k, i)).toFixed(decimals) + ' ' + sizes[i]
}

