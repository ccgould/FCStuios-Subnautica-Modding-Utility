// Modules
const { app, BrowserWindow, ipcMain } = require("electron");
const windowStateKeeper = require('electron-window-state');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, configurationPage;

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  //Window State Keeper
  let state = windowStateKeeper({
    defaultHeight: 800,
    defaultWidth: 1600,
  });

  mainWindow = new BrowserWindow({
    x: state.x,
    y: state.y,
    width: state.width,
    height: state.height,
    minWidth: 786,
    minHeight: 400,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true,
      backgroundColor: "#171717",
    },
  });

  configurationPage = new BrowserWindow({
    width: 812,
    height: 533,
    x:mainWindow.x,
    y:mainWindow.y,
    webPreferences: {
      nodeIntegration: true,
      backgroundColor: "#171717",
      resizable: false
    },
    parent: mainWindow,
    modal:true
  });

  // Load main.html into the new BrowserWindow
  mainWindow.loadFile("./Source/Renderer/main.html");

  // Load configurationPage.html into the new BrowserWindow
  configurationPage.loadFile("./Source/Renderer/Pages/ConfigurationPage.html");

  //Manage window state
  state.manage(mainWindow);

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  // Listen for window being closed
  configurationPage.on("closed", () => {
    configurationPage = null;
  });
}

ipcMain.handle('get-Window', (e) => {
  console.log("got it")
  console.log(mainWindow.isFocused());
  if (!mainWindow.isFocused()) {
    mainWindow.show();
  }
});

// Electron `app` is ready
app.on("ready", createWindow);

// Quit when all windows are closed - (Not macOS - Darwin)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
