const ipc = require('electron-better-ipc')

export const connect = async (path) => {
	const result = await ipc.callMain('connect', path)
	return result
}