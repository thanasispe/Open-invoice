// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  let menu = Menu.buildFromTemplate([{
    label: "File",

    submenu:[
      {
          label: "Νέο Τιμολόγιο"
      },

      {
        label: "Άνοιγμα Τιμολογίου"
      },

      {
        label: "Έξοδος",
        click(){
          app.quit()
        },

        accelerator: "crtl q"
      }
    ]
  },

  {
    label:"Tools",
    submenu: [
      {
        label:"Dev Tools",

        click(){
          mainWindow.webContents.openDevTools()
        },

        accelerator:"F12"
      }
    ]
  }
]);

  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {

    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
