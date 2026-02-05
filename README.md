# WasteBuddy 📉

O **WasteBuddy** é um aplicativo mobile focado em **Produto Mínimo Viável (MVP)** para o controle financeiro simplificado. Desenvolvido como projeto prático para o curso de **Análise e Desenvolvimento de Sistemas (ADS)** no IFPI Campus Pedro II.

O foco da aplicação é oferecer agilidade no registro de despesas e persistência segura de dados localmente.

## 🚀 Funcionalidades

* **Registro Instantâneo**: Inserção de descrição e valor com suporte a decimais brasileiros (vírgula).
* **Cálculo em Tempo Real**: Somatório automático de todos os gastos através de métodos de alta ordem (`reduce`).
* **Persistência Offline**: Armazenamento dos dados no dispositivo via `AsyncStorage`.
* **Gestão de Registros**: Exclusão individual de itens ou limpeza completa do histórico (**Zerar Tudo**).
* **Interface Responsiva**: Design limpo e adaptável, com feedbacks de carregamento (`ActivityIndicator`).

## 🛠️ Tecnologias Utilizadas

* **React Native**: Framework para desenvolvimento cross-platform.
* **Expo**: Toolchain para aceleração do ciclo de desenvolvimento.
* **AsyncStorage**: Banco de dados NoSQL local do tipo chave-valor.
* **JavaScript (ES6+)**: Lógica funcional e manipulação de estados.

---

## 📦 Passo a Passo para Instalação

Siga as instruções abaixo para rodar o projeto em seu ambiente local:

### 1. Pré-requisitos
Certifique-se de ter instalado:
* **Node.js** (LTS recomendado).
* Gerenciador de pacotes (**npm** ou **yarn**).
* Aplicativo **Expo Go** no seu celular (Android ou iOS).

### 2. Clonar o Repositório
```bash
git clone [https://github.com/seu-usuario/wastebuddy.git](https://github.com/seu-usuario/wastebuddy.git)
cd wastebuddy
```

### 3. Instalar Dependências
```bash
npm install
# Garanta a biblioteca de persistência:
npx expo install @react-native-async-storage/async-storage
```
### 4. Iniciar a Aplicação
```bash
npx expo start
```
### 5. Rodar no Celular
* Abra o aplicativo Expo Go no seu smartphone.
* Escaneie o QR Code que aparecerá no terminal ou no navegador.
* Certifique-se de que o celular e o computador estejam conectados na mesma rede Wi-Fi.
