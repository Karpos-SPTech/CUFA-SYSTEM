import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, InputBase, IconButton, Modal, Button } from "@mui/material";
import homeIcon from "../assets/home-icon.png";
import searchIcon from "../assets/search-icon.png";
import profilePic from "../assets/icon.png";
import logo from "../assets/Logo.png";
import Notifications from "./Notifications";

const Header = () => {
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const openSettingsModal = () => {
    setIsSettingsModalOpen(true);
  };

  const closeSettingsModal = () => {
    setIsSettingsModalOpen(false);
  };

  return (
    <>
      <Box
        component="header"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 60px",
          backgroundColor: "#ffffff",
          borderBottom: "2px solid #e0e0e0",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Esquerda */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "50px",
            marginBottom: "-20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => navigate("/cufaSistema")}
          >
            <Box
              component="img"
              src={homeIcon}
              alt="Início"
              sx={{ width: "40px", height: "40px" }}
            />
            <Typography
              sx={{
                fontSize: "19px",
                fontWeight: "bold",
                color: "#006916",
                textDecoration: "none",
              }}
            >
              Início
            </Typography>
          </Box>
          <Notifications />
        </Box>

        {/* Centro */}
        <Box
          sx={{
            flex: 3,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{ width: "187px", marginLeft: "130px" }}
          />
        </Box>

        {/* Direita */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <InputBase
            placeholder="Pesquisar"
            sx={{
              padding: "13px 12px",
              border: "2px solid #006916",
              borderRadius: "20px",
              outline: "none",
              width: "200px",
            }}
          />
          <IconButton>
            <Box
              component="img"
              src={searchIcon}
              alt="Pesquisar"
              sx={{ width: "40px", height: "40px" }}
            />
          </IconButton>
          <Box
            sx={{
              position: "relative",
            }}
          >
            <Box
              component="img"
              src={profilePic}
              alt="Perfil"
              onClick={toggleProfileMenu}
              sx={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                backgroundColor: "#e9f1e7",
                padding: "5px",
                cursor: "pointer",
              }}
            />
            {isProfileMenuOpen && (
              <Box
                sx={{
                  position: "absolute",
                  top: "70px",
                  right: 0,
                  backgroundColor: "white",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  width: "150px",
                  zIndex: 1000,
                  padding: "10px 0",
                  borderTop: "5px solid #006916",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: "-10px",
                    right: "20px",
                    width: "20px",
                    height: "10px",
                    backgroundColor: "#006916",
                    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                    boxShadow: "-1px -1px 2px rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                <Box
                  sx={{
                    padding: "10px 15px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "14px",
                    color: "#006916",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                  onClick={() => navigate("/profile")}
                >
                  <i className="fas fa-user"></i> Perfil
                </Box>
                <Box
                  sx={{
                    padding: "10px 15px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "14px",
                    color: "#006916",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                  onClick={openSettingsModal}
                >
                  <i className="fas fa-cog"></i> Ajustes
                </Box>
                <Box
                  sx={{
                    padding: "10px 15px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "14px",
                    color: "#006916",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                  onClick={() => navigate("/")}
                >
                  <i className="fas fa-sign-out-alt"></i> Sair
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {/* Modal de Ajustes */}
      <Modal open={isSettingsModalOpen} onClose={closeSettingsModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            width: "600px",
            textAlign: "left",
            borderTop: "5px solid #006916",
          }}
        >
          <Button
            onClick={closeSettingsModal}
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "none",
              border: "none",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#006916",
              cursor: "pointer",
              zIndex: 10,
              "&:hover": {
                color: "#004d12",
              },
            }}
          >
            &times;
          </Button>
          <Typography
            sx={{
              fontSize: "24px",
              color: "#006916",
              marginBottom: "10px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Atualize seu Perfil
          </Typography>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <Box sx={{ display: "flex", gap: "20px" }}>
              <InputBase placeholder="Nome" sx={{ flex: 1 }} />
              <InputBase placeholder="Sobrenome" sx={{ flex: 1 }} />
            </Box>
            <Box sx={{ display: "flex", gap: "20px" }}>
              <InputBase placeholder="CPF" sx={{ flex: 1 }} />
              <InputBase placeholder="Telefone" sx={{ flex: 1 }} />
            </Box>
            <Box sx={{ display: "flex", gap: "20px" }}>
              <InputBase placeholder="Data de nascimento" sx={{ flex: 1 }} />
              <InputBase placeholder="CEP" sx={{ flex: 1 }} />
            </Box>
            <Box sx={{ display: "flex", gap: "20px" }}>
              <InputBase placeholder="Bairro" sx={{ flex: 1 }} />
              <InputBase placeholder="Número" sx={{ flex: 1 }} />
            </Box>
            <InputBase
              placeholder="Endereço"
              sx={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: "#f1f8f4",
                color: "#555",
              }}
            />
            <Button
              type="submit"
              sx={{
                backgroundColor: "#006916",
                color: "white",
                padding: "15px",
                borderRadius: "10px",
                fontSize: "18px",
                fontWeight: "bold",
                marginTop: "20px",
                "&:hover": {
                  backgroundColor: "#004d12",
                },
              }}
            >
              Atualizar Perfil
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Header;