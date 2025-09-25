# Venda Fácil Desktop 🚀

![Electron](https://img.shields.io/badge/Electron-2B2E3A?style=for-the-badge&logo=electron&logoColor=white)
![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

Uma aplicação desktop moderna para gestão de vendas desenvolvida com **Electron** e **Laravel**, proporcionando uma experiência rápida e eficiente para pequenos e médios negócios.

## ✨ Características Principais

- 💻 **Interface Desktop Nativa** - Desenvolvida com Electron para melhor performance
- 🛒 **Gestão de Vendas Completa** - Controle total do processo de vendas
- 📊 **Relatórios e Dashboard** - Análises em tempo real do desempenho
- 🗄️ **Backend Robust** - API Laravel com arquitetura MVC
- 🔒 **Segurança** - Autenticação e autorização implementadas
- 📦 **Fácil Instalação** - Setup simplificado e documentado

## 🚀 Começando

### Pré-requisitos

- Node.js 16+
- PHP 8.0+
- Composer
- MySQL/PostgreSQL

### Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/LeonardoGeorge/venda-facil-desktop.git
cd venda-facil-desktop
```

2. **Instale as dependências**

```bash
# Dependências do Electron
npm install

# Dependências do Laravel
cd venda-facil-Laravel
composer install
```

3. **Configure o ambiente**

```bash
# Copie o arquivo de ambiente
cp .env.example .env

# Gere a chave da aplicação
php artisan key:generate

# Configure o banco de dados no arquivo .env
```

4. **Execute a aplicação**

```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

## 🏗️ Estrutura do Projeto

```
venda-facil-desktop/
├── electron-app/          # Frontend Electron
│   └── main.js           # Processo principal
├── venda-facil-Laravel/  # Backend API
│   ├── app/              # Lógica da aplicação
│   ├── database/         # Migrations e seeds
│   └── resources/        # Views e assets
├── build/               # Builds e distribuição
└── package.json         # Configuração do Electron
```

## 🛠️ Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Electron + Laravel em dev
npm run electron:dev     # Apenas Electron em dev

# Build
npm run build           # Build para produção
npm run dist            # Cria instaladores

# Laravel específicos
cd venda-facil-Laravel
php artisan migrate     # Executa migrations
php artisan serve       # Servir API separadamente
```

## 📦 Funcionalidades

### 🛒 Módulo de Vendas

- Cadastro rápido de produtos
- Carrinho de compras intuitivo
- Múltiplas formas de pagamento
- Emissão de NFC-e (opcional)

### 📊 Gestão de Estoque

- Controle de entrada e saída
- Alertas de estoque mínimo
- Movimentação de inventário
- Relatórios de giro

### 👥 Clientes

- Cadastro completo de clientes
- Histórico de compras
- Fidelidade e descontos
- Segmentação por perfil

## 🎯 Roadmap

- [ ] Integração com SAT fiscal
- [ ] Sync em nuvem
- [ ] App mobile complementar
- [ ] Módulo de delivery
- [ ] Relatórios avançados com gráficos

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga estos passos:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Desenvolvedor

**Leonardo George**

- GitHub: [@LeonardoGeorge](https://github.com/LeonardoGeorge)
- Email: leonardogeorge@example.com

## 📞 Suporte

Encontrou um problema? [Abra uma issue](https://github.com/LeonardoGeorge/venda-facil-desktop/issues) que responderemos rapidamente!

---

**⭐ Se este projeto te ajudou, deixe uma estrela no repositório!**

---

## 🔄 Atualizando o Projeto

Para manter seu projeto atualizado:

```bash
# Buscar atualizações
git pull origin master

# Instalar novas dependências
npm install

# Atualizar dependências do Laravel
cd venda-facil-Laravel
composer install

# Executar migrations se houver
php artisan migrate
```

---

*Desenvolvido com 💚 para facilitar a vida dos pequenos empreendedores*
