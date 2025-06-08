import React, { useState, useEffect } from "react"; // Importe useEffect
import {
  Box,
  Typography,
  Badge,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from "@mui/material";
import notificationsIcon from "../assets/notification-icon.png";
import defaultCompanyLogo from "../assets/empresaLogo.png"; // Importe o logo padrão

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]); // Estado para armazenar as notificações da API
  const [unreadCount, setUnreadCount] = useState(0); // Estado para o contador de notificações não lidas
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  // --- useEffect para buscar as publicações/vagas ---
  useEffect(() => {
    const fetchVagas = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/publicacao/all");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Mapear os dados da API para o formato de notificação
        const formattedNotifications = data.map((vaga) => ({
          // Assumindo que 'logoUrl' é o campo da URL do logo na sua PublicacaoEntity/DTO
          avatar: vaga.logoUrl || defaultCompanyLogo,
          name: vaga.nomeEmpresa || "Empresa Desconhecida", // Assumindo 'nomeEmpresa' na PublicacaoEntity/DTO
          message: `Nova vaga disponível para ${vaga.titulo}! Pode ser a oportunidade que você está esperando.`, // Assumindo 'titulo'
          // Você pode adicionar um ID único se quiser, para a key do ListItem
          id: vaga.idPublicacao, // Assumindo 'idPublicacao' como ID único da vaga
        }));

        setNotifications(formattedNotifications);
        setUnreadCount(formattedNotifications.length); // Exemplo: todos são "não lidos" inicialmente
      } catch (error) {
        console.error("Erro ao buscar vagas:", error);
        // Em um ambiente real, você pode querer exibir uma mensagem de erro ao usuário
      } finally {
        setLoading(false);
      }
    };

    fetchVagas();
  }, []); // O array vazio [] significa que este efeito será executado apenas uma vez, no montagem do componente

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={toggleNotifications}
      >
        <Badge
          badgeContent={unreadCount > 99 ? "99+" : unreadCount} // Exibe "99+" se for maior
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "#006916",
              color: "white",
            },
          }}
        >
          <Box
            component="img"
            src={notificationsIcon}
            alt="Notificações"
            sx={{
              width: 24,
              height: 24,
              objectFit: "contain",
              mt: 0.6,
            }}
          />
        </Badge>
        <Typography
          sx={{
            fontSize: { xs: 12, sm: 13, md: 14 },
            color: "#006916",
            mt: 0.27,
            fontWeight: "bold",
            fontFamily: "'Paytone One', sans-serif",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Notificações
        </Typography>
      </Box>

      {isOpen && (
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            top: "calc(100% + 16px)",
            right: "-238px",
            width: "350px",
            borderRadius: 2,
            borderTop: "5px solid #006916",
            zIndex: 1000,
            maxHeight: "350px",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: "-10px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "16px",
              height: "8px",
              backgroundColor: "#006916",
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            },
          }}
        >
          <Box sx={{ p: 1.5, borderBottom: "2px solid #006916" }}>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: 16, sm: 18 },
                color: "#006916",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontWeight: "500",
                fontFamily: "'Paytone One', sans-serif",
              }}
            >
              Notificações
              <Typography
                component="span"
                sx={{
                  fontSize: { xs: 14, sm: 16 },
                  fontFamily: "'Paytone One', sans-serif",
                  fontWeight: "500",
                  color: "#006916",
                }}
              >
                {unreadCount > 99 ? "99+" : unreadCount}
              </Typography>
            </Typography>
          </Box>

          <List
            sx={{
              maxHeight: "253px",
              overflowY: "auto",
              width: 350,
              bgcolor: "#f9f9f9",
              p: 1.5,
              "& .MuiListItem-root": {
                bgcolor: "white",
                borderRadius: 1,
                mb: 1,
                "&:last-child": {
                  mb: 0,
                },
              },
            }}
          >
            {loading ? (
              <ListItem>
                <ListItemText primary="Carregando notificações..." />
              </ListItem>
            ) : notifications.length > 0 ? (
              notifications.map((notification) => (
                <ListItem
                  key={notification.id}
                  sx={{
                    p: 2,
                    "&:hover": {
                      bgcolor: "#f5f5f5",
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={notification.avatar}
                      sx={{
                        bgcolor: "#white",
                        width: 40,
                        height: 40,
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontSize: { xs: 13, sm: 14 },
                          fontWeight: "bold",
                          color: "#006916",
                          mb: 0.5,
                        }}
                      >
                        {notification.name}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        sx={{
                          fontSize: { xs: 11, sm: 12 },
                          color: "#555",
                        }}
                      >
                        {notification.message}
                      </Typography>
                    }
                  />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="Nenhuma notificação encontrada." />
              </ListItem>
            )}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default Notifications;