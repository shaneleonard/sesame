const {app, BrowserWindow} = require('electron');
const url = require('url')
const path = require('path')
const {ipcMain} = require('electron')
const {shell} = require('electron')
const {session} = require('electron')

let win

app.on('ready', function() {
    const sess = session.fromPartition('', { cache: false })

    win = new BrowserWindow({ 
        width: 1280,
        height: 700,
        frame: true,
        webPreferences:
        {
            session: sess
        },
        show: false
    })

    win.once('ready-to-show', () => {
        win.show()
        win.setFullScreen(true)
    })

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    win.on('closed', () => {
        win = null
    })

    ipcMain.on('load-external-page', (event, arg) => {
        console.log("Received request for external page: " + arg)
        shell.openExternal(arg)
        event.returnValue = 'success'
    })

    ipcMain.on('load-local-resource', (event, arg) => {
        console.log("Received request for local resource: " + arg)
        shell.openItem(arg)
        event.returnValue = 'success'
    })
})
