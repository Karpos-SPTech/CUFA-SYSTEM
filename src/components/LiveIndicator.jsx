import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { keyframes } from '@mui/system';

const pulse = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 105, 22, 0.7);
  }
  
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 6px rgba(0, 105, 22, 0);
  }
  
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 105, 22, 0);
  }
`;

const LiveIndicator = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, justifyContent: 'center' }}>
      <Box
        sx={{
          width: 8,
          height: 8,
          bgcolor: '#006916',
          borderRadius: '50%',
          mr: 1,
          animation: `${pulse} 2s infinite`
        }}
      />
      <Typography variant="caption" sx={{ color: '#666' }}>
        Dashboard ativo
      </Typography>
    </Box>
  );
};

export default LiveIndicator;
