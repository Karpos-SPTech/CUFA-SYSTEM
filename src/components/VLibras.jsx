import React, { useEffect } from 'react';
import './VLibras.css';

const VLibras = () => {
  useEffect(() => {
    // Verifica se o VLibras já está presente e remove para evitar duplicação
    const limparVLibrasExistente = () => {
      const elementosExistentes = document.querySelectorAll('.vw-plugin, .vw-plugin-wrapper');
      elementosExistentes.forEach(el => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
    };
    
    // Limpar possíveis instâncias anteriores
    limparVLibrasExistente();
    
    // Função para garantir que o VLibras esteja sempre visível e fixo
    const garantirPosicionamentoFixo = () => {
      const accessButton = document.querySelector('div[vw-access-button]');
      const vwDiv = document.querySelector('div[vw]');
      const pluginWrapper = document.querySelector('div[vw-plugin-wrapper]');
      
      if (accessButton) {
        accessButton.style.display = 'block';
        accessButton.style.position = 'fixed';
        accessButton.style.bottom = '20px';
        accessButton.style.right = '20px';
        accessButton.style.zIndex = '10000';
      }
      
      if (vwDiv) {
        vwDiv.style.position = 'fixed';
        vwDiv.style.bottom = '0';
        vwDiv.style.right = '0';
        vwDiv.style.zIndex = '9999';
      }
      
      if (pluginWrapper) {
        pluginWrapper.style.position = 'fixed';
        pluginWrapper.style.bottom = '80px';
        pluginWrapper.style.right = '10px';
        pluginWrapper.style.zIndex = '9999';
      }
    };
    
    // Carrega o script do VLibras quando o componente é montado
    const script = document.createElement('script');
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;
    script.onload = () => {
      if (window.VLibras) {
        console.log('Carregando VLibras...');
        try {
          // Chama o método correto para inicializar o widget
          new window.VLibras.Widget();
          console.log('VLibras inicializado com sucesso!');
          
          // Aplicar posicionamento fixo após o carregamento
          setTimeout(garantirPosicionamentoFixo, 1500);
          
          // Observer para detectar mudanças no DOM que poderiam afetar o posicionamento
          const observer = new MutationObserver(garantirPosicionamentoFixo);
          observer.observe(document.body, { 
            childList: true, 
            subtree: true,
            attributes: true
          });
          
          // Garantir posicionamento fixo em caso de redimensionamento da janela
          window.addEventListener('resize', garantirPosicionamentoFixo);
          
          // Aplicar posicionamento fixo a cada 3 segundos para garantir
          const intervalId = setInterval(garantirPosicionamentoFixo, 3000);
          
          // Limpar recursos quando o componente for desmontado
          return () => {
            clearInterval(intervalId);
            observer.disconnect();
            window.removeEventListener('resize', garantirPosicionamentoFixo);
            if (document.head.contains(script)) {
              document.head.removeChild(script);
            }
          };
          
        } catch (error) {
          console.error('Erro ao inicializar VLibras:', error);
        }
      } else {
        console.error('API VLibras não disponível');
      }
    };
    document.head.appendChild(script);

    // Limpeza ao desmontar o componente se o script não foi carregado
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return null;
};

export default VLibras;
