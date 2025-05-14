import React from 'react';
import Header from './components/Header';
import { Box } from '@mui/material';

const TelaEmpresa = () => {
  return (
    <Box sx={{ backgroundColor: '#E5EEE3', minHeight: '100vh',
    }}>
      <Header />
      <div>
        <h1>Tela Empresa</h1>
        <p>Esta é a tela de cadastro ou visualização de empresas.</p>
      </div>
    </Box>
  );
};

export default TelaEmpresa;