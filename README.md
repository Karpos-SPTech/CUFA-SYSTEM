🌐 CUFA-SYSTEM — Guia de Implantação (Deploy)

Este documento descreve o processo completo para configurar, construir e implantar o Front-end CUFA-SYSTEM, desenvolvido em React + Vite.

⚙️ Pré-requisitos

Antes de iniciar o deploy, certifique-se de que seu ambiente possui os itens abaixo instalados:

Ferramenta	Versão Recomendada	Propósito
Node.js	18 ou superior	Ambiente de execução JavaScript
npm ou Yarn	Mais recente	Gerenciamento de dependências
Git	Qualquer	Clonagem e controle de versão
🚀 Processo de Deploy
1. Clonar o Repositório e Instalar Dependências
# Clone o repositório
git clone https://github.com/Karpos-SPTech/CUFA-SYSTEM.git

# Acesse o diretório do projeto
cd CUFA-SYSTEM

# Instale as dependências
npm install

2. Configuração de Variáveis de Ambiente

A aplicação Front-end precisa saber onde está a API do Back-end. Para isso:

Crie um arquivo .env.production na raiz do projeto.

Defina a variável VITE_API_URL apontando para a URL pública do seu Back-end.

# O Vite exige que variáveis iniciem com "VITE_"
VITE_API_URL=https://api.seudominio.com.br/


Nota:

Utilize HTTPS caso seu servidor tenha SSL.

Não use portas de desenvolvimento (ex: 8080) na URL pública, exceto quando houver proxy reverso configurado.

3. Build da Aplicação (Otimização)

O Vite irá compilar, otimizar e preparar todos os arquivos para produção.

Execute o comando:

npm run build


Ao final, uma pasta dist/ será gerada na raiz do projeto.
Essa pasta contém os arquivos que devem ser implantados no servidor.

4. Implantação e Hospedagem

A pasta dist/ contém arquivos estáticos (HTML, JS, CSS). Você pode hospedá-la de duas formas:

🅰️ Opção A — Hosting para SPAs (Recomendado)

Serviços como:

Vercel

Netlify

Cloudflare Pages

Firebase Hosting

AWS S3 + CloudFront

Estes provedores já são preparados para aplicações SPA (Single Page Applications).

🅱️ Opção B — Servidor Próprio (Nginx / Apache)

Se você está utilizando seu próprio servidor:

Copie o conteúdo da pasta dist/ para o diretório raiz do servidor.
Exemplo no Linux:

/var/www/html/


Configure o fallback de rotas (necessário para React Router).

📌 Configuração Essencial para Nginx

No bloco location:

location / {
    try_files $uri $uri/ /index.html;
}


Após ajustar, recarregue o serviço:

sudo systemctl reload nginx

💡 Próximos Passos

Após a implantação:

Acesse o domínio onde o Front-end foi publicado.

Teste as chamadas de API para validar que a variável VITE_API_URL aponta corretamente para seu CUFA-BACKEND-KOTLIN.

Confirme que todas as rotas internas do React funcionam sem erro 404.
