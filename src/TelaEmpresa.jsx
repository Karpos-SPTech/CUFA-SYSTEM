import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import { Box, CircularProgress } from "@mui/material";
import AnunciarVaga from "./components/AnunciarVaga";
import VagaPublicada from "./components/VagaPublicada";
import NotificationsPanel from "./components/NotificationsPanel";
import EstatisticasCandidatos from "./components/EstatisticasCandidatos";
import "../src/telaEmpresa.css";

const TelaEmpresa = () => {
  const navigate = useNavigate();
  const [empresaData, setEmpresaData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/empresas", {
          credentials: "include",
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            navigate("/");
            return;
          }
          throw new Error("Erro ao carregar dados da empresa");
        }

        const data = await response.json();
        setEmpresaData(data);
      } catch (error) {
        console.error("Erro ao carregar dados da empresa:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleProfileUpdate = (updatedData) => {
    setEmpresaData((prev) => ({ ...prev, ...updatedData }));
  };

  return (
    <Box className="tela-empresa-container">
      <Header
        hideNotifications={true}
        empresaData={empresaData}
        onProfileUpdate={handleProfileUpdate}
      />
      <div className="tela-empresa-content">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            p: 2,
            maxWidth: "1400px",
            mx: "auto",
          }}
        >
          <Box sx={{ width: 350 }}>
            <EstatisticasCandidatos />
          </Box>

          <Box
            sx={{
              width: 600,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <AnunciarVaga />
            <VagaPublicada />
          </Box>

          <Box sx={{ width: 300 }}>
            <NotificationsPanel />
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default TelaEmpresa;
