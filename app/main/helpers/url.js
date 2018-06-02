module.exports.extract = url => {
  let host
  let port
  const DELIMITER = '://'
  const withProtocol = url.includes('http://') || url.includes('https://')
  if (withProtocol) {
    let parts = url.split(DELIMITER)
    let protocol = parts[0]
    let [h, p] = [...parts[1].split(':')]
    host = protocol + DELIMITER + h
    port = p
  } else {
    const s = url.split(':')
    host = s[0]
    port = s[1]
  }

  return { host, port }
}
