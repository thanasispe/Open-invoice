// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, dialog} = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
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
          label: "Νέο Τιμολόγιο",
          click(){
            
          }
      },

      {
        label: "Άνοιγμα Τιμολογίου",

        click(){
          openFile(['md'],'js');
        }
      },

      {
        label: "Έξοδος",
        click(){
          app.quit()
        },

        accelerator: "crtl+q"
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

// Open file function 
function openFile(s_name, s_extension){
  const files = dialog.showOpenDialogSync(mainWindow, {
    properties:['openFile'],
    filters: [{
     name:s_name,
     extensions:s_extension 
    }]
  });

  if (!files)
    return;

  const file = files[0];

  const fileContent = fs.readFileSync(file).toString();
  console.log(fileContent);
}