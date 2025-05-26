import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const EstatisticasCandidatos = () => {
  const dadosFaixaEtaria = [
    { faixa: 'Menor de 18', percentual: 30 },
    { faixa: '18 a 25', percentual: 40 },
    { faixa: '25 a 40', percentual: 15 },
    { faixa: 'Acima de 40', percentual: 5 },
  ];

  const dadosEscolaridade = [
    { nivel: 'Sem instrução', percentual: 6.25 },
    { nivel: 'Nível fundamental', percentual: 43.75 },
    { nivel: 'Nível médio', percentual: 31.25 },
    { nivel: 'Nível superior', percentual: 18.75 },
  ];

  const dadosGenero = [
    { nome: 'Masculino', percentual: 85 },
    { nome: 'Feminino', percentual: 15 },
  ];

  const COLORS = ['#4CAF50', '#81C784'];
  return (
    <Box>
      <Paper sx={{ p: 2, mb: 2, borderRadius: '16px' }}>
        <Typography variant="h6" gutterBottom align="center" sx={{ 
          fontSize: '14px', 
          color: '#006400',
          fontFamily: "'Paytone One', sans-serif" 
        }}>
          Distribuição de Candidatos por Faixa Etária
        </Typography>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={dadosFaixaEtaria} margin={{ top: 5, right: 20, bottom: 20, left: 10 }}>
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
                fontSize: 11,
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
          fontSize: '14px', 
          color: '#006400',
          fontFamily: "'Paytone One', sans-serif"
        }}>
          Distribuição de Candidatos por Escolaridade
        </Typography>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart 
            layout="vertical" 
            data={dadosEscolaridade} 
            margin={{ top: 5, right: 20, bottom: 5, left: 5 }}
            barSize={25}
          >
            <XAxis 
              type="number" 
              domain={[0, 60]}
              tickFormatter={(value) => `${value}%`} 
              tick={{ 
                fontSize: 11,
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

      <Paper sx={{ p: 2, borderRadius: '16px' }}>
        <Typography variant="h6" gutterBottom align="center" sx={{ 
          fontSize: '14px', 
          color: '#006400',
          fontFamily: "'Paytone One', sans-serif"
        }}>
          Distribuição de Candidatos por Gênero
        </Typography>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart margin={{ top: 5, right: 20, bottom: 5, left: 5 }}>
            <Pie
              data={dadosGenero}
              dataKey="percentual"
              nameKey="nome"
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={60}
              label={({ percentual }) => `${percentual}%`}
            >
              {dadosGenero.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}%`, 'Percentual']} />
            <Legend 
              verticalAlign="middle"
              align="right"
              layout="vertical"
              formatter={(value) => (
                <span style={{ 
                  color: '#006400', 
                  fontFamily: "'Paytone One', sans-serif",
                  fontSize: '11px'
                }}>
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default EstatisticasCandidatos;
