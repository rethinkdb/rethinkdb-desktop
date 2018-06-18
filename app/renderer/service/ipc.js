const ipc = require('electron-better-ipc')
const {
  CONNECT_CHANNEL_NAME,
  STATS_CHANNEL_NAME
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

// the following channels are for "push" updates from main to renderer
// answerMain is not really answering anything here...just handling the event sent from main
// each time the main will "push" a message the callback will be executed
export const liveStats = (callback) => {
  ipc.answerMain(STATS_CHANNEL_NAME, data => {
    callback(data)
  })
}
