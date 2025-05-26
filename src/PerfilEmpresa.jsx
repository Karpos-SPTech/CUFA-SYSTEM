import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import Header from './components/Header';
import editIcon from './assets/edit-icon.png';
import InfoCardEmpresa from './components/InfoCardEmpresa';
import SobreEmpresa from './components/SobreEmpresa';
import './PerfilEmpresa.css';

const PerfilEmpresa = () => {
  return (
    <Box className="perfil-empresa-container">
      <Header hideNotifications={true} />
      <div className="perfil-empresa-content">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>          <InfoCardEmpresa />
          <SobreEmpresa />
        </Box>
      </div>
    </Box>
  );
};

export default PerfilEmpresa;