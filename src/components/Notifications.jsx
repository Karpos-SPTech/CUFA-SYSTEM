import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import notificationsIcon from "../assets/notifications-icon.png";
import avatar1 from "../assets/mcdonalds-logo.png";
import avatar2 from "../assets/assai-logo.jpg";

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Ícone de notificações */}
      <Box
        onClick={toggleNotifications}
        sx={{
          cursor: "pointer",
          textAlign: "center",
        }}
      >
        <Box
          component="img"
          src={notificationsIcon}
          alt="Notificações"
          sx={{
            width: "40px",
            height: "40px",
            objectFit: "contain",
          }}
        />
        <Typography
          sx={{
            fontSize: "19px",
            fontWeight: "bold",
            color: "#006916",
            textDecoration: "none",
            marginTop: "12px",
          }}
        >
          Notificações
        </Typography>
      </Box>

      {/* Menu de notificações */}
      {isOpen && (
        <Box
          sx={{
            position: "absolute",
            top: "100px",
            right: "-138px",
            width: "360px",
            backgroundColor: "white",
            borderRadius: "15px",
            borderTop: "5px solid #006916",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            padding: "15px",
            maxHeight: "400px",
            overflowY: "auto",
            "&::before": {
              content: '""',
              position: "absolute",
              top: "-18px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "20px",
              height: "10px",
              backgroundColor: "#006916",
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              color: "#006916",
              marginBottom: "10px",
              borderBottom: "2px solid #006916",
              paddingBottom: "5px",
            }}
          >
            Notificações
          </Typography>
          <Typography
            sx={{
              fontSize: "18px",
              color: "#006916",
              position: "relative",
              top: "-34px",
              float: "right",
            }}
          >
            99+
          </Typography>
          <Box
            sx={{
              backgroundColor: "#f9f9f9",
              padding: "20px",
              borderRadius: "15px",
              boxShadow: "8px 8px 8px rgba(4, 0, 0, 0.2)",
              overflowY: "auto",
              maxHeight: "250px",
              marginBottom: "20px",
              width: "318px",
            }}
          >
            {/* Lista de notificações */}
            {[{
              avatar: avatar1,
              name: "McDonald's",
              message: "Nova vaga disponível para Chapeiro! Pode ser a oportunidade que você está esperando."
            },{    
                avatar: avatar2,
                name: "RH da Empresa Assaí",
                message: "Seu perfil foi selecionado! Temos uma vaga que pode te interessar. Confira agora!"
            },{
                avatar: avatar1,
                name: "McDonald's",
                message: "Nova vaga disponível para Chapeiro! Pode ser a oportunidade que você está esperando."
            },{    
              avatar: avatar2,
              name: "RH da Empresa Assaí",
              message: "Seu perfil foi selecionado! Temos uma vaga que pode te interessar. Confira agora!"
            }].map((notification, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "24px 0",
                  borderBottom: "1px solid #e9e9e9",
                }}
              >
                <Box
                  sx={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "#e9f1e7",
                    marginRight: "10px",
                  }}
                >
                  <Box
                    component="img"
                    src={notification.avatar}
                    alt="Avatar"
                    sx={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: "#e9f1e7",
                    }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#006916",
                      margin: 0,
                    }}
                  >
                    {notification.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#555",
                      margin: 0,
                    }}
                  >
                    {notification.message}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Notifications;