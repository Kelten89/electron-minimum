// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.

document.getElementById("btn_dev_tool").onclick = function () {
    alert("btn_dev_tool");
};

document.getElementById("btn_back").onclick = function () {
    alert("btn_back");
};