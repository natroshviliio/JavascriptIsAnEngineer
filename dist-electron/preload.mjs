"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args) {
    const [channel, listener] = args;
    return electron.ipcRenderer.on(channel, (event, ...args2) => listener(event, ...args2));
  },
  off(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.off(channel, ...omit);
  },
  send(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.send(channel, ...omit);
  },
  invoke(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.invoke(channel, ...omit);
  },
  // openFolder: () => ipcRenderer.send("openfolder"),
  getData: () => electron.ipcRenderer.invoke("getData"),
  openPath: (path) => electron.ipcRenderer.send("openPath", path),
  getAutom: (callback) => {
    electron.ipcRenderer.on("getAutom", (_, message) => callback(message));
  }
  // You can expose other APTs you need here.
  // ...
});
