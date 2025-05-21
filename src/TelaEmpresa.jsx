import React from 'react';
import Header from './components/Header';
import { Box } from '@mui/material';
import AnunciarVaga from './components/AnunciarVaga';
import VagaPublicada from './components/VagaPublicada';
import '../src/telaEmpresa.css';

const TelaEmpresa = () => {
  return (
    <Box className="tela-empresa-container">
      <Header />
      <div className="tela-empresa-content">
        <Box sx={{ maxWidth: 600, mx: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <AnunciarVaga />
          <VagaPublicada />
        </Box>
      </div>
    </Box>
  );
};

export default TelaEmpresa;