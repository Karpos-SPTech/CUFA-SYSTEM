import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import editIcon from '/src/assets/edit-icon.png';

const SobreEmpresa = () => {
  return (
    <Paper
      sx={{
        backgroundColor: '#fff',
        borderRadius: '10px',
        width: '100%',
        border: '1px solid #ddd',
        p: 2
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography
          variant="subtitle1"
          sx={{
            color: '#333',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          Sobre
        </Typography>
        <Box
          component="img"
          src={editIcon}
          alt="Editar"
          sx={{
            cursor: 'pointer',
            width: 20,
            height: 20
          }}
        />
      </Box>
      <Typography
        variant="body2"
        sx={{
          color: '#666',
          fontSize: '14px'
        }}
      >
        Biografia da empresa
      </Typography>
    </Paper>
  );
};

export default SobreEmpresa;
