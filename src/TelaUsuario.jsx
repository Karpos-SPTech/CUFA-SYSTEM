import React, { useState, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import Header from './components/Header';
import usuarioService from './services/usuarioService';
import './telaUsuario.css';

const TelaUsuario = () => {
  const [usuarioData, setUsuarioData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await usuarioService.getUsuarioLogado();
        setUsuarioData(data);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleProfileUpdate = (updatedData) => {
    setUsuarioData((prev) => ({ ...prev, ...updatedData }));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="tela-usuario-container">
      <Header
        hideNotifications={true}
        usuarioData={usuarioData}
        onProfileUpdate={handleProfileUpdate}
      />
      <div className="tela-usuario-content">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 8,
            p: 2,
            maxWidth: '1400px',
            mx: 'auto',
          }}
        >
          {/* Aqui você pode adicionar os componentes específicos do usuário,
              similar à estrutura da TelaEmpresa */}
        </Box>
      </div>
    </Box>
  );
};

export default TelaUsuario;