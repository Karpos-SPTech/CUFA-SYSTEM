import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, List, ListItem, Avatar, CircularProgress, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const NotificationItem = ({ candidato, vaga, data, vagaId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/telaCandidatos?vagaId=${vagaId}`);
  };

  return (
    <ListItem
      onClick={handleClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        padding: '16px',
        borderBottom: '1px solid #e0e0e0',
        transition: 'all 0.2s ease',
        '&:last-child': {
          borderBottom: 'none'
        },
        '&:hover': {
          backgroundColor: '#f5f9f6',
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0, 105, 22, 0.08)',
          cursor: 'pointer'
        }
      }}
    >
      <Avatar
        sx={{
          width: 45,
          height: 45,
          backgroundColor: '#006916',
          fontFamily: "'Paytone One', sans-serif",
          boxShadow: '0 2px 8px rgba(0, 105, 22, 0.2)',
          border: '2px solid #fff'
        }}
      >
        {candidato.nome ? candidato.nome.charAt(0).toUpperCase() : 'U'}
      </Avatar>
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="body2"
          sx={{
            color: '#2d2d2d',
            fontSize: '14px',
            fontWeight: 500,
            fontFamily: "'Paytone One', sans-serif",
            lineHeight: 1.4,
            mb: 0.5
          }}
        >
          Novo candidato: <span style={{ color: '#006916', fontWeight: 600 }}>{candidato.nome}</span> se candidatou para a vaga de <span style={{ color: '#006916', fontWeight: 600 }}>{vaga}</span>
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: '#666',
            fontSize: '12px',
            fontFamily: "'Paytone One', sans-serif",
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }}
        >
          {new Date(data).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit'
          })}
          <ArrowForwardIcon sx={{ fontSize: 14, color: '#006916', ml: 1 }} />
        </Typography>
      </Box>
    </ListItem>
  );
};

const NotificationsPanel = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vagas, setVagas] = useState([]);

  // Primeiro, buscar todas as vagas da empresa
  useEffect(() => {
    const fetchVagas = async () => {
      try {
        const empresaId = localStorage.getItem("empresaId");
        if (!empresaId) throw new Error("ID da empresa não encontrado");

        const response = await fetch("http://localhost:8080/publicacao", {
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

        const data = await response.json();
        setVagas(data);

        // Depois de buscar as vagas, buscar os candidatos de cada vaga
        const todasNotificacoes = [];
        for (const vaga of data) {
          const candidatosResponse = await fetch(`http://localhost:8080/candidatura/${vaga.idPublicacao}`, {
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
              candidatosData.candidatos.forEach(candidato => {
                todasNotificacoes.push({
                  id: candidato.id || Math.random(),
                  candidato: candidato,
                  vaga: vaga.titulo,
                  vagaId: vaga.idPublicacao,
                  dataCandidatura: candidato.dataCandidatura || new Date().toISOString()
                });
              });
            }
          }
        }

        // Ordenar por data mais recente
        todasNotificacoes.sort((a, b) => 
          new Date(b.dataCandidatura) - new Date(a.dataCandidatura)
        );
        
        setNotifications(todasNotificacoes);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVagas();
    // Atualiza a cada 30 segundos
    const interval = setInterval(fetchVagas, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Paper
      sx={{
        backgroundColor: '#fff',
        borderRadius: '15px',
        p: 0,
        width: '100%',
        border: '1px solid #e0e0e0',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2.5,
          borderBottom: '2px solid #f0f0f0',
          backgroundColor: '#ffffff'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <NotificationsIcon sx={{ color: '#006916', fontSize: 24 }} />
          <Typography
            variant="h6"
            sx={{
              color: '#006916',
              fontSize: '18px',
              fontWeight: 'bold',
              fontFamily: "'Paytone One', sans-serif",
            }}
          >
            Notificações
          </Typography>
        </Box>
        {notifications.length > 0 && (
          <Box
            sx={{
              backgroundColor: '#e8f5e9',
              padding: '4px 12px',
              borderRadius: '20px',
              border: '1px solid #c8e6c9'
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: '#006916',
                fontSize: '13px',
                fontWeight: 'bold',
                fontFamily: "'Paytone One', sans-serif",
              }}
            >
              {notifications.length} {notifications.length === 1 ? 'nova' : 'novas'}
            </Typography>
          </Box>
        )}
      </Box>

      <List sx={{ 
        p: 0, 
        maxHeight: '400px', 
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#c1e3c5',
          borderRadius: '4px',
          '&:hover': {
            background: '#92c49a'
          }
        }
      }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress sx={{ color: '#006916' }} />
          </Box>
        ) : error ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography sx={{ 
              color: '#d32f2f', 
              fontFamily: "'Paytone One', sans-serif",
              fontSize: '14px'
            }}>
              {error}
            </Typography>
          </Box>
        ) : notifications.length > 0 ? (
          notifications.map((notif) => (
            <NotificationItem
              key={notif.id}
              candidato={notif.candidato}
              vaga={notif.vaga}
              data={notif.dataCandidatura}
              vagaId={notif.vagaId}
            />
          ))
        ) : (
          <Box sx={{ 
            p: 4, 
            textAlign: 'center',
            color: '#666',
          }}>
            <NotificationsIcon sx={{ fontSize: 40, color: '#c1e3c5', mb: 2 }} />
            <Typography sx={{ 
              fontFamily: "'Paytone One', sans-serif",
              fontSize: '14px'
            }}>
              Nenhuma candidatura recebida ainda.
            </Typography>
          </Box>
        )}
      </List>
    </Paper>
  );
};

export default NotificationsPanel;
