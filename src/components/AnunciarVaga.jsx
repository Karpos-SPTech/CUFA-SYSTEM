import React from 'react';
import { Box, Paper } from '@mui/material';
import mcdonaldsLogo from '../assets/microsoft-logo.png';
import fotoIcon from '../assets/foto-icon.png';
import videoIcon from '../assets/video-icon.png';
import textoIcon from '../assets/text-icon.png';

const ButtonOption = ({ icon, label }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      cursor: 'pointer',
      color: '#006916',
      fontSize: '14px',
      '&:hover': {
        opacity: 0.8
      }
    }}
  >
    <Box      component="img"
      src={icon}
      alt={label}
      sx={{ width: 28, height: 28 }}
    />
    <span>{label}</span>
  </Box>
);

const AnunciarVaga = () => {
  return (    <Paper      sx={{
        backgroundColor: '#fff',
        borderRadius: '10px',
        p: 2,
        width: '100%',
        border: '1px solid #ddd',
        minHeight: '80px'
      }}
    >      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: 2,
          alignItems: 'center',
          mb: 3
        }}
      >
        <Box
          component="img"
          src={mcdonaldsLogo}
          alt="Logo empresa"
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%'
          }}
        />
        <Box
          component="button"          sx={{            background: '#e9f1e7',
            border: 'none',
            borderRadius: '15px',
            padding: '12px 16px',
            color: '#006916',
            fontSize: '14px',
            fontWeight: '400',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            width: '100%',
            textAlign: 'left',
            minHeight: '45px',
            '&:hover': {
              background: '#d8e6d5',
            }
          }}
        >
          Anunciar novas vagas!
        </Box>
      </Box>      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          gap: 2,
          mt: 1
        }}
      >
        <ButtonOption icon={fotoIcon} label="Foto" />
        <ButtonOption icon={videoIcon} label="Vídeo" />
        <ButtonOption icon={textoIcon} label="Texto" />
      </Box>
    </Paper>
  );
};

export default AnunciarVaga;
