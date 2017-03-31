const {app, BrowserWindow} = require("electron")
const path                 = require("path")
const url                  = require("url")
const discoverer           = require("./discoverer")
const ipc                  = require("electron").ipcMain

let win

function createWindow () {
  win = new BrowserWindow({width: 800, height: 600})

  if (process.env.ENV === "development") {
    win.loadURL("http://localhost:4200");
    win.webContents.openDevTools();
  } else {
     win.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: "file:",
      slashes: true
    }));
  }

  win.on("closed", () => {
    win = null
  })

  discoverer.start();
  ipc.on("getAvailableElicopters", function (event, arg) {
    event.returnValue = discoverer.getAvailableElicopters();
  })
}

app.setName("Elicopter")
app.on("ready", createWindow)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})
app.on("activate", () => {
  if (win === null) {
    createWindow()
  }
})
