(function() {
  const VLIBRAS_SCRIPT_ID = 'vlibras-plugin-script';

  const script = document.createElement('script');
  script.id = VLIBRAS_SCRIPT_ID;
  script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
  script.async = true;

  script.onload = function() {
    if (window.VLibras && typeof window.VLibras.Widget === 'function') {
      try {
        new window.VLibras.Widget('https://vlibras.gov.br/app');

      } catch (error) {
        console.error('Erro ao inicializar VLibras Widget:', error);
      }
    } else {
      console.error('window.VLibras.Widget não está disponível após o carregamento do script.');
    }
  };

  script.onerror = function(e) {
    console.error('Erro ao carregar o script do VLibras:', e);
  };

  document.head.appendChild(script);

})();