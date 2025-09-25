const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

const isDev = !app.isPackaged;
let mainWindow;
let phpProcess;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            webSecurity: false
        },
        icon: path.join(__dirname, '../assets/icon.ico'),
        show: false // Esconder até carregar
    });

    if (isDev) {
        // Modo desenvolvimento
        mainWindow.loadURL('http://127.0.0.1:8000');
        mainWindow.webContents.openDevTools();
        mainWindow.show();
    } else {
        // Modo produção
        startLaravelServer();

        // Tentar carregar após 3 segundos
        setTimeout(() => {
            mainWindow.loadURL('http://127.0.0.1:8000')
                .then(() => {
                    console.log('✅ Aplicação carregada com sucesso!');
                    mainWindow.show();
                })
                .catch((error) => {
                    console.error('❌ Erro ao carregar:', error);
                    // Tentar novamente após 2 segundos
                    setTimeout(() => {
                        mainWindow.loadURL('http://127.0.0.1:8000').then(() => mainWindow.show());
                    }, 2000);
                });
        }, 3000);
    }
}

function startLaravelServer() {
    try {
        // Em produção, o Laravel está na mesma pasta
        const laravelPath = path.join(process.cwd(), 'venda-facil-Laravel');

        console.log('📁 Caminho do Laravel:', laravelPath);

        phpProcess = spawn('php', ['artisan', 'serve', '--host=127.0.0.1', '--port=8000'], {
            cwd: laravelPath,
            stdio: 'inherit'
        });

        console.log('🚀 Servidor Laravel iniciado');

        phpProcess.on('error', (error) => {
            console.error('❌ Erro no processo PHP:', error);
        });

    } catch (error) {
        console.error('❌ Erro crítico ao iniciar Laravel:', error);
    }
}

// Eventos do aplicativo
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (phpProcess) {
        phpProcess.kill();
    }
    if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
    if (phpProcess) {
        phpProcess.kill();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});