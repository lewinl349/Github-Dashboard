import { app, BrowserWindow } from 'electron/main';
import { shell } from 'electron';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1600,
    height: 900
  });

  // Open links in another window (That has the target="_blank")
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  })
  win.loadURL('http://localhost:5173/');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  })
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});