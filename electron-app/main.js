const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

let laravelProcess;
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    // SEMPRE carrega do localhost:8000 (Laravel)
    mainWindow.loadURL('http://localhost:8000');

    // Em desenvolvimento, abre DevTools
    if (process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools();
    }
}

// Função para verificar se o PHP está disponível
function checkPHP() {
    return new Promise((resolve) => {
        const phpCheck = spawn('php', ['--version']);

        phpCheck.on('error', () => {
            resolve(false);
        });

        phpCheck.on('exit', (code) => {
            resolve(code === 0);
        });
    });
}

// Função para iniciar o Laravel
function startLaravel() {
    const laravelPath = path.join(__dirname, '../venda-facil-Laravel');

    if (!fs.existsSync(path.join(laravelPath, 'artisan'))) {
        dialog.showErrorBox('Erro', 'Laravel não encontrado!');
        return;
    }

    laravelProcess = spawn('php', ['artisan', 'serve'], {
        cwd: laravelPath,
        stdio: 'ignore' // Não mostrar output no console
    });
}

app.whenReady().then(async () => {
    // Verifica se o PHP está instalado
    const hasPHP = await checkPHP();

    if (!hasPHP) {
        dialog.showErrorBox(
            'PHP Não Encontrado',
            'PHP não está instalado ou não está no PATH do sistema.\n\n' +
            'Por favor, instale o PHP e adicione ao PATH do Windows.'
        );
        app.quit();
        return;
    }

    // Inicia o Laravel
    startLaravel();

    // Aguarda 3 segundos para o Laravel iniciar
    setTimeout(() => {
        createWindow();
    }, 3000);
});

app.on('window-all-closed', () => {
    if (laravelProcess) {
        laravelProcess.kill();
    }
    app.quit();
});

app.on('before-quit', () => {
    if (laravelProcess) {
        laravelProcess.kill();
    }
});