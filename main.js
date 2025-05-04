// import * as React from 'react';
import { createRoot } from 'react-dom/client';

// const root = createRoot(document.body);
// root.render(<h2>Hello from React!</h2>);

const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })
  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})