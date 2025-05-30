import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import mcdonaldsLogo from '../assets/microsoft-logo.png';
import editIcon from '../assets/edit-icon.png';
import publicacaoService from '../services/publicacaoService';

const VagaPublicada = () => {
  const navigate = useNavigate();
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    carregarVagas();
  }, []);

  const carregarVagas = async () => {
    try {
      const response = await publicacaoService.listarPublicacoes();
      setVagas(response);
    } catch (err) {
      console.error('Erro ao carregar vagas:', err);
      setError('Erro ao carregar as vagas publicadas');
    } finally {
      setLoading(false);
    }
  };

  const handleVerCandidatos = (vagaId) => {
    navigate(`/telaCandidatos?vagaId=${vagaId}`);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (vagas.length === 0) {
    return (
      <Box p={2}>
        <Typography align="center" color="textSecondary">
          Nenhuma vaga publicada ainda
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {vagas.map((vaga) => (
        <Paper
          key={vaga.id}
          sx={{
            backgroundColor: '#fff',
            borderRadius: '10px',
            p: 2,
            width: '100%',
            border: '1px solid #ddd',
            position: 'relative'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Box
              component="img"
              src={mcdonaldsLogo}
              alt="Logo da Empresa"
              sx={{
                width: 50,
                height: 50,
                borderRadius: '50%'
              }}
            />
            <Box>
              <Typography
                variant="h6"
                sx={{
                  color: '#006916',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                {vaga.titulo}
              </Typography>
              <Typography variant="body2" sx={{ color: '#666', fontSize: '12px' }}>
                {vaga.descricao}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
            <img
              src={editIcon}
              alt="Editar"
              style={{
                cursor: 'pointer',
                width: 24,
                height: 24
              }}
              onClick={() => {/* Implementar edição */}}
            />
          </Box>

          <Box
            sx={{
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              p: 2,
              mt: 2
            }}
          >
            <Typography variant="subtitle1" sx={{ color: '#006916', mb: 1 }}>
              Requisitos:
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {vaga.requisitos}
            </Typography>

            <Typography variant="subtitle1" sx={{ color: '#006916', mb: 1 }}>
              Benefícios:
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {vaga.beneficios}
            </Typography>

            <Typography variant="subtitle1" sx={{ color: '#006916', mb: 1 }}>
              Salário:
            </Typography>
            <Typography variant="body2">
              {vaga.salario}
            </Typography>
          </Box>

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={() => handleVerCandidatos(vaga.id)}
              sx={{
                backgroundColor: '#006916',
                '&:hover': {
                  backgroundColor: '#005713'
                }
              }}
            >
              Ver Candidatos
            </Button>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default VagaPublicada;