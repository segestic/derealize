import * as Sentry from '@sentry/node'
// import * as Tracing from '@sentry/tracing'
import ipc from './backend-ipc'
import { DisposeAll } from './handlers'

Sentry.init({
  dsn: 'https://372da8ad869643a094b8c6de605093f7@o931741.ingest.sentry.io/5880650',
  // recommend adjusting this in production, or using tracesSampler for finer control
  tracesSampleRate: 1.0,
})

process.on('exit', async () => {
  await DisposeAll()
})

if (process.argv[2] === '--subprocess') {
  const socketId = process.argv[3]
  ipc(socketId)
  console.log(`backend subprocess socket:${socketId}`)
} else {
  import('electron')
    .then(({ ipcRenderer }) => {
      ipcRenderer.on('setParams', (e: Event, { socketId }) => {
        ipc(socketId)
        console.log(`backend window socket: ${socketId}`)
      })
      return null
    })
    .catch(Sentry.captureException)
}
