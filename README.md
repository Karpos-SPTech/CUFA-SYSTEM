🌐 CUFA-SYSTEM: Guia de Implantação (Deploy)
Este documento detalha o processo de como configurar, construir e implantar a aplicação Front-end CUFA-SYSTEM, desenvolvida com React e Vite.

⚙️ Pré-requisitosAntes de iniciar o processo de deploy, garanta que os seguintes itens estejam instalados no seu ambiente de build ou no seu servidor:
Ferramenta    Versão Recomendada     Propósito 
Node.js       18 ou superior         Ambiente de execução para JavaScript
.npm ou Yarn  Mais recente           Gerenciador de pacotes para dependências
.Git          Qualquer               Controle de versão e clonagem do repositório.

🚀 Processo de Deploy
Siga os passos abaixo para preparar e publicar a aplicação.

1. Clonar e Instalar Dependências
Primeiro, clone o repositório e instale todas as dependências necessárias do projeto:
# Clone o repositório
git clone https://github.com/Karpos-SPTech/CUFA-SYSTEM.git

# Acesse a pasta do projeto
cd CUFA-SYSTEM

# Instale as dependências
npm install

Configuração de Variáveis de Ambiente
O Front-end precisa saber onde encontrar a API do Back-end. Essa configuração deve ser feita em um arquivo de variáveis de ambiente de produção.

Crie um arquivo chamado .env.production na raiz do projeto.

Defina a variável VITE_API_URL apontando para a URL pública do seu Back-end.

# URL base para todas as chamadas à API do Back-end.
# O Vite exige que as variáveis de ambiente comecem com VITE_
VITE_API_URL=https://api.seudominio.com.br/

Nota: Certifique-se de usar https se o seu Back-end estiver configurado com SSL. A porta 8080 (ou outra porta de desenvolvimento) deve ser evitada aqui, a menos que esteja por trás de um proxy reverso.

Compreendido! Você quer um README.md pronto e polido, específico para o projeto Front-end (CUFA-SYSTEM), que você possa copiar e colar diretamente no GitHub, com foco total nas instruções de deploy, mas com a estrutura profissional de um README.Aqui está o conteúdo completo para o seu README.md do projeto CUFA-SYSTEM (React/Vite).🌐 CUFA-SYSTEM: Guia de Implantação (Deploy)Este documento detalha o processo de como configurar, construir e implantar a aplicação Front-end CUFA-SYSTEM, desenvolvida com React e Vite.⚙️ Pré-requisitosAntes de iniciar o processo de deploy, garanta que os seguintes itens estejam instalados no seu ambiente de build ou no seu servidor:FerramentaVersão RecomendadaPropósitoNode.js18 ou superiorAmbiente de execução para JavaScript.npm ou YarnMais recenteGerenciador de pacotes para dependências.GitQualquerControle de versão e clonagem do repositório.🚀 Processo de DeploySiga os passos abaixo para preparar e publicar a aplicação.1. Clonar e Instalar DependênciasPrimeiro, clone o repositório e instale todas as dependências necessárias do projeto:Bash# Clone o repositório
git clone https://github.com/Karpos-SPTech/CUFA-SYSTEM.git

# Acesse a pasta do projeto
cd CUFA-SYSTEM

# Instale as dependências
npm install
2. Configuração de Variáveis de AmbienteO Front-end precisa saber onde encontrar a API do Back-end. Essa configuração deve ser feita em um arquivo de variáveis de ambiente de produção.Crie um arquivo chamado .env.production na raiz do projeto.Defina a variável VITE_API_URL apontando para a URL pública do seu Back-end.Exemplo de .env.production:Snippet de código# URL base para todas as chamadas à API do Back-end.
# O Vite exige que as variáveis de ambiente comecem com VITE_
VITE_API_URL=https://api.seudominio.com.br/
Nota: Certifique-se de usar https se o seu Back-end estiver configurado com SSL. A porta 8080 (ou outra porta de desenvolvimento) deve ser evitada aqui, a menos que esteja por trás de um proxy reverso.3. Build da Aplicação (Otimização)O Vite irá compilar, otimizar e agrupar todos os arquivos (React, JavaScript, CSS, Assets) em uma estrutura estática pronta para ser servida.

Execute o comando de build definido no package.json:
npm run build

Ao final deste processo, será gerada uma pasta chamada dist/ na raiz do projeto. O conteúdo desta pasta é o que será implantado.

Compreendido! Você quer um README.md pronto e polido, específico para o projeto Front-end (CUFA-SYSTEM), que você possa copiar e colar diretamente no GitHub, com foco total nas instruções de deploy, mas com a estrutura profissional de um README.Aqui está o conteúdo completo para o seu README.md do projeto CUFA-SYSTEM (React/Vite).🌐 CUFA-SYSTEM: Guia de Implantação (Deploy)Este documento detalha o processo de como configurar, construir e implantar a aplicação Front-end CUFA-SYSTEM, desenvolvida com React e Vite.⚙️ Pré-requisitosAntes de iniciar o processo de deploy, garanta que os seguintes itens estejam instalados no seu ambiente de build ou no seu servidor:FerramentaVersão RecomendadaPropósitoNode.js18 ou superiorAmbiente de execução para JavaScript.npm ou YarnMais recenteGerenciador de pacotes para dependências.GitQualquerControle de versão e clonagem do repositório.🚀 Processo de DeploySiga os passos abaixo para preparar e publicar a aplicação.1. Clonar e Instalar DependênciasPrimeiro, clone o repositório e instale todas as dependências necessárias do projeto:Bash# Clone o repositório
git clone https://github.com/Karpos-SPTech/CUFA-SYSTEM.git

# Acesse a pasta do projeto
cd CUFA-SYSTEM

# Instale as dependências
npm install
2. Configuração de Variáveis de AmbienteO Front-end precisa saber onde encontrar a API do Back-end. Essa configuração deve ser feita em um arquivo de variáveis de ambiente de produção.Crie um arquivo chamado .env.production na raiz do projeto.Defina a variável VITE_API_URL apontando para a URL pública do seu Back-end.Exemplo de .env.production:Snippet de código# URL base para todas as chamadas à API do Back-end.

# O Vite exige que as variáveis de ambiente comecem com VITE_

VITE_API_URL=https://api.seudominio.com.br/

Nota: Certifique-se de usar https se o seu Back-end estiver configurado com SSL. A porta 8080 (ou outra porta de desenvolvimento) deve ser evitada aqui, a menos que esteja por trás de um proxy reverso.3. Build da Aplicação (Otimização)O Vite irá compilar, otimizar e agrupar todos os arquivos (React, JavaScript, CSS, Assets) em uma estrutura estática pronta para ser servida.Execute o comando de build definido no package.json:Bashnpm run build

Ao final deste processo, será gerada uma pasta chamada dist/ na raiz do projeto. O conteúdo desta pasta é o que será implantado.4. Implantação e HospedagemA pasta dist/ contém os arquivos estáticos (.html, .js, .css) e deve ser servida por um servidor web.Opção A: Hosting Dedicado (Recomendado para SPAs)A maneira mais eficiente de hospedar o Front-end é através de serviços otimizados para Single Page Applications (SPAs).


Opção B: Servidor Web (Nginx/Apache)
Se você estiver usando seu próprio servidor, mova o conteúdo da pasta dist/ para o diretório raiz do seu servidor web (Ex: /var/www/html/).
Configuração Crucial para Nginx (SPAs):

Como o React utiliza roteamento interno, o servidor precisa ser configurado para que todas as rotas (ex: /dashboard, /perfil) façam o fallback para o arquivo index.html. Adicione a seguinte regra ao seu bloco location no Nginx:

# Snippet essencial para Nginx
location / {
    try_files $uri $uri/ /index.html;
}

Após configurar, recarregue seu serviço Nginx/Apache.

💡 Próximos Passos
Acesse o domínio onde a aplicação foi implantada. Verifique se as chamadas de API (configuradas no .env.production) estão funcionando corretamente com o seu CUFA-BACKEND-KOTLIN.

