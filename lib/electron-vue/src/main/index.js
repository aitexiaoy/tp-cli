const electron = require('electron')

const { app, BrowserWindow,ipcMain } = electron
const { autoUpdater } = require('electron-updater')
const log = require('electron-log')

log.transports.file.level = 'info'

// 托盘对象
let mainWindow = null

appOpenInit()
ipcMainInit()
autoUpdaterInit()
setTimeIntervalInit()


/**
 * 创建程序锁，保证只能打开单个实例 
 * @function appOpenInit
 */
function appOpenInit(){
    if (isWin()) {
        const gotTheLock = app.requestSingleInstanceLock()
        if (!gotTheLock) {
            app.quit()
        } else {
            app.on('second-instance', (event, commandLine, workingDirectory) => {
                if (mainWindow) {
                    if (!mainWindow.isVisible()) {
                        mainWindowShow()
                    }
                    mainWindow.focus()
                }
            })
        }
    } else if (isMac()) {
        app.dock.hide()  
    }
    app.on('ready', () => {
        setTimeout(() => {
            if (!isDev()) {
                autoUpdater.logger = log
                autoUpdater.autoDownload = false
                checkUpdater()
            }
            appInit()
        }, 10)
    })

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })


    app.on('activate', () => {
        if (mainWindow === null) {
            appInit()
        } else {
            mainWindowShow()
        }
    })
}

/**
 * 创建窗口
 * @function createWindow
 */
function createWindow() {
    mainWindow = new BrowserWindow({
        height: 800,
        width: 800,
        frame: false,
        transparent: false,  // 窗口是否透明
        show: true,
        alwaysOnTop: true,
        resizable: false, // 禁止变化尺寸
        hasShadow: true, // 是否阴影
        focusable: true,
        fullscreenable: false,
        skipTaskbar: true,
        titleBarStyle: 'customButtonsOnHover'
    })

    // mainWindow.openDevTools()

    mainWindow.loadURL(baseUrl)

    mainWindow.on('blur', () => {
        mainWindow.hide()
    })

    mainWindow.on('closed', () => {
        app.quit()
        mainWindow = null
    })
}

function appInit() {
    if (mainWindow == null) {
        createWindow() // 创建主窗口
    } else {
        mainWindowShow()
    }
}

function mainWindowShow() {
    let opacity = 0
    mainWindow.show()
    const time = setInterval(() => {
        if (opacity >= 1) {
            opacity = 1
            clearInterval(time)
        }
        mainWindow.setOpacity(opacity)
        opacity = parseFloat((opacity + 0.1).toFixed(1))
    }, 30)
}

function mainWindowHide() {
    let opacity = 1
    const time = setInterval(() => {
        if (opacity <= 0) {
            opacity = 0.0
            clearInterval(time)
            mainWindow.hide()
        }
        mainWindow.setOpacity(opacity)
        opacity = parseFloat((opacity - 0.1).toFixed(1))
    }, 30)
}


function ipcMainInit() {
    /** * 主进程传一个字符串给渲染进程，渲染进程在传递事件给主进程 用于主进程中的一些函数回调 */
    ipcMain.on('types', (event, data, argument) => {
     
    })
}

/**
 * 检查更新
 */
function checkUpdater() {
    autoUpdater.checkForUpdates().then((result) => {
    }).catch((error) => {
        log.error(error)
    })
}

function autoUpdaterInit() {
    /** * 下载完成 */
    autoUpdater.on('update-downloaded', () => {
        autoUpdater.quitAndInstall()
    })

    autoUpdater.on('error', (info) => {
   
    })


    autoUpdater.on('update-available', (info) => {
        log.info('检测到新版本', info)
    })

    autoUpdater.on('checking-for-update', (info) => {
        log.info('检测更新已发出', info)
    })


    autoUpdater.on('update-not-available', (info) => {
        log.error('没有检测到新版本', info)
    })


    // 更新下载进度
    autoUpdater.on('download-progress', (progressObj) => {
   
    })
}
