const ipc = require('electron-better-ipc')
const {
  CONNECT_CHANNEL_NAME,
  STATS_CHANNEL_NAME,
  QUERIES_CHANNEL_NAME,
  ACTIONS_CHANNEL_NAME
} = require('../../shared/channels')

// ToDo: instead of hard coding the channels, we should create a channel factory
/*
 i.e:
export const method = (callback) => {
  ipc.answerMain(topic, message => {
    callback(message)
  })
}
  */
export const connect = ({ name, address }) => {
  return ipc.callMain(CONNECT_CHANNEL_NAME, { name, address })
}

export const query = (query='', args={}) => {
  return ipc.callMain(QUERIES_CHANNEL_NAME, query, args)
}

export const action = (action='', args={}) => {
  return ipc.callMain(ACTIONS_CHANNEL_NAME, action, args)
}

// the following channels are for "push" updates from main to renderer
// answerMain is not really answering anything here...just handling the event sent from main
// each time the main will "push" a message the callback will be executed
export const liveStats = (callback) => {
  ipc.answerMain(STATS_CHANNEL_NAME, data => {
    callback(data)
  })
}
