import React, { useState } from "react";
import { 
  Box, 
  Typography, 
  Badge, 
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper
} from "@mui/material";
import avatar1 from "../assets/avatar1.png";
import notificationsIcon from "../assets/notification-icon.png";

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  const notifications = [
    {
      avatar: avatar1,
      name: "McDonald's",
      message: "Nova vaga disponível para Chapeiro! Pode ser a oportunidade que você está esperando."
    },
    {
      avatar: avatar1,
      name: "RH da Empresa Assaí",
      message: "Seu perfil foi selecionado! Temos uma vaga que pode te interessar. Confira agora!"
    },
    {
      avatar: avatar1,
      name: "McDonald's",
      message: "Nova vaga disponível para Chapeiro! Pode ser a oportunidade que você está esperando."
    },
    {
      avatar: avatar1,
      name: "RH da Empresa Assaí",
      message: "Seu perfil foi selecionado! Temos uma vaga que pode te interessar. Confira agora!"
    }
  ];

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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={toggleNotifications}
      >
        <Badge 
          badgeContent={99} 
          sx={{ 
            '& .MuiBadge-badge': { 
              backgroundColor: '#006916',
              color: 'white' 
            } 
          }}
        >          <Box
            component="img"
            src={notificationsIcon}
            alt="Notificações"
            sx={{
              width: 24,
              height: 23,
              objectFit: "contain"
            }}
          />
        </Badge>        <Typography
          sx={{
            fontSize: { xs: 12, sm: 13, md: 14 },
            color: "#006916",
            mt: 0.5,
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
            right: "-150px",
            width: "280px",
            borderRadius: 2,
            borderTop: "3px solid #006916",
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
            <Typography              variant="h6"
              sx={{
                fontSize: { xs: 16, sm: 18 },
                color: "#006916",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontFamily: "'Paytone One', sans-serif",
              }}
            >
              Notificações
              <Typography
                component="span"
                sx={{
                  fontSize: { xs: 14, sm: 16 },
                  color: "#006916",
                }}
              >
                99+
              </Typography>
            </Typography>
          </Box>

          <List
            sx={{
              maxHeight: "250px",
              overflowY: "auto",
              bgcolor: "#f9f9f9",
              p: 1.5,
              '& .MuiListItem-root': {
                bgcolor: "white",
                borderRadius: 1,
                mb: 1,
                '&:last-child': {
                  mb: 0
                }
              }
            }}
          >
            {notifications.map((notification, index) => (
              <ListItem 
                key={index}
                sx={{
                  p: 1.5,
                  '&:hover': {
                    bgcolor: "#f5f5f5"
                  }
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    src={notification.avatar}
                    sx={{
                      bgcolor: "#e9f1e7",
                      width: 32,
                      height: 32
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
                        mb: 0.5
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
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default Notifications;