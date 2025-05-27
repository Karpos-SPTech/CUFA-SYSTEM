import React from 'react';
import { Box } from '@mui/material';
import Header from './components/Header';
import InfoCardEmpresa from './components/InfoCardEmpresa';
import SobreEmpresa from './components/SobreEmpresa';
import MembroCard from './components/MembroCard';
import './PerfilEmpresa.css';

const PerfilEmpresa = () => {
  return (
    <Box className="perfil-empresa-container">
      <Header hideNotifications={true} />
      <div className="perfil-empresa-content">
        <Box sx={{ display: 'flex', gap: 3, maxWidth: '1400px', mx: 'auto', p: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
            <InfoCardEmpresa />
            <SobreEmpresa />
          </Box>
          <Box sx={{ width: '280px' }}>
            <MembroCard />
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default PerfilEmpresa;