import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';
import editIcon from '/src/assets/pencil-icon.svg';
import empresaService from '../services/empresaService';

const InfoCardEmpresa = () => {
  const [empresa, setEmpresa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmpresaData = async () => {
      try {
        const empresaData = await empresaService.getEmpresaLogada();
        if (empresaData) {
          setEmpresa(empresaData);
        }
      } catch (err) {
        console.error('Erro ao buscar dados da empresa:', err);
        setError('Não foi possível carregar os dados');
      } finally {
        setLoading(false);
      }
    };

    fetchEmpresaData();
  }, []);

  const getDisplayValue = (value, type) => {
    if (loading) return <CircularProgress size={16} />;
    if (error) return `Não foi possível carregar ${type}`;
    return value || `Não foi possível carregar ${type}`;
  };

  return (
    <Paper
      sx={{
        backgroundColor: '#fff',
        borderRadius: '15px',
        width: '100%',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <Box
        sx={{
          backgroundColor: '#006916',
          height: '90px',
          width: '100%',
          position: 'relative'
        }}
      >
        <Box
          component="img"
          src={editIcon}
          alt="Editar cabeçalho"
          sx={{
            position: 'absolute',
            top: '50%',
            right: 24,
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            width: 20,
            height: 20,
            filter: 'brightness(0) invert(1)',
            '&:hover': {
              opacity: 0.8
            }
          }}
        />
      </Box>

      <Box sx={{ p: 3, pt: 6, position: 'relative' }}>
        <Box
          component="img"
          src={editIcon}
          alt="Editar informações"
          sx={{
            position: 'absolute',
            top: 24,
            right: 24,
            cursor: 'pointer',
            width: 20,
            height: 20,
            opacity: 0.6,
            '&:hover': {
              opacity: 1
            }
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            top: -50,
            left: 24,
            width: 100,
            height: 100,
            borderRadius: '50%',
            border: '4px solid #fff',
            overflow: 'hidden',
            backgroundColor: '#fff',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Box
            component="img"
            src="/src/assets/microsoft-logo.png"
            alt="Logo da empresa"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              p: 1
            }}
          />
        </Box>
        
        <Box sx={{ ml: 15 }}>
          <Typography
            variant="h6"
            sx={{
              color: '#1e1e1e',
              fontSize: '20px',
              fontWeight: '600',
              mb: 1
            }}
          >
            {getDisplayValue(empresa?.nome, 'o nome da empresa')}
          </Typography>
          <Typography
            sx={{
              color: '#666',
              fontSize: '14px',
              mb: 0.5
            }}
          >
            {getDisplayValue(empresa?.email, 'o email da empresa')}
          </Typography>
          <Typography
            sx={{
              color: '#666',
              fontSize: '14px'
            }}
          >
            {getDisplayValue(empresa?.cnpj, 'o CNPJ da empresa')}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default InfoCardEmpresa;
