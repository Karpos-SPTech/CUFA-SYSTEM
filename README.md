🚀 Guia de Deploy (Implantação)Este guia detalha o processo de preparação e implantação do CUFA-SYSTEM, um projeto Front-end desenvolvido com React e Vite.⚙️ Pré-requisitosPara realizar o deploy da aplicação, você precisará ter o seguinte ambiente configurado:Node.js e npm: Versão 18 ou superior.Git: Para clonar o repositório.Servidor Web: Um serviço para hospedar os arquivos estáticos (Ex: Nginx, Apache, ou um serviço de hosting como Vercel/Netlify).🔧 Configuração de Ambiente1. Clonar o RepositórioNo servidor onde você fará o build (construção) da aplicação:Bashgit clone https://github.com/Karpos-SPTech/CUFA-SYSTEM.git
cd CUFA-SYSTEM
2. Instalar DependênciasInstale todas as dependências do projeto usando o npm:Bashnpm install
3. Configurar Variáveis de AmbienteO React/Vite geralmente utiliza variáveis de ambiente para definir configurações específicas de produção, como a URL base da API do backend.As variáveis devem ser definidas em um arquivo .env.production na raiz do projeto ou como variáveis de ambiente no seu sistema de hosting (Vercel, Netlify, etc.).Exemplo de .env.production (Se aplicável):Snippet de código# Variável de ambiente para a API do backend
VITE_API_URL=https://api.seubackend.com/

# Adicione outras variáveis de ambiente necessárias
# Exemplo: VITE_SECRET_KEY=sua_chave_aqui
Importante: O Vite exige que as variáveis de ambiente comecem com VITE_ para serem expostas ao código do Front-end.📦 Build da Aplicação (Gerando o Bundle Estático)O Vite compila todo o código React, JSX, e CSS em um conjunto otimizado de arquivos HTML, JavaScript e CSS, que são chamados de arquivos estáticos (static bundle).Execute o comando de build:Bashnpm run build
Ao finalizar, o diretório de produção será gerado:Diretório de Saída: dist/O conteúdo dentro da pasta dist/ é o que precisa ser copiado para o seu servidor web ou hosting de Front-end.▶️ Hospedagem e Execução da AplicaçãoO processo de execução envolve servir o conteúdo da pasta dist/.Opção A: Hosting Estático (Recomendado para Produção)Utilize serviços especializados que simplificam a hospedagem de aplicações Front-end:ServiçoInstruções BásicasVercelConecte o repositório. Configure o comando de build como npm run build e o diretório de saída como dist.NetlifyConecte o repositório. Configure o comando de build como npm run build e o diretório de publicação como dist.GitHub PagesVocê pode usar o gh-pages ou configurar o GitHub Actions para fazer o build e publicar a pasta dist.Opção B: Servidor Web Tradicional (Nginx/Apache)Se você estiver usando um servidor web tradicional, o conteúdo da pasta dist/ deve ser movido para o diretório raiz de hospedagem do seu servidor (Ex: /var/www/html/).Exemplo de Configuração Nginx (Snippet):A configuração deve garantir que todas as solicitações não-estáticas (como navegações diretas a /dashboard ou /perfil) sejam roteadas para o index.html da pasta dist/ (conhecido como fallback para Single Page Applications - SPA).Nginxserver {
    listen 80;
    server_name seu-dominio.com;
    
    root /caminho/completo/para/CUFA-SYSTEM/dist;
    index index.html;

    location / {
        try_files $uri /index.html;
    }
}
Após configurar e mover os arquivos, recarregue o Nginx para aplicar as mudanças:Bashsudo systemctl reload nginx
A aplicação estará acessível através da URL configurada no seu servidor (http://seu-dominio.com).
