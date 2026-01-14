const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    minWidth: 500,
    minHeight: 300,
    title: "Noah's Rubiks Cube",
    backgroundColor: "#373a42",
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile(path.join(__dirname, "build", "index.html"));
  win.on("page-title-updated", (event) => {
    event.preventDefault(); 
    win.setTitle("Noah's Rubiks Cube");
  });
}

app.on("ready", createWindow);
