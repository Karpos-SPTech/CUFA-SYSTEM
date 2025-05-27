// Script para inicializar o VLibras
(function() {
  // Verifica se o VLibras já está carregado
  if (window.VLibras) {
    return;
  }
  
  // Função para corrigir o posicionamento
  function corrigirPosicionamento() {
    // Botão de acesso
    var botao = document.querySelector('div[vw-access-button]');
    if (botao) {
      botao.style.display = 'block';
      botao.style.position = 'fixed';
      botao.style.bottom = '20px';
      botao.style.right = '20px';
      botao.style.width = '55px';
      botao.style.height = '55px';
      botao.style.backgroundColor = '#2196F3';
      botao.style.borderRadius = '4px';
      botao.style.zIndex = '10000';
      botao.style.border = '2px solid #1976D2';
    }
    
    // Container principal
    var container = document.querySelector('div[vw]');
    if (container) {
      container.style.position = 'fixed';
      container.style.bottom = '0';
      container.style.right = '0';
      container.style.zIndex = '9999';
    }
  }
  
  // Carrega o script do VLibras
  var script = document.createElement('script');
  script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
  script.async = true;
  
  script.onload = function() {
    if (window.VLibras) {
      try {
        new window.VLibras.Widget();
        console.log('VLibras inicializado com sucesso pelo script direto!');
        
        // Correção imediata e após um tempo para garantir
        corrigirPosicionamento();
        setTimeout(corrigirPosicionamento, 1500);
      } catch (error) {
        console.error('Erro ao inicializar VLibras pelo script direto:', error);
      }
    }
  };
  
  document.head.appendChild(script);
})();
