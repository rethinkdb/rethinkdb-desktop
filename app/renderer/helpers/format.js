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

const humanizeTableStatus = status => {
  if (!status) {
    return ''
  } else if (status.all_replicas_ready || status.ready_for_writes) {
    return 'Ready'
  } else if (status.ready_for_reads) {
    return 'Reads only'
  } else if (status.ready_for_outdated_reads) {
    return 'Outdated reads'
  } else {
    return 'Unavailable'
  }
}

export const humanizeTableReadiness = (status, num, denom) => {
  let label, value
  if (!status) {
    label = 'failure'
    value = 'unknown'
  } else if (status.all_replicas_ready) {
    label = 'success'
    value = `${humanizeTableStatus(status)} ${num}/${denom}`
  } else if (status.ready_for_writes) {
    label = 'partial-success'
    value = `${humanizeTableStatus(status)} ${num}/${denom}`
  } else {
    label = 'failure'
    value = humanizeTableStatus(status)
  }
  return { label, value }
}
