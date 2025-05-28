import React from 'react';
import { Box } from '@mui/material';
import Header from './components/Header';
import InfoCardEmpresa from './components/InfoCardEmpresa';
import SobreEmpresa from './components/SobreEmpresa';
import MembroCard from './components/MembroCard';
import VagaCard from './components/VagaCard';
import './PerfilEmpresa.css';

const PerfilEmpresa = () => {
  return (
    <Box className="perfil-empresa-container">
      <Header hideNotifications={true} />
      <div className="perfil-empresa-content">
        <div className="perfil-empresa-layout">
          <div className="perfil-empresa-main-column">
            <InfoCardEmpresa />
            <SobreEmpresa />
          </div>
          <div className="perfil-empresa-side-column">
            <MembroCard />
            <VagaCard />
          </div>
        </div>
      </div>
    </Box>
  );
};

export default PerfilEmpresa;