import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const EstatisticasCandidatos = () => {
  const [dadosFaixaEtaria, setDadosFaixaEtaria] = useState([]);
  const [dadosEscolaridade, setDadosEscolaridade] = useState([
    { nivel: 'Ensino Fundamental', percentual: 0 },
    { nivel: 'Ensino Médio', percentual: 0 },
    { nivel: 'Ensino fundamental', percentual: 0 },
    { nivel: 'Nenhuma', percentual: 0 }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidatos = async () => {
      try {
        const empresaId = localStorage.getItem("empresaId");
        if (!empresaId) throw new Error("ID da empresa não encontrado");

        // Primeiro, buscar todas as vagas da empresa
        const response = await fetch("http://3.84.239.87/publicacoes", {
          method: "GET",
          credentials: "include",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Erro ao buscar publicações: ${response.status}`);
        }

        const vagas = await response.json();
        if (!Array.isArray(vagas)) {
          throw new Error("Formato de dados inválido para publicações");
        }
        
        let todosCandidatos = [];
        for (const vaga of vagas) {
          const candidatosResponse = await fetch(`http://3.84.239.87/candidaturas/${vaga.idPublicacao}`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
          });

          if (candidatosResponse.ok) {
            const candidatosData = await candidatosResponse.json();
            if (candidatosData.candidatos && Array.isArray(candidatosData.candidatos)) {
              const validCandidatos = candidatosData.candidatos.filter(c => 
                typeof c.idade === 'number' && c.idade > 0 && c.idade < 100
              );
              todosCandidatos = [...todosCandidatos, ...validCandidatos];
            }
          }
        }
        

        if (todosCandidatos.length === 0) {
          setDadosFaixaEtaria([
            { faixa: 'Abaixo de 18', percentual: 0 },
            { faixa: 'De 18 a 25', percentual: 0 },
            { faixa: 'De 25 a 40', percentual: 0 },
            { faixa: 'Acima de 40', percentual: 0 }
          ]);
          setDadosEscolaridade([
            { nivel: 'Nenhuma', percentual: 0 },
            { nivel: 'Ensino Fundamental', percentual: 0 },
            { nivel: 'Ensino Médio', percentual: 0 },
          ]);
          return;
        }

        const estatisticas = {
          'Abaixo de 18': 0,
          'De 18 a 25': 0,
          'De 25 a 40': 0,
          'Acima de 40': 0
        };

        todosCandidatos.forEach(candidato => {
          const idade = candidato.idade;
          if (idade < 18) estatisticas['Abaixo de 18']++;
          else if (idade >= 18 && idade <= 25) estatisticas['De 18 a 25']++;
          else if (idade > 25 && idade <= 40) estatisticas['De 25 a 40']++;
          else estatisticas['Acima de 40']++;
        });

        const estatisticasEscolaridade = {
          'Nenhuma': 0,
          'Ensino Fundamental': 0,
          'Ensino Médio': 0,
        };

        todosCandidatos.forEach(candidato => {
          const escolaridade = candidato.escolaridade;
          if (escolaridade) {
            if (escolaridade.includes('Nenhuma') || escolaridade.includes('Ensino Fundamental Incompleto')) {
              estatisticasEscolaridade['Nenhuma']++;
            } else if (escolaridade.includes('Ensino Fundamental Completo') || escolaridade.includes('Ensino Médio Incompleto')) {
              estatisticasEscolaridade['Ensino Fundamental']++;
            } else if (escolaridade.includes('Ensino Médio Completo')){
              estatisticasEscolaridade['Ensino Médio']++;
            }
          }
        });

        // Converter para percentuais (escolaridade)
        const total = todosCandidatos.length;
        const dadosEscolaridadeFormatados = Object.entries(estatisticasEscolaridade)
          .map(([nivel, quantidade]) => ({
            nivel,
            percentual: total > 0 ? Math.round((quantidade / total) * 100) : 0
          }));

        setDadosEscolaridade(dadosEscolaridadeFormatados);

        // Converter para percentuais (faixa etária)
        const dadosFormatados = Object.entries(estatisticas).map(([faixa, quantidade]) => ({
          faixa,
          percentual: total > 0 ? Math.round((quantidade / total) * 100) : 0
        }));

        setDadosFaixaEtaria(dadosFormatados);
      } catch (err) {
        console.error("Erro ao buscar candidatos:", err);
        setError(err.message || "Erro ao buscar dados dos candidatos");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidatos();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={200}>
        <CircularProgress sx={{ color: '#006916' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={200}>
        <Typography color="error" sx={{ fontFamily: "'Paytone One', sans-serif" }}>
          {error}
        </Typography>
      </Box>
    );
  }

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
