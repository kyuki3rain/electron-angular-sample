// 各モジュールのインポート
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');


// ブラウザウィンドウに関する処理
function createWindow () {
    // ブラウザウィンドウの作成
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js') // ウィンドウプロセスの初期化スクリプト指定
        }
    })
    mainWindow.webContents.openDevTools();

    // URLの読み込み
    mainWindow.loadURL(
        app.isPackaged
        ? `file://${path.join(__dirname, "../build/index.html")}`// 本番環境の場合
        : "http://localhost:4200"// 開発環境の場合
    );
}

// 初期化が完了し、ウィンドウの起動準備ができた時に呼ばれる処理（APIの呼び出しはこの処理の後）
app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        // 開いているウィンドウがなければ開く
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

ipcMain.handle('ping', (event, message) => {
    // message には 呼び出し元からのデータ ('ping') が入っている
    console.log(message);
    // renderer プロセスにデータを返す
    return 'pong';
  });


// ウィンドウが閉じた時の処理（macOSでは明示的にアプリケーションを終了した時）
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})