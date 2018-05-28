import isUrl from 'validator/lib/isUrl'

export const isValidUrl = url => isUrl(url, { require_tld: false, host_whitelist: ['localhost'] })
