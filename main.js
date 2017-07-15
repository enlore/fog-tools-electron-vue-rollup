/* jshint node: true, asi: true, laxcomma: true, esversion: 6 */
'use strict'
const reload = require('electron-reload')

if (process.env.NODE_ENV === 'development')
    reload(__dirname)

require('dotenv').config()

const { resolve } = require('path')

const couchbase = require('couchbase')
const { app, BrowserWindow } = require('electron')

let mainWindow
//const winURL = process.env.NODE_ENV === 'development'
  //? `http://localhost:${require('../../../config').port}`
  //: `file://${__dirname}/index.html`

const winUrl = resolve(__dirname, 'index.html')

console.info('file://' + winUrl)

function createWindow () {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800
  })

  mainWindow.loadURL(winUrl)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.webContents.openDevTools()

  //mainWindow.openDevTools()

  // eslint-disable-next-line no-console
  console.log('mainWindow opened')
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
