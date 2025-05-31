import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import CandidatoCard from './components/CandidatoCard';
import './TelaCandidatos.css';

const TelaCandidatos = () => {
  const [candidatos, setCandidatos] = useState([]);
  const [vagaInfo, setVagaInfo] = useState(null);
  const location = useLocation();

  // Carregar dados
  useEffect(() => {
    // Extrair vagaId da URL
    const searchParams = new URLSearchParams(location.search);
    const vagaId = searchParams.get('vagaId') || '1';
    
    // Carregar dados dos candidatos
    const fetchCandidatos = () => {
      try {
        // Aqui você faria uma chamada à API real
        // const response = await candidatosService.getCandidatosByVagaId(vagaId);
        console.log(`Buscando candidatos para a vaga ID: ${vagaId}`);
        
        // Dados simulados para demonstração
        const candidatosMock = [
          { 
            id: 1, 
            nome: 'João Silva', 
            idade: 28, 
            email: 'joao.silva@email.com',
            telefone: '(11) 99999-0000',
            resumo: 'Profissional com 5 anos de experiência em atendimento ao cliente.',
            cidade: 'São Paulo',
            estado: 'SP',
            experiencia: [
              'Atendente de Fast Food - Fast Foods Ltda - 2020-2022',
              'Auxiliar Administrativo - Empresa ABC - 2018-2020'
            ],
            formacao: 'Ensino Médio Completo',
            habilidades: ['Atendimento ao cliente', 'Comunicação', 'Trabalho em equipe'],
            foto: 'https://randomuser.me/api/portraits/men/1.jpg',
            curriculo: 'https://drive.google.com/file/d/1example_link/view'
          },
          { 
            id: 2, 
            nome: 'Maria Souza', 
            idade: 24, 
            email: 'maria.souza@email.com',
            telefone: '(11) 88888-0000',
            resumo: 'Estudante de administração buscando primeira oportunidade.',
            cidade: 'Rio de Janeiro',
            estado: 'RJ',
            experiencia: [
              'Estágio Administrativo - Escritório Contábil - 2022-2023'
            ],
            formacao: 'Graduação em Administração (cursando)',
            habilidades: ['Pacote Office', 'Organização', 'Proatividade'],
            foto: 'https://randomuser.me/api/portraits/women/1.jpg',
            curriculo: 'https://drive.google.com/file/d/2example_link/view'
          },
          { 
            id: 3, 
            nome: 'Carlos Oliveira', 
            idade: 30, 
            email: 'carlos.oliveira@email.com',
            telefone: '(11) 77777-0000',
            resumo: 'Profissional experiente em logística e operações.',
            cidade: 'São Paulo',
            estado: 'SP',
            experiencia: [
              'Supervisor de Operações - Empresa XYZ - 2021-2023',
              'Assistente de Logística - Transportadora Rápida - 2019-2021',
              'Auxiliar de Estoque - Supermercados Big - 2017-2019',
              'Repositor - Supermercado Extra - 2016-2017',
              'Jovem Aprendiz - Correios - 2015-2016',
              'Estágio em Administração - Empresa ABC - 2014-2015'
            ],
            formacao: 'Tecnólogo em Logística',
            habilidades: ['Gestão de estoque', 'Liderança', 'Excel avançado'],
            foto: 'https://randomuser.me/api/portraits/men/2.jpg',
            curriculo: null // Exemplo de candidato sem currículo
          },
          { 
            id: 4, 
            nome: 'Juliana Santos', 
            idade: 26, 
            email: 'juliana.santos@email.com',
            telefone: '(11) 96666-0000',
            resumo: 'Atendente com experiência em restaurantes e cafeterias.',
            cidade: 'Guarulhos',
            estado: 'SP',
            experiencia: [
              'Atendente de Restaurante - Restaurante Sabor & Arte - 2022-2025',
              'Barista - Café Express - 2021-2022',
              'Garçonete - Pizzaria Bella Napoli - 2019-2021'
            ],
            formacao: 'Curso Técnico em Gastronomia',
            habilidades: ['Atendimento ao cliente', 'Manipulação de alimentos', 'Caixa'],
            foto: 'https://randomuser.me/api/portraits/women/25.jpg',
            curriculo: 'https://drive.google.com/file/d/3example_link/view'
          },
          { 
            id: 5, 
            nome: 'Bruno Ferreira', 
            idade: 22, 
            email: 'bruno.ferreira@email.com',
            telefone: '(11) 951473648',
            resumo: 'Estudante de Administração buscando oportunidade de primeiro emprego.',
            cidade: 'São Paulo',
            estado: 'SP',
            experiencia: [
              'Jovem Aprendiz - Banco Nacional - 2023-2024'
            ],
            formacao: 'Administração (Cursando 3º semestre)',
            habilidades: ['Pacote Office', 'Inglês intermediário', 'Atendimento'],
            foto: 'https://randomuser.me/api/portraits/men/15.jpg',
            curriculo: 'https://drive.google.com/file/d/4example_link/view'
          },
          { 
            id: 6, 
            nome: 'Amanda Costa', 
            idade: 32, 
            email: 'amanda.costa@email.com',
            telefone: '(11) 94444-0000',
            resumo: 'Profissional com mais de 10 anos no ramo alimentício.',
            cidade: 'São Bernardo do Campo',
            estado: 'SP',
            experiencia: [
              'Gerente de Loja - Restaurante Fast Grill - 2022-2025',
              'Supervisora de Atendimento - Burguer King - 2018-2022',
              'Atendente de Fast Food - MC Donald\'s - 2015-2018',
              'Operadora de Caixa - Habib\'s - 2013-2015'
            ],
            formacao: 'Gestão de Negócios',
            habilidades: ['Liderança de equipe', 'Controle de estoque', 'Atendimento ao cliente', 'Gestão financeira'],
            foto: 'https://randomuser.me/api/portraits/women/33.jpg',
            curriculo: 'https://drive.google.com/file/d/5example_link/view'
          }
        ];
        
        setCandidatos(candidatosMock);
        
        // Informações da vaga
        setVagaInfo({
          titulo: 'Atendente de Fast Food',
          empresa: 'MC Donald\'s',
          setor: 'Fast Food',
          regime: 'CLT',
          dataPublicacao: '28/05/2025',
          totalCandidatos: candidatosMock.length
        });
      } catch (error) {
        console.error('Erro ao carregar candidatos:', error);
      }
    };

    fetchCandidatos();
  }, [location]);

  return (
    <Box className="tela-candidatos-container">
      <Header hideNotifications={true} />
      <div className="tela-candidatos-content">
        {vagaInfo && (
          <Box className="vaga-info-header">
            <Typography 
              variant="h5" 
              className="vaga-titulo"
            >
              {vagaInfo.titulo}
            </Typography>
            <Box className="vaga-detalhes">
              <Typography variant="body1">
                <span className="detalhe-label">Empresa:</span> {vagaInfo.empresa}
              </Typography>
              <Typography variant="body1">
                <span className="detalhe-label">Setor:</span> {vagaInfo.setor}
              </Typography>
              <Typography variant="body1">
                <span className="detalhe-label">Regime:</span> {vagaInfo.regime}
              </Typography>
              <Typography variant="body1">
                <span className="detalhe-label">Publicada em:</span> {vagaInfo.dataPublicacao}
              </Typography>
            </Box>
            <Typography variant="h6" className="total-candidatos">
              Total de candidatos: {vagaInfo.totalCandidatos}
            </Typography>
          </Box>
        )}
        
        <Box className="candidatos-grid">
          {candidatos.map(candidato => (
            <CandidatoCard key={candidato.id} candidato={candidato} />
          ))}
        </Box>
      </div>
    </Box>
  );
};

export default TelaCandidatos;
