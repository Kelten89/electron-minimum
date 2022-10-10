// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, BrowserView } = require("electron");
const path = require("path");

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // icon: getAssetPath("icon.png"),

    // fullscreen: true,
    // frame: false,
    // autoHideMenuBar: true,
    // kiosk: true,
    // skipTaskbar: true,

    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      devTools: true,
    },
  });

  // and load the index.html of the app.
  // mainWindow.loadFile("src/index.html");

  const contentBounds = mainWindow.getContentBounds();
  const view = new BrowserView();
  mainWindow.setBrowserView(view);
  view.setBounds({
    x: 0,
    y: 0,
    width: contentBounds.width,
    height: contentBounds.height,
  });
  view.setAutoResize({ width: true, height: true });
  view.webContents.loadURL("https://electronjs.org");

  // 다른 창보다 항상 앞선다
  mainWindow.setAlwaysOnTop(true, "screen-saver");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

