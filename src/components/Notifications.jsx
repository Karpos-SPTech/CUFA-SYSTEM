import React, { useState, useEffect } from "react";
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

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchVagas = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/publicacao/all");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Ordena do mais recente para o mais antigo
        const vagasOrdenadas = data.sort(
          (a, b) => new Date(b.dtPublicacao) - new Date(a.dtPublicacao)
        );

        // Mapeia para notificações
        const formattedNotifications = vagasOrdenadas.map((vaga) => ({
          avatar: vaga.logoUrl || null,
          name: vaga.nomeEmpresa || "Empresa Desconhecida",
          message: (
            <>
              Nova vaga disponível para{" "}
              <span style={{ color: "#006916", fontWeight: 600 }}>
                {vaga.titulo}
              </span>
              ! Pode ser a oportunidade que você está esperando.
            </>
          ),
          id: vaga.idPublicacao,
        }));

        setNotifications(formattedNotifications);
        setUnreadCount(formattedNotifications.length);
      } catch (error) {
        console.error("Erro ao buscar vagas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVagas();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }} onClick={toggleNotifications}>
        <Badge
          badgeContent={unreadCount > 99 ? "99+" : unreadCount}
          sx={{ "& .MuiBadge-badge": { backgroundColor: "#006916", color: "white" } }}
        >
          <Box component="img" src={notificationsIcon} alt="Notificações" sx={{ width: 24, height: 24, objectFit: "contain", mt: 0.6 }} />
        </Badge>
        <Typography sx={{ fontSize: { xs: 12, sm: 13, md: 14 }, color: "#006916", mt: 0.27, fontWeight: "bold", fontFamily: "'Paytone One', sans-serif", "&:hover": { textDecoration: "underline" } }}>
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
            <Typography variant="h6" sx={{ fontSize: { xs: 16, sm: 18 }, color: "#006916", display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: "600", fontFamily: "'Paytone One', sans-serif" }}>
              Notificações
              <Box sx={{ backgroundColor: "#e8f5e9", padding: "4px 12px", textAlign: "center", alignItems: "center", display: "flex", borderRadius: "20px", border: "1px solid #c8e6c9" }}>
                <Typography variant="caption" sx={{ color: "#006916", fontSize: "13px", fontWeight: "bold", fontFamily: "'Paytone One', sans-serif" }}>
                  {unreadCount > 99 ? "99+ novas" : unreadCount === 1 ? unreadCount + " nova" : unreadCount + " novas"}
                </Typography>
              </Box>
            </Typography>
          </Box>

          <List sx={{ maxHeight: "253px", overflowY: "auto", width: 350, bgcolor: "#f9f9f9", p: 1.5, "& .MuiListItem-root": { bgcolor: "white", borderRadius: 1, mb: 1, "&:last-child": { mb: 0 } } }}>
            {loading ? (
              <ListItem>
                <ListItemText primary="Carregando notificações..." />
              </ListItem>
            ) : notifications.length > 0 ? (
              notifications.map((notification) => (
                <ListItem key={notification.id} sx={{ p: 2, "&:hover": { bgcolor: "#f5f9f6" } }}>
                  <ListItemAvatar>
                    {notification.avatar ? (
                      <Avatar src={notification.avatar} sx={{ width: 40, height: 40, bgcolor: "#fff" }} />
                    ) : (
                      <Avatar sx={{ width: 40, height: 40, bgcolor: "#006916", color: "white", fontWeight: "bold", fontSize: 18, fontFamily: "Arial, sans-serif" }}>
                        {notification.name?.charAt(0).toUpperCase() || "?"}
                      </Avatar>
                    )}
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography sx={{ fontSize: { xs: 13, sm: 14 }, fontWeight: "bold", color: "#006916", mb: 0.5 }}>{notification.name}</Typography>}
                    secondary={<Typography sx={{ fontSize: { xs: 11, sm: 12 }, color: "#555" }}>{notification.message}</Typography>}
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
