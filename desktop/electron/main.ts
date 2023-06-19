import { app, BrowserWindow, clipboard, globalShortcut } from 'electron'
import { join } from 'node:path'

process.env.DIST = join(__dirname, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : join(process.env.DIST, '../public')

const indexHtml = join(process.env.DIST, 'index.html')
const preload = join(__dirname, 'preload.js')
const url = process.env.VITE_DEV_SERVER_URL

console.log('Start script', __dirname, preload)

const DESKTOP_WIN_OPTS = {
  show: false,
  webPreferences: {
    preload,
    nodeIntegration: true,
    contextIsolation: true,
  }
}

const OVERLAY_WIN_OPTS = {
  show: false,
  transparent: true,
  type: 'panel',
  webPreferences: {
    preload,
    nodeIntegration: true,
    contextIsolation: true,
  },
}

let appWindow: BrowserWindow | null
// let clipboardWindow: BrowserWindow | null
// let paletteWindow: BrowserWindow | null

function createWindow() {
  const windows = BrowserWindow.getAllWindows();
  console.log('create windows', windows)

  appWindow = new BrowserWindow(DESKTOP_WIN_OPTS)
  appWindow.maximize()
  // appWindow.hide()

  appWindow.on('close', event => {
    event.preventDefault()
    appWindow?.hide()
  })

  // clipboardWindow = new BrowserWindow(OVERLAY_WIN_OPTS)
  // clipboardWindow.setAlwaysOnTop(true, 'normal')
  // clipboardWindow.hide()

  // paletteWindow = new BrowserWindow(OVERLAY_WIN_OPTS)
  // paletteWindow.setAlwaysOnTop(true, 'normal')
  // paletteWindow.hide()

  if (url) {
    appWindow.loadURL(url + '#/app')
    // clipboardWindow.loadURL(url + '#/clipboard')
    // paletteWindow.loadURL(url + '#/palette')
  } else {
    appWindow.loadFile(indexHtml)
    // clipboardWindow.loadFile(indexHtml)
    // paletteWindow.loadFile(indexHtml)
  }
}

app.whenReady().then(async () => {
  console.log('when ready')

  if (!appWindow) {
    console.log('!window', appWindow)
    createWindow()
  }

  // registerShortcut('Shift+CommandOrControl+B', clipboardWindow)
  // registerShortcut('CommandOrControl+E', paletteWindow)
  // registerShortcut('CommandOrControl+R', appWindow)
})

// function registerShortcut(shortcut: string, window: BrowserWindow | null) {
//   if (window) {
//     const success = globalShortcut.register(shortcut, () => {
//       window.show();
//       window.webContents.send('show');
//     })
//     if (!success) {
//       console.log(`Shortcut registration failed for shortcut '${shortcut}'`)
//     } else {
//       app.on('will-quit', () => {
//         globalShortcut.unregister(shortcut)
//         globalShortcut.unregisterAll()
//       })
//     }
//   }
// }

app.on('before-quit', () => {
  appWindow?.close()
  appWindow = null
  app.exit(0)
})

// app.on('window-all-closed', () => {
//   appWindow = null
// })
