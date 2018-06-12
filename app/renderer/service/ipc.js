const ipc = require('electron-better-ipc')

// ToDo: instead of hard coding the channels, we should create some channel factory
/*
 i.e:
export const method = (callback) => {
  ipc.answerMain(topic, message => {
    callback(message)
  })
}
  */
export const connect = ({ name, address }) => {
  return ipc.callMain('connect', { name, address })
}

// this channel is for "push" updates from main to renderer
// answerMain is not really answering anything here...just handling the event sent from main
// each time the main will "push" a message the callback will be executed
export const liveStats = (callback) => {
  ipc.answerMain('stats', data => {
    callback(data)
  })
}
