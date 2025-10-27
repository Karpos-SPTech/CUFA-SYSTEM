import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import CandidatoCard from './components/CandidatoCard';
import './TelaCandidatos.css';

const TelaCandidatos = () => {
  const [candidatos, setCandidatos] = useState([]);
  const [vagaInfo, setVagaInfo] = useState(null);
  const location = useLocation();

  // PAGINAÇÃO
  const [currentPage, setCurrentPage] = useState(1);
  const candidatosPorPagina = 6;

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const vagaId = searchParams.get('vagaId') || '1';

    const fetchCandidatos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://10.0.132.210/candidatura/${vagaId}`, {
          method: 'GET',
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error('Erro ao buscar dados da API');
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
        setCurrentPage(1); // reseta a página ao mudar de vaga

      } catch (error) {
        console.error('Erro ao carregar candidatos:', error);
      }
    };

    fetchCandidatos();
  }, [location]);

  // cálculo da paginação
  const totalPages = Math.ceil(candidatos.length / candidatosPorPagina);
  const indexUltimoCandidato = currentPage * candidatosPorPagina;
  const indexPrimeiroCandidato = indexUltimoCandidato - candidatosPorPagina;
  const candidatosAtuais = candidatos.slice(indexPrimeiroCandidato, indexUltimoCandidato);

  const handlePageChange = (novaPagina) => {
    setCurrentPage(novaPagina);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
              <Typography variant="body1"><span className="detalhe-label">Empresa:</span> {vagaInfo.empresa}</Typography>
              <Typography variant="body1"><span className="detalhe-label">Regime:</span> {vagaInfo.regime}</Typography>
              <Typography variant="body1"><span className="detalhe-label">Publicada em:</span> {vagaInfo.dataPublicacao}</Typography>
              <Typography variant="body1"><span className="detalhe-label">Expira em:</span> {vagaInfo.dataExpiracao}</Typography>
            </Box>
            <Typography variant="h6" className="total-candidatos" sx={{ color: '#006916'}}>
              Total de candidatos: {vagaInfo.totalCandidatos}
            </Typography>
          </Box>
        )}

        <Box className="candidatos-grid">
          {candidatosAtuais.map(candidato => (
            <CandidatoCard key={candidato.id} candidato={candidato} />
          ))}
        </Box>

        {/* Paginação */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 1 }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              sx={{
                backgroundColor: currentPage === i + 1 ? '#006916' : '#f5f5f5',
                color: currentPage === i + 1 ? '#fff' : '#006916',
                border: '1px solid #006916',
                borderRadius: '5px',
                fontWeight: 'bold',
                minWidth: 35,
                '&:hover': { backgroundColor: '#005713', color: '#fff' }
              }}
            >
              {i + 1}
            </Button>
          ))}
        </Box>
      </div>
    </Box>
  );
};

export default TelaCandidatos;
