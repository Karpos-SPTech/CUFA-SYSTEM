import React from 'react';
import { Box } from '@mui/material';
import Header from '../components/Header';
import InfoCardEmpresa from '../components/PerfilEmpresa-Components/InfoCardEmpresa';
import SobreEmpresa from '../components/PerfilEmpresa-Components/SobreEmpresa';
import MembroCard from '../components/PerfilEmpresa-Components/MembroCard';
import './PerfilEmpresa.css';

const PerfilEmpresa = () => {
  return (
    <Box className="perfil-empresa-container">
      <Header hideNotifications={true} />
      <div className="perfil-empresa-content">
        <div className="perfil-empresa-layout">
          <div className="perfil-empresa-main-column">
            <InfoCardEmpresa />
          </div>
          <div className="perfil-empresa-side-column">
            <div className="membro-card-container">
              <MembroCard />
            </div>
            <div className="sobre-empresa-container">
              <SobreEmpresa />
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default PerfilEmpresa;