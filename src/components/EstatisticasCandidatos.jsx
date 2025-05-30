import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import estatisticasService from '../services/estatisticasService';

const EstatisticasCandidatos = () => {
  const [loading, setLoading] = useState(true);
  const [dadosFaixaEtaria, setDadosFaixaEtaria] = useState([]);
  const [dadosEscolaridade, setDadosEscolaridade] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [faixaEtariaData, escolaridadeData] = await Promise.all([
          estatisticasService.getEstatisticasPorFaixaEtaria(),
          estatisticasService.getEstatisticasPorEscolaridade()
        ]);

        setDadosFaixaEtaria(faixaEtariaData);
        setDadosEscolaridade(escolaridadeData);
      } catch (err) {
        console.error('Erro ao carregar estatísticas:', err);
        setError('Não foi possível carregar as estatísticas');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

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

      <Paper sx={{ p: 2, borderRadius: '16px' }}>
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
    </Box>
  );
};

export default EstatisticasCandidatos;
