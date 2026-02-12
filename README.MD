Sistema de Documentos (Resende & Mori)

1 - Descrição do Projeto

Esta aplicação web é uma plataforma para gerenciamento e uploads de documentos. O sistema permite que usuários (não necessitando de registro ou login) realizem o upload de arquivos (PDF e Imagens), visualizem o conteúdo abrindo em uma nova aba e interajam através de um sistema de comentários. O foco é organizar o fluxo de análise de documentos com uma interface limpa e funcional.

2 - Tecnologias Utilizadas

Node.js & Express: Responsáveis pelo servidor e pelas rotas da API.

MongoDB & Mongoose: Banco de dados NoSQL e biblioteca de modelagem para armazenamento de metadados e comentários.

Multer: Middleware para controle e armazenamento de uploads de arquivos.

JavaScript: Manipulação do Front-end.

HTML & CSS: Estrutura e estilização moderna com layout responsivo.

3 - Instruções para Execução Local

Instalações essenciais: 

Abra o terminal na pasta raiz do projeto e execute:

npm install

Configuração do Banco de Dados: Certifique-se de que o MongoDB está instalado e o serviço está ativo na porta padrão 27017. Irá gerar automaticamente o banco resende_mori ao ser iniciada.

Pasta de Armazenamento: Verifique se existe a pasta public/uploads. Caso não exista, crie manualmente para que o sistema possa salvar os arquivos enviados.

Iniciando o Servidor: No terminal, execute o comando:

node server.js

Acesso: Abra o seu navegador e acesse o endereço: http://localhost:3000

4 - Limitações:

Formatos de arquivos suportados: O sistema aceita apenas arquivos .pdf, .jpg, .jpeg e .png.

Armazenamento de arquivos: Os arquivos físicos são salvos na pasta /public/uploads. O MongoDB armazena apenas as referências (caminhos) e os comentários.

Visualização (Iframe): A pré-visualização de arquivos PDF depende do leitor nativo de PDF do navegador utilizado pelo usuário.

Persistência: Caso o servidor seja movido para outro ambiente, a pasta uploads deve ser movida junto para manter a disponibilidade dos arquivos já cadastrados.