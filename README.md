# React-Next Electron Project

## Descrição

Este é um projeto que utiliza React, Next.js e Electron para criar uma aplicação de controle de estoque. A aplicação permite buscar, editar e gerar relatórios de produtos, com suporte para dispositivos móveis e desktop. A integração com a API local permite gerenciar produtos de maneira eficiente.

## Estrutura do Projeto

- **DesktopApp.js**: Componente principal para a versão desktop da aplicação.
- **MobileApp.js**: Componente principal para a versão móvel da aplicação.
- **componentes**: Pasta contendo os componentes reutilizáveis como BarraDeBusca, TabelaDeProdutos, ModalEditarProduto, ModalQRCode, e Header.
- **utils**: Pasta contendo utilitários como funções para gerar relatórios em PDF.
- **styles**: Estilos customizados para a aplicação.

## Instalação

1. Clone o repositório:
    ```sh
    git clone https://github.com/seu-usuario/seu-repositorio.git
    ```
2. Navegue até o diretório do projeto:
    ```sh
    cd seu-repositorio
    ```
3. Instale as dependências:
    ```sh
    npm install
    ```

## Executando a Aplicação

### Modo de Desenvolvimento

1. Execute o servidor de desenvolvimento do Next.js:
    ```sh
    npm run dev
    ```
2. Em outra janela do terminal, execute o Electron:
    ```sh
    npm run electron-dev
    ```
3. Abra a aplicação em `http://localhost:3000`.

### Modo de Produção

1. Construa a aplicação:
    ```sh
    npm run build
    npm run export
    ```
2. Execute o Electron em modo de produção:
    ```sh
    npm run electron-pack
    ```

## Funcionalidades

### DesktopApp

- **Buscar Produtos**: Busca produtos pelo nome ou código.
- **Editar Produto**: Abre um modal para editar a quantidade de um produto.
- **Gerar Relatório**: Gera um relatório em PDF dos produtos.

### MobileApp

- **Buscar Produtos**: Busca produtos pelo nome ou código.
- **Editar Produto**: Abre um modal para editar a quantidade de um produto.
- **Leitor de Código de Barras**: Abre um leitor de código de barras para escanear produtos.

### Componentes

- **BarraDeBusca**: Campo de busca para produtos.
- **TabelaDeProdutos**: Tabela que lista os produtos filtrados.
- **ModalEditarProduto**: Modal para editar a quantidade do produto.
- **ModalQRCode**: Modal que exibe um QR Code para acesso mobile.
- **Header**: Cabeçalho com a opção de gerar relatório em PDF.

## Endpoints da API

- `GET /api/getLocalIP`: Obtém o endereço IP local.
- `GET /api/produtos`: Retorna a lista de produtos.
- `PUT /api/produtos/:id`: Atualiza a quantidade de um produto.

## Configuração

### Variáveis de Ambiente

Certifique-se de configurar as variáveis de ambiente necessárias no arquivo `.env`.

```plaintext
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Dependências

- React
- Next.js
- Electron
- Axios
- @mui/material
- react-device-detect
- react-qr-barcode-scanner

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`).
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`).
4. Faça um push para a branch (`git push origin feature/MinhaFeature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.