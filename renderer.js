onload = () => {
    const webview = document.getElementById("thoughts")
    const url = require('url');
    const {ipcRenderer} = require('electron')

    const shouldOpenInExternal = function(link) {
        return (url.parse(link).host !== "0.0.0.0:7777");
    }

    // webview.addEventListener('dom-ready', (e) => {
        // webview.openDevTools()
        // console.log("Opened dev tools.")
    // })

    webview.addEventListener('will-navigate', (e) => {
        if (shouldOpenInExternal(e.url)) {
            ipcRenderer.sendSync('load-external-page', e.url)
            webview.stop()
        }
    })
}
