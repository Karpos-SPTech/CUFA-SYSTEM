import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const EstatisticasCandidatos = () => {
  const dadosFaixaEtaria = [
    { faixa: 'Abaixo de 18', percentual: 30 },
    { faixa: 'De 18 a 25', percentual: 40 },
    { faixa: 'De 25 a 40', percentual: 15 },
    { faixa: 'Acima de 40', percentual: 5 },
  ];

  const dadosEscolaridade = [
    { nivel: 'Nenhuma', percentual: 20.0 },
    { nivel: 'Fundamental Incompleto', percentual: 20.0 },
    { nivel: 'Fundamental Completo', percentual: 20.0 },
    { nivel: 'Ensimo Médio Incompleto', percentual: 20.0 },
    { nivel: 'Ensimo Médio Completo', percentual: 20.0 }
  ];

  const COLORS = ['#4CAF50', '#81C784'];
  return (
    <Box>
      <Paper sx={{ p: 2, mb: 2, borderRadius: '16px' }}>
        <Typography variant="h6" gutterBottom align="center" sx={{ 
          fontSize: '15px',
          fontWeight: 'bold', 
          color: '#006400',
          fontFamily: "'Paytone One', sans-serif" 
        }}>
          Distribuição de Candidatos por Faixa Etária
        </Typography>
        <ResponsiveContainer width="120%" height={200}>
          <BarChart data={dadosFaixaEtaria} margin={{ top: 15, right: 65, bottom: 5, left: -25 }}>
            <XAxis 
              dataKey="faixa" 
              tick={{ 
                fontSize: 11,
                fontFamily: "'Paytone One', sans-serif"
              }} 
            />
            <YAxis 
              tickFormatter={(value) => `${value}%`} 
              tick={{ 
                fontSize: 12,
                fontFamily: "'Paytone One', sans-serif"
              }} 
            />
            <Tooltip formatter={(value) => [`${value}%`, 'Percentual']} />
            <Bar dataKey="percentual" fill="#4CAF50" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      <Paper sx={{ p: 2, mb: 2, borderRadius: '16px' }}>
        <Typography variant="h6" gutterBottom align="center" sx={{ 
          fontSize: '15px',
          fontWeight: 'bold', 
          color: '#006400',
          fontFamily: "'Paytone One', sans-serif"
        }}>
          Distribuição de Candidatos por Escolaridade
        </Typography>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart 
            layout="vertical" 
            data={dadosEscolaridade} 
            margin={{ top: 2, right: 20, bottom: -10, left: -20 }}
            barSize={25}
          >
            <XAxis 
              type="number" 
              domain={[0, 60]}
              tickFormatter={(value) => `${value}%`} 
              tick={{ 
                fontSize: 12,
                fontFamily: "'Paytone One', sans-serif"
              }}
            />
            <YAxis 
              dataKey="nivel" 
              type="category" 
              width={95}
              tick={{ 
                fontSize: 11,
                fontFamily: "'Paytone One', sans-serif"
              }}
              tickLine={false}
            />
            <Tooltip formatter={(value) => [`${value}%`, 'Percentual']} />
            <Bar 
              dataKey="percentual" 
              fill="#4CAF50" 
              radius={[0, 5, 5, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default EstatisticasCandidatos;
