import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button
} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import logo from "../assets/cufaLogo.png";

const HeaderDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Navegar para a página de login
    navigate("/");
  };

  return (
    <>
      <Box
        component="header"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fff",
          width: "100%",
          boxSizing: "border-box",
          position: "relative",
          height: { xs: "70px", sm: "80px", md: "90px" },
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >        {/* Esquerda - vazio para manter o layout equilibrado */}
        <Box
          sx={{
            flex: 1
          }}
        >
        </Box>

        {/* Centro */}
        <Box
          sx={{
            flex: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              width: { xs: 110, sm: 150, md: 157 },
              height: { xs: 40, sm: 50, md: 60 },
              objectFit: "contain"
            }}
          />
        </Box>        {/* Direita - Apenas botão de sair */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            justifyContent: "flex-end"
          }}
        >
          <Button
            variant="text"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              color: "#006916",
              fontFamily: "'Paytone One', sans-serif",
              fontSize: { xs: 12, sm: 14, md: 16 },
              "&:hover": {
                backgroundColor: "rgba(0, 105, 22, 0.08)",
              }
            }}
          >
            Sair
          </Button>
        </Box>      </Box>
    </>
  );
};

export default HeaderDashboard;