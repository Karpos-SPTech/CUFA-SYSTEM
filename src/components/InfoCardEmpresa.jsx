import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';
import editIcon from '/src/assets/edit-icon.png';
import empresaService from '../services/empresaService';

const InfoCardEmpresa = () => {
  const [empresa, setEmpresa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {    const fetchEmpresaData = async () => {
      try {
        const empresaData = await empresaService.getEmpresaLogada();
        if (empresaData) {
          setEmpresa(empresaData);
        }
      } catch (err) {
        console.error('Erro ao buscar dados da empresa:', err);
        setError('Erro ao carregar dados da empresa');
      } finally {
        setLoading(false);
      }
    };

    fetchEmpresaData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Paper
      sx={{
        backgroundColor: '#fff',
        borderRadius: '10px',
        width: '100%',
        border: '1px solid #ddd',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Faixa verde superior */}
      <Box
        sx={{
          backgroundColor: '#006916',
          height: '80px',
          width: '100%',
          position: 'relative'
        }}
      >
        {/* Ícone de editar */}
        <Box
          component="img"
          src={editIcon}
          alt="Editar"
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            cursor: 'pointer',
            width: 24,
            height: 24,
            filter: 'brightness(0) invert(1)' // Torna o ícone branco
          }}
        />
      </Box>

      {/* Conteúdo do perfil */}
      <Box sx={{ p: 2, pt: 5, position: 'relative' }}>
        {/* Logo da empresa */}
        <Box
          sx={{
            position: 'absolute',
            top: -40,
            left: 24,
            width: 80,
            height: 80,
            borderRadius: '50%',
            border: '4px solid #fff',
            overflow: 'hidden',
            backgroundColor: '#fff'
          }}
        >
          <Box
            component="img"
            src="/src/assets/microsoft-logo.png"
            alt="Logo da empresa"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </Box>

        {/* Informações da empresa */}
        <Box sx={{ ml: 12 }}>          <Typography
            variant="h6"
            sx={{
              color: '#006916',
              fontSize: '18px',
              fontWeight: 'bold'
            }}
          >
            {empresa?.nome || 'Nome da Empresa'}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#666',
              fontSize: '14px'
            }}
          >
            {empresa?.email || 'Email da empresa'}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#666',
              fontSize: '14px',
              mt: 1
            }}
          >
            {empresa?.cnpj || 'CNPJ da empresa'}
        </Box>
      </Box>
    </Paper>
  );
};

export default InfoCardEmpresa;
