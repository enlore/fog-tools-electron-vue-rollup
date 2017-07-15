/* jshint node: true, asi: true, laxcomma: true, esversion: 6 */
'use strict'
const reload = require('electron-reload')

if (process.env.NODE_ENV === 'development')
    reload(__dirname)

require('dotenv').config()

const { resolve } = require('path')

const { app, BrowserWindow } = require('electron')

let mainWindow

const winUrl = resolve(__dirname, 'public', 'index.html')

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

  //mainWindow.webContents.openDevTools()

  console.log('mainWindow opened')
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') { // for OSX
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
