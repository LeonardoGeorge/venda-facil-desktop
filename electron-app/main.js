const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let phpProcess;

function createWindow() {
    // Criar a janela principal
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        },
        show: false // Esconder até carregar
    });

    // Iniciar o servidor Laravel
    startLaravelServer();

    // Quando estiver pronto, mostrar a janela
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        mainWindow.maximize(); // Abrir maximizado
    });

    // Carregar o Laravel após alguns segundos
    setTimeout(() => {
        mainWindow.loadURL('http://localhost:8000')
            .then(() => {
                console.log('✅ Laravel carregado com sucesso!');
            })
            .catch(err => {
                console.log('🔄 Tentando carregar novamente...');
                mainWindow.loadURL('http://localhost:8000');
            });
    }, 4000);
}

function startLaravelServer() {
    const laravelPath = path.join(__dirname, '../venda-facil-Laravel');

    console.log('🚀 Iniciando servidor Laravel...');

    // Iniciar php artisan serve
    phpProcess = spawn('php', ['artisan', 'serve', '--host=127.0.0.1', '--port=8000'], {
        cwd: laravelPath,
        stdio: 'pipe'
    });

    phpProcess.stdout.on('data', (data) => {
        console.log(`📢 Laravel: ${data}`);
    });

    phpProcess.stderr.on('data', (data) => {
        console.error(`❌ Erro Laravel: ${data}`);
    });

    phpProcess.on('error', (err) => {
        console.error('💥 Erro ao iniciar servidor PHP:', err);
    });
}

// Configurar menu simples
function createMenu() {
    const template = [
        {
            label: 'Venda Fácil',
            submenu: [
                {
                    label: 'Sobre',
                    click: () => {
                        console.log('Sobre Venda Fácil');
                    }
                },
                { type: 'separator' },
                { role: 'quit', label: 'Sair' }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

// Eventos do Electron
app.whenReady().then(() => {
    createMenu();
    createWindow();
});

app.on('window-all-closed', () => {
    // Parar o servidor PHP quando fechar
    if (phpProcess) {
        phpProcess.kill();
    }

    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.on('before-quit', () => {
    // Garantir que o PHP seja fechado
    if (phpProcess) {
        phpProcess.kill();
    }
});