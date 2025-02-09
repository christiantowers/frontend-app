# Frontend - Aplicacao React

Este repositório contém o frontend da aplicação, desenvolvido em React.

## 📌 **Pré-requisitos**

Antes de instalar e rodar o projeto, verifique se você tem os seguintes requisitos:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/) instalado

## 🚀 **Instalação e Execução**

1️⃣ **Clone o repositório:**

```bash
git clone https://github.com/christiantowers/frontend-app.git
```

2️⃣ **Acesse o diretório do projeto:**

```bash
cd frontend-app
```

3️⃣ **Instale as dependências:**

```bash
npm install
# ou
yarn install
```

4️⃣ **Configuração do ambiente**

Crie um arquivo `.env` na raiz do projeto e adicione as configurações necessárias, como a URL da API backend:

```
REACT_APP_API_URL=http://localhost:8080
```

5️⃣ **Inicie o servidor de desenvolvimento:**

```bash
npm start
# ou
yarn start
```

A aplicação estará disponível em **http://localhost:3000**

## 📦 **Build para produção**

A aplicação estará em dev **http://localhost:5173**

Para gerar os arquivos otimizados para produção, use o comando:

```bash
npm run build
# ou
yarn build
```

Os arquivos serão gerados na pasta `build/` e podem ser servidos por um servidor web.

## 🛠 **Tecnologias utilizadas**

- React
- TypeScript
- Mantine UI
- React Router
- Axios (para requisições HTTP)
