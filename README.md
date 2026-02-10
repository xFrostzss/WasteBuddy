# WasteBuddy📉

O **WasteBuddy** evoluiu de um controlador simples para uma aplicação robusta de gestão financeira pessoal. Desenvolvido como projeto prático para o curso de **Análise e Desenvolvimento de Sistemas (ADS)** no IFPI Campus Pedro II.

O foco atual é a união entre uma interface moderna (UI) e um fluxo de navegação completo com persistência de dados.

## 💻Funcionalidades

* **Sistema de Login**: Acesso restrito com persistência de sessão (o app lembra se você já está logado).
* **Navegação via Drawer**: Menu lateral deslizante para alternar entre telas e realizar Logout.
* **Interface Premium**: Uso de gradientes (`LinearGradient`), cards com sombras e efeitos de hover nos botões.
* **Registro e Cálculo**: Inserção de despesas com somatório automático via métodos de alta ordem (`reduce`).
* **Persistência Offline**: Armazenamento local de gastos e dados de sessão via `AsyncStorage`.
* **Splash Screen**: Tela de carregamento personalizada ao iniciar o aplicativo.

## 🛠️Tecnologias Utilizadas

* **React Native & Expo**: Base para desenvolvimento cross-platform.
* **React Navigation (Drawer)**: Gestão de rotas e menus laterais.
* **React Native Reanimated**: Motor de animações para transições de interface.
* **AsyncStorage**: Banco de dados NoSQL local para persistência de dados.
* **JavaScript (ES6+)**: Lógica funcional e manipulação de estados.

---

## 🗺️Passo a Passo para Instalação

Siga as instruções abaixo para configurar o ambiente com as novas dependências de navegação:

### 1. Pré-requisitos
Certifique-se de ter instalado:
* **Node.js** (LTS recomendado).
* Aplicativo **Expo Go** no seu celular.

### 2. Clonar o Repositório
```bash
git clone [https://github.com/seu-usuario/wastebuddy.git](https://github.com/seu-usuario/wastebuddy.git)
cd wastebuddy
```
### 3. Instalar Dependências
```bash
npm install
npx expo install @react-navigation/native @react-navigation/drawer react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated expo-linear-gradient @react-native-async-storage/async-storage
```
### 4. Iniciar a Aplicação
```bash
npx expo start
```
### 5. Rodar no Celular
* Abra o Expo Go no seu smartphone.
* Escaneie o QR Code no terminal.
* Credenciais de Teste: Usuário: admin | Senha: 123

📂 Estrutura de Arquivos
App.js: Componente principal com a lógica de estados e Navegação.
login.js: Tela de autenticação.
/src/styles/: Módulos de estilização (App, Login, Botões).
babel.config.js: Configuração do plugin react-native-reanimated/plugin.
