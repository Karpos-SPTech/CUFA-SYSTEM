import React from 'react';
import Header from './components/Header';
import { Box } from '@mui/material';
import AnunciarVaga from './components/AnunciarVaga';
import VagaPublicada from './components/VagaPublicada';
import NotificationsPanel from './components/NotificationsPanel';
import '../src/telaEmpresa.css';

const TelaEmpresa = () => {
  return (
    <Box className="tela-empresa-container">
      <Header hideNotifications={true} /><div className="tela-empresa-content">
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 8, p: 2, maxWidth: '1400px', mx: 'auto' }}>
          <Box sx={{ width: 250 }} />


          <Box sx={{ width: 600, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <AnunciarVaga />
            <VagaPublicada />
          </Box>

          <Box sx={{ width: 300 }}>
            <NotificationsPanel />
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default TelaEmpresa;