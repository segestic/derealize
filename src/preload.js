const { ipcRenderer } = require('electron')
const ipc = require('node-ipc')

window.isProd = process.env.NODE_ENV === 'production'
window.port = process.env.PORT || 1212

let resolveSocketPromise
const socketPromise = new Promise((resolve) => {
  resolveSocketPromise = resolve
})

window.getSocketId = () => {
  return socketPromise
}

ipcRenderer.on('set-socket', (event, { socketId }) => {
  resolveSocketPromise(socketId)
})

window.ipcConnect = (id, func) => {
  ipc.config.silent = true
  ipc.connectTo(id, () => {
    func(ipc.of[id])
  })
}

// https://www.electronjs.org/docs/api/ipc-renderer#ipcrenderersendsyncchannel-args
window.getStore = async (key) => {
  ipcRenderer.send('getStore', key)
  return new Promise((resolve, reject) => {
    ipcRenderer.once(`getStore-${key}`, (event, data) => {
      resolve(data)
    })
  })
}

window.getStore = async (key) => {
  ipcRenderer.send('getStore', key)
  return Promise.race([
    new Promise((resolve) => {
      ipcRenderer.once(`getStore-${key}`, (event, data) => {
        resolve(data)
      })
    }),
    new Promise((resolve, reject) =>
      setTimeout(() => {
        reject(new Error('getStore timed out.'))
      }, 2000),
    ),
  ])
}

window.setStore = (payload) => {
  return ipcRenderer.send('setStore', payload)
}
