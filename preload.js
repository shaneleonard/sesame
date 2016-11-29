const {ipcRenderer} = require('electron')
const url = require('url')

onload = () => {
    const links = document.querySelectorAll('a[href]')
    links.forEach(function(link) {
        if (link.href.indexOf("file://") == 0) {
            const filePath = url.parse(link.href).path
            link.href = "#"
            link.addEventListener("click", (e) => {
                ipcRenderer.sendSync("load-local-resource", filePath)
                e.preventDefault()
            })
        }
    })
}
