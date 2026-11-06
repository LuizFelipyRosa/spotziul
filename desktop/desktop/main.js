const { app, BrowserWindow, Menu, session } = require("electron");
const path = require("path");

function createWindow() {
  session.defaultSession.webRequest.onHeadersReceived((d, cb) => {
    const h = d.responseHeaders || {};
    if (!Object.keys(h).some(k => k.toLowerCase() === "access-control-allow-origin")) {
      h["Access-Control-Allow-Origin"] = ["*"];
    }
    cb({ responseHeaders: h });
  });
  Menu.setApplicationMenu(null);
  const win = new BrowserWindow({
    width: 1100,
    height: 760,
    minWidth: 380,
    minHeight: 600,
    backgroundColor: "#121212",
    title: "spotziul",
    icon: path.join(__dirname, "icon.png"),
    webPreferences: { autoplayPolicy: "no-user-gesture-required" }
  });
  win.loadFile("index.html");
}

app.whenReady().then(createWindow);
app.on("window-all-closed", () => app.quit());

