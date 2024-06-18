
# Projeto de Contagem de Estoque

## Objetivos do Projeto
- Criar um aplicativo de contagem de estoque que funcione como um programa nativo do Windows.
- Fornecer acesso mobile via QR-Code para busca de produtos e contagem de estoque.
- Implementar uma busca por produtos e leitura de código de barras.
- Mostrar uma listagem de todos os produtos com uma barra de rolagem.
- Permitir envio de contagens de estoque do mobile para o PC.
- Visualizar e alterar as contagens no PC.
- Gerar um relatório em PDF das contagens finalizadas.

## Tecnologias Utilizadas
- React
- Next.js
- Electron (para criar o aplicativo nativo do Windows)
- QR-Code generator
- Biblioteca para leitura de código de barras
- Biblioteca para geração de PDF (como jsPDF)
- Backend com Node.js e Express (para servir o mobile e gerenciar as contagens)
- Banco de dados (SQLite)

## To-Do List

### Configuração Inicial do Projeto
- [x] Criar um novo projeto Next.js
- [x] Configurar Electron para criar o aplicativo nativo do Windows
- [x] Configurar o backend com Node.js e Sequelize
- [x] Configurar banco de dados para armazenar os produtos e contagens

### Desenvolvimento do Frontend (PC)
- [x] Criar a interface principal com uma barra de pesquisa no topo
- [x] Implementar um botão ao lado da barra de pesquisa para leitura de código de barras
- [x] Mostrar a listagem de todos os produtos com barra de rolagem
- [x] Garantir que a barra de pesquisa e o botão de leitura de código de barras fiquem sempre visíveis

### Funcionalidades de Busca e Leitura de Código de Barras
- [x] Implementar a funcionalidade de busca por produtos na barra de pesquisa
- [x] Integrar uma biblioteca de leitura de código de barras
- [ ] Desenvolver a lógica para buscar o produto pelo código de barras
- [ ] Mostrar um modal solicitando a inserção da quantidade de estoque contada ao encontrar o produto

### Acesso Mobile via QR-Code
- [x] Gerar QR-Code para acesso mobile
- [x] Desenvolver a interface mobile para busca de produtos e leitura de código de barras
- [ ] Implementar a funcionalidade de contagem de estoque no mobile


### Integração e Sincronização
- [x] Desenvolver a lógica para o backend receber e salvar as contagens no BD
- [x] Atualizar a interface do PC com as contagens recebidas do mobile
- [x] Permitir visualização e alteração das contagens no PC

### Relatórios e Finalização
- [x] Implementar a funcionalidade para gerar um relatório em PDF das contagens finalizadas
- [ ] Testar todas as funcionalidades integradas
- [ ] Realizar ajustes e correções de bugs

### Documentação e Deployment
- [ ] Escrever a documentação do projeto
- [ ] Preparar o instalador para o aplicativo nativo do Windows
- [ ] Configurar o deployment do backend e mobile app

## Considerações Finais
- [ ] Testar o fluxo completo de contagem de estoque
- [ ] Garantir que a usabilidade e a interface estejam amigáveis e funcionais
- [ ] Validar a precisão dos relatórios gerados

Seguindo este to-do list, você conseguirá gerenciar o desenvolvimento do seu projeto de contagem de estoque de forma organizada e eficiente. Boa sorte!