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

  const formatarData = (data) => {
    const dataObj = new Date(data);
    const agora = new Date();
    const diff = agora - dataObj;
    const segundos = Math.floor(diff / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    if (segundos < 60) return "Agora mesmo";
    if (minutos < 60) return `Há ${minutos} ${minutos === 1 ? "minuto" : "minutos"}`;
    if (horas < 24) return `Há ${horas} ${horas === 1 ? "hora" : "horas"}`;
    if (dias < 7) return `Há ${dias} ${dias === 1 ? "dia" : "dias"}`;
    
    return dataObj.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
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
          {formatarData(data)}
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

  useEffect(() => {
    const fetchVagas = async () => {
      try {
        const response = await fetch("http://localhost:8080//publicacoes/empresa", {
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

        // Buscar os candidatos de cada vaga
        const todasNotificacoes = [];
        for (const vaga of data) {
          const candidatosResponse = await fetch(`http://localhost:8080/api/candidaturas/${vaga.idPublicacao}`, {
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
                // Verifica se a data da candidatura existe e é válida
                const dataCandidatura = candidato.dataCandidatura && !isNaN(new Date(candidato.dataCandidatura)) 
                  ? candidato.dataCandidatura 
                  : new Date().toISOString();

                todasNotificacoes.push({
                  id: candidato.id || Math.random(),
                  candidato: candidato,
                  vaga: vaga.titulo,
                  vagaId: vaga.idPublicacao,
                  dataCandidatura: dataCandidatura
                });
              });
            }
          }
        }

        // Ordenar notificações da mais recente para a mais antiga
        todasNotificacoes.sort((a, b) => 
          new Date(b.dataCandidatura).getTime() - new Date(a.dataCandidatura).getTime()
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
      elevation={3}
      sx={{
        width: '100%',
        borderRadius: 2,
        borderTop: '5px solid #006916',
        overflow: 'hidden',
        maxHeight: 'calc(100vh - 100px)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{
        p: 2,
        borderBottom: '1px solid #eee',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
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
        overflow: 'auto',
        flexGrow: 1,
        p: 0,
      }}>
        {loading ? (
          <Box sx={{ 
            p: 4, 
            textAlign: 'center' 
          }}>
            <CircularProgress size={30} sx={{ color: '#006916' }} />
          </Box>
        ) : error ? (
          <Box sx={{ 
            p: 4, 
            textAlign: 'center',
            color: '#d32f2f'
          }}>
            <Typography sx={{ 
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
