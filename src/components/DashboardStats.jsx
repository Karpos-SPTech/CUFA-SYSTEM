import React from 'react';
import { Box, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const DashboardStats = () => {
  // Valores simulados para demonstração
  const stats = [
    { label: 'Usuários', value: '+12%', positive: true },
    { label: 'Empresas', value: '+8%', positive: true },
  ];

  return (
    <Box sx={{ mt: 1, px: 1 }}>
      <Typography 
        variant="caption" 
        sx={{ 
          display: 'block', 
          color: '#555',
          fontWeight: 'medium',
          mb: 1
        }}
      >
        Métricas Semanais
      </Typography>
      
      {stats.map((stat, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 0.7,
            pb: 0.7,
            borderBottom: index < stats.length - 1 ? '1px dashed #e0e0e0' : 'none'
          }}
        >
          <Typography variant="caption" sx={{ color: '#555' }}>
            {stat.label}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {stat.positive ? (
              <TrendingUpIcon sx={{ fontSize: 14, color: '#006916', mr: 0.5 }} />
            ) : (
              <TrendingDownIcon sx={{ fontSize: 14, color: '#d32f2f', mr: 0.5 }} />
            )}
            <Typography
              variant="caption"
              sx={{
                fontWeight: 'bold',
                color: stat.positive ? '#006916' : '#d32f2f'
              }}
            >
              {stat.value}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default DashboardStats;
