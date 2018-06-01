module.exports.extract = url => {
  let host
  let port
  const withProtocol = ['http://', 'https://'].includes(url)
  if (withProtocol) {
    let parts = url.split('//')
    let protocol = parts[0]
    let [h, p] = [...parts[1].split(':')]
    host = protocol + h
    port = p
  } else {
    const s = [...url.split(':')]
    host = s[0]
    port = s[1]
  }

  return { host, port }
}
