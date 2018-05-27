import validUrl from 'valid-url'

export const isValidUrl = (url) => validUrl.isHttpUri(url, true) || validUrl.isWebUri(url)