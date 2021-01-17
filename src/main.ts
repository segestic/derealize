/* eslint-disable global-require */
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { fork, ChildProcess } from 'child_process'
import path from 'path'
import fs from 'fs'
import { app, BrowserWindow, shell, ipcMain, dialog } from 'electron'
import { autoUpdater } from 'electron-updater'
import log from 'electron-log'
import findOpenSocket from './utils/find-open-socket'
import MenuBuilder from './menu'
import store from './store'

const isProd = process.env.NODE_ENV === 'production'

process.on('uncaughtException', (err) => {
  log.error('Main UncaughtException', err)
  const messageOptions = {
    type: 'error',
    title: 'Error in Main process',
    message: 'Something failed',
  }
  dialog.showMessageBox(messageOptions)
})

process.on('unhandledRejection', (reason) => {
  log.error('Main UnhandledRejection', reason)
  const messageOptions = {
    type: 'error',
    title: 'Error in Main process',
    message: 'Something failed',
  }
  dialog.showMessageBox(messageOptions)
})

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info'
    autoUpdater.logger = log
    autoUpdater.checkForUpdatesAndNotify()
  }
}

if (!isProd || process.env.DEBUG_PROD === 'true') {
  const sourceMapSupport = require('source-map-support')
  sourceMapSupport.install()

  require('electron-debug')()
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer')
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  const extensions = ['REACT_DEVELOPER_TOOLS']

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(log.error)
}

let mainWindow: BrowserWindow | null = null
const createWindow = async (socketId: string) => {
  if (!isProd || process.env.DEBUG_PROD === 'true') {
    await installExtensions()
  }

  const RESOURCES_PATH = app.isPackaged ? path.join(process.resourcesPath, 'assets') : path.join(__dirname, '../assets')

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths)
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, isProd ? 'dist/preload.prod.js' : 'preload.js'),
    },
  })

  mainWindow.loadURL(`file://${__dirname}/index.html`)

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize()
    } else {
      mainWindow.show()
      mainWindow.focus()
    }

    mainWindow.webContents.send('set-socket', { socketId })
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  const menuBuilder = new MenuBuilder(mainWindow)
  menuBuilder.buildMenu()

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault()
    shell.openExternal(url)
  })

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  // new AppUpdater()
}

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', async () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    const scoketId = await findOpenSocket()
    createWindow(scoketId)
  }
})

const createBackendWindow = (socketId: string) => {
  // gitnode 还未支持non-context-aware, 希望未来支持
  // https://github.com/electron/electron/issues/18397#issuecomment-583221969
  // 这种特殊的调试模式好像也和RendererProcessReuse不兼容
  app.allowRendererProcessReuse = false

  const backendWin = new BrowserWindow({
    x: 400,
    y: 400,
    width: 1000,
    height: 800,
    show: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  })
  backendWin.loadURL(`file://${__dirname}/backend/backend.dev.html`)
  backendWin.webContents.openDevTools()

  backendWin.webContents.on('did-finish-load', () => {
    backendWin.webContents.send('set-socket', { socketId })
  })
}

let backendProcess: ChildProcess
const createBackendProcess = (socketId: string) => {
  if (process.env.DEV_PROCESS === 'true') {
    backendProcess = fork(path.join(__dirname, 'backend/backend.ts'), ['--subprocess', app.getVersion(), socketId], {
      execArgv: ['-r', './.erb/scripts/BabelRegister'],
    })
  } else if (isProd) {
    backendProcess = fork(path.join(__dirname, 'backend.prod.js'), ['--subprocess', app.getVersion(), socketId], {
      // stdio: ['ignore', fs.openSync('./out.log', 'a'), fs.openSync('./err.log', 'a'), 'ipc'], // for temporary debug
    })
  } else {
    createBackendWindow(socketId)
  }

  if (backendProcess) {
    backendProcess.on('message', (data: { message: string; error?: Error }) => {
      if (data.error) {
        // todo: replace by sentry
        log.error(data.message, data.error)
      } else {
        log.info(`backend: ${data.message}`)
      }
    })
    backendProcess.on('error', (err) => {
      log.error('backend', err)
    })
  }
}

app
  .whenReady()
  .then(async () => {
    log.debug('app ready')

    const socketId = await findOpenSocket()
    createBackendProcess(socketId)
    createWindow(socketId)

    return null
  })
  .catch(log.error)

ipcMain.on('getStore', (event, key: string) => {
  const value = store.get(key)
  event.returnValue = value
})

ipcMain.on('setStore', (event, payload: Record<string, unknown>) => {
  store.set(payload)
  // event.sender.send('setStore-reply', true)
})
