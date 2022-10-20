// Modules to control application life and create native browser window
import { app, BrowserWindow, BrowserView, ipcMain } from "electron";
import * as path from "path";

const { autoUpdater } = require("electron-updater")
const log = require("electron-log")

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    // icon: getAssetPath("icon.png"),

    // fullscreen: true,
    // frame: false,
    // autoHideMenuBar: true,
    // kiosk: true,
    // skipTaskbar: true,

    // webPreferences: {
    //   preload: path.join(__dirname, "preload.js"),
    //   nodeIntegration: false,
    //   devTools: true,
    // },
  });

  // and load the index.html of the app.
  // mainWindow.loadFile("src/index.html");

  const contentBounds = mainWindow.getContentBounds();
  const view = new BrowserView({
    webPreferences: {
      devTools: true,
      nodeIntegration:true,
      contextIsolation: false,
      // preload: path.join(app.getAppPath(), "preload.js"),
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.setBrowserView(view);
  view.setBounds({
    x: 0,
    y: 28,
    width: contentBounds.width,
    height: contentBounds.height,
  });
  view.setAutoResize({ width: true, height: true });
  // view.webContents.loadURL("https://electronjs.org");
  view.webContents.loadURL("http://m.naver.com");
  // view.webContents.loadFile('src/index.html');
  // view.webContents.loadURL("https://app.giftistar.net/home");

  // 다른 창보다 항상 앞선다
  // mainWindow.setAlwaysOnTop(true, "screen-saver");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
  // view.webContents.openDevTools();
};

autoUpdater.on('checking-for-update', () => {
  log.info('업데이트 확인 중...')
})
autoUpdater.on('update-available', (info) => {
  log.info('업데이트가 가능합니다.')
})
autoUpdater.on('update-not-available', (info) => {
  log.info('현재 최신버전입니다.')
})
autoUpdater.on('error', (err) => {
  log.info('에러가 발생하였습니다. 에러내용 : ' + err)
})
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "다운로드 속도: " + progressObj.bytesPerSecond
  log_message = log_message + ' - 현재 ' + progressObj.percent + '%'
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')'
  log.info(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
  log.info('업데이트가 완료되었습니다.')
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  autoUpdater.checkForUpdates()

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

ipcMain.handle("show-setting", () => {
  BrowserWindow.getAllWindows()[0]
    .getBrowserViews()[0]
    .webContents.loadFile('src/index.html')
});

ipcMain.on("go-back", () => {
  BrowserWindow.getAllWindows()[0]
    .getBrowserViews()[0]
    .webContents.goBack()
});

ipcMain.on("quit-app", () => {
  app.quit();
});

ipcMain.on("open-developer-tool", () => {
  BrowserWindow.getAllWindows()[0]
    .getBrowserViews()[0]
    .webContents.openDevTools();
});
