// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.

const electron = require(`electron`)

document.getElementById("btn_dev_tool").onclick = function () {
    electron.ipcRenderer.send('open-developer-tool')
};

document.getElementById("btn_back").onclick = function () {
    electron.ipcRenderer.send('go-back')
};

document.getElementById("btn_quit").onclick = function () {
    electron.ipcRenderer.send('quit-app')
};

document.getElementById("btn_danji").onclick = function () {
    document.getElementById("main_contents").setAttribute("src", "./options/danjiSetting.html")
};

document.getElementById("btn_screen_size").onclick = function () {
    document.getElementById("main_contents").setAttribute("src", "./options/screenSizeSetting.html")
};