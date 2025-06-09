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

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const vagaId = searchParams.get('vagaId') || '1';

    const fetchCandidatos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/candidatura/${vagaId}`, {
          method: 'GET',
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar dados da API');
        }

        const data = await response.json();

        // Mapeia os dados da vaga
        setVagaInfo({
          titulo: data.titulo,
          empresa: data.nomeEmpresa,
          regime: data.tipoContrato,
          dataPublicacao: new Date(data.dtPublicacao).toLocaleDateString('pt-BR'),
          dataExpiracao: new Date(data.dtExpiracao).toLocaleDateString('pt-BR'),
          totalCandidatos: data.qtdCandidatos
        });

        // Mapeia os candidatos
        const candidatosMapeados = data.candidatos.map((candidato, index) => ({
          id: index + 1,
          nome: candidato.nome,
          idade: candidato.idade,
          email: candidato.email,
          telefone: candidato.telefone,
          resumo: candidato.biografia,
          experiencia: candidato.experiencias.map(exp => (
            `${exp.cargo} no(a) ${exp.empresa}\nDe: ${exp.dtInicio} - Até: ${exp.dtFim || 'Atual'}`
          )),
          curriculo: candidato.curriculoUrl,
          foto: null
        }));

        setCandidatos(candidatosMapeados);

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
            <Typography variant="h5" className="vaga-titulo" sx={{ mb: 2 }}>
              {vagaInfo.titulo}
            </Typography>
            <Box className="vaga-detalhes">
              <Typography variant="body1">
                <span className="detalhe-label">Empresa:</span> {vagaInfo.empresa}
              </Typography>
              <Typography variant="body1">
                <span className="detalhe-label">Regime:</span> {vagaInfo.regime}
              </Typography>
              <Typography variant="body1">
                <span className="detalhe-label">Publicada em:</span> {vagaInfo.dataPublicacao}
              </Typography>
              <Typography variant="body1">
                <span className="detalhe-label">Expira em:</span> {vagaInfo.dataExpiracao}
              </Typography>
            </Box>
            <Typography variant="h6" className="total-candidatos" sx={{ color: '#006916'}}>
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
