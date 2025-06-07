import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  InputBase,
  IconButton,
  Modal,
  Button,
  Avatar,
  Divider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import homeIcon from "../assets/home-icon.png";
import searchIcon from "../assets/search-icon.png";
import profilePic from "../assets/profile-icon.png";
import logo from "../assets/cufaLogo.png";
import Notifications from "./Notifications";
import { formatCNPJ, removeMascara } from "../utils/formatters";

const Header = ({ hideNotifications }) => {
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [empresaData, setEmpresaData] = useState({
    nome: "",
    email: "",
    cnpj: "",
    cep: "",
    endereco: "",
    numero: "",
  });

  const fetchEmpresaData = async () => {
    try {
      const empresaId = localStorage.getItem("empresaId");
      if (!empresaId) {
        throw new Error("ID da empresa não encontrado");
      }

      const response = await fetch(
        `http://localhost:8080/empresas/${empresaId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar dados da empresa");
      }

      const empresa = await response.json();

      const cnpjFormatado = empresa.cnpj ? formatarCNPJ(empresa.cnpj) : "";
      const cepFormatado =
        empresa.cep && empresa.cep.length === 8
          ? `${empresa.cep.slice(0, 5)}-${empresa.cep.slice(5)}`
          : empresa.cep || "";

      setEmpresaData({
        id: empresa.id,
        nome: empresa.nome || "",
        email: empresa.email || "",
        cnpj: cnpjFormatado,
        cep: cepFormatado,
        endereco: empresa.endereco || "",
        numero: empresa.numero || "",
      });
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const formatarCNPJ = (cnpj) => {
    return cnpj
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "cnpj") {
      let cnpj = value.replace(/\D/g, "");
      if (cnpj.length > 14) cnpj = cnpj.slice(0, 14);
      setEmpresaData((prev) => ({
        ...prev,
        [name]: formatarCNPJ(cnpj),
      }));
    } else if (name === "cep") {
      let cep = value.replace(/\D/g, "");
      if (cep.length > 8) return; // Limita a 8 dígitos
      if (cep.length > 5) {
        setEmpresaData((prev) => ({
          ...prev,
          [name]: `${cep.slice(0, 5)}-${cep.slice(5, 8)}`,
        }));
      } else {
        setEmpresaData((prev) => ({
          ...prev,
          [name]: cep,
        }));
      }
    } else {
      setEmpresaData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Remove máscaras antes de enviar
      const dataToSend = {
        ...empresaData,
        cnpj: empresaData.cnpj ? removeMascara(empresaData.cnpj) : undefined,
        cep: empresaData.cep ? removeMascara(empresaData.cep) : undefined,
      };

      const response = await fetch(
        `http://localhost:8080/empresas/${empresaData.id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar dados");
      }

      closeSettingsModal();
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    }
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen((prev) => !prev);
  };

  const openSettingsModal = () => {
    fetchEmpresaData();
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
          backgroundColor: "#fff",
          width: "100%",
          boxSizing: "border-box",
          position: "relative",
          height: { xs: "70px", sm: "80px", md: "90px" },
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {/* Esquerda */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 2, sm: 4 },
            flex: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              height: "100%",
              justifyContent: "center",
              gap: 0.5,
            }}
            onClick={() => navigate("/telaEmpresa")}
          >
            {" "}
            <Box
              component="img"
              src={homeIcon}
              alt="Início"
              sx={{
                width: { xs: 22, sm: 28, md: 24 },
                height: { xs: 22, sm: 28, md: 24 },
              }}
            />
            <Typography
              sx={{
                fontSize: { xs: 10, sm: 12, md: 15 },
                fontFamily: "'Paytone One', sans-serif",
                fontWeight: "bold",
                color: "#006916",
                textDecoration: "none",
                transition: "text-decoration 0.2s",
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Início
            </Typography>
          </Box>
          {!hideNotifications && <Notifications />}
        </Box>

        {/* Centro */}
        <Box
          sx={{
            flex: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              width: { xs: 110, sm: 150, md: 157 },
              height: { xs: 40, sm: 50, md: 60 },
              objectFit: "contain",
            }}
          />
        </Box>

        {/* Direita */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, sm: 2 },
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "2px solid #006916",
              fontWeight: "bold",
              borderRadius: "20px",
              px: 1,
              py: 0.5,
              width: { xs: 120, sm: 160, md: 200 },
              background: "#fff",
              height: { xs: 32, sm: 36, md: 40 },
            }}
          >
            <InputBase
              placeholder="Pesquisar"
              sx={{
                flex: 1,
                fontSize: { xs: 12, sm: 14 },
                ml: 1,
                fontFamily: "'Paytone One', sans-serif",
              }}
            />
            <IconButton size="small">
              <Box
                component="img"
                src={searchIcon}
                alt="Pesquisar"
                sx={{
                  width: { xs: 22, sm: 28, md: 32 },
                  height: { xs: 22, sm: 28, md: 32 },
                }}
              />
            </IconButton>
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ height: { xs: 60, sm: 60 }, borderColor: "#006916" }}
          />
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar
              src={profilePic}
              alt="Perfil"
              onClick={toggleProfileMenu}
              sx={{
                width: { xs: 32, sm: 40, md: 35 },
                height: { xs: 32, sm: 40, md: 35 },
                bgcolor: isProfileMenuOpen ? "#e9f1e7" : "transparent",
                p: 0.5,
                cursor: "pointer",
                transition: "background-color 0.2s",
                "&:hover": {
                  bgcolor: isProfileMenuOpen ? "#e9f1e7" : "#f0f0f0",
                },
              }}
            />
            <Typography
              onClick={toggleProfileMenu}
              sx={{
                fontSize: { xs: 10, sm: 12, md: 15 },
                fontFamily: "'Paytone One', sans-serif",
                color: "#006916",
                fontWeight: "bold",
                textDecoration: "none",
                transition: "text-decoration 0.2s",
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Perfil
            </Typography>
            {isProfileMenuOpen && (
              <Box
                sx={{
                  position: "absolute",
                  top: { xs: 40, sm: 50, md: 55 },
                  right: 0,
                  backgroundColor: "white",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  width: "150px",
                  zIndex: 1000,
                  padding: "10px 0",
                  borderTop: "5px solid #006916",
                  mt: 1,
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
                    fontWeight: "bold",
                    fontFamily: "'Paytone One', sans-serif",
                    transition: "background-color 0.2s",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    navigate("/perfilEmpresa");
                  }}
                >
                  <PersonIcon fontSize="small" /> Perfil
                </Box>
                <Box
                  sx={{
                    padding: "10px 15px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "14px",
                    color: "#006916",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontFamily: "'Paytone One', sans-serif",
                    transition: "background-color 0.2s",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    openSettingsModal();
                  }}
                >
                  <SettingsIcon fontSize="small" /> Ajustes
                </Box>
                <Box
                  sx={{
                    padding: "10px 15px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontWeight: "bold",
                    fontSize: "14px",
                    color: "#006916",
                    cursor: "pointer",
                    fontFamily: "'Paytone One', sans-serif",
                    transition: "background-color 0.2s",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    navigate("/");
                  }}
                >
                  <LogoutIcon fontSize="small" /> Sair
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
            padding: { xs: 2, sm: 4 },
            borderRadius: "15px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            width: { xs: "90vw", sm: 400, md: 600 },
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
              fontSize: { xs: 18, sm: 22, md: 24 },
              color: "#006916",
              marginBottom: "10px",
              fontWeight: "bold",
              textAlign: "center",
              fontFamily: "'Paytone One', sans-serif",
            }}
          >
            Atualize seu Perfil
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <Box sx={{ display: "flex", gap: "20px" }}>
              <InputBase
                name="nome"
                value={empresaData.nome}
                onChange={handleInputChange}
                placeholder="Nome"
                sx={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  backgroundColor: "#f1f8f4",
                  color: "#555",
                  fontFamily: "'Paytone One', sans-serif",
                }}
              />
            </Box>
            <Box sx={{ display: "flex", gap: "20px" }}>
              <InputBase
                name="email"
                value={empresaData.email}
                onChange={handleInputChange}
                placeholder="Email"
                sx={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  backgroundColor: "#f1f8f4",
                  color: "#555",
                  fontFamily: "'Paytone One', sans-serif",
                }}
              />
            </Box>
            <Box sx={{ display: "flex", gap: "20px" }}>
              <InputBase
                name="cnpj"
                value={empresaData.cnpj}
                onChange={handleInputChange}
                placeholder="CNPJ"
                sx={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  backgroundColor: "#f1f8f4",
                  color: "#555",
                  fontFamily: "'Paytone One', sans-serif",
                }}
              />
              <InputBase
                name="cep"
                value={empresaData.cep}
                onChange={handleInputChange}
                placeholder="CEP"
                sx={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  backgroundColor: "#f1f8f4",
                  color: "#555",
                  fontFamily: "'Paytone One', sans-serif",
                }}
              />
            </Box>
            <Box sx={{ display: "flex", gap: "20px" }}>
              <InputBase
                name="endereco"
                value={empresaData.endereco}
                onChange={handleInputChange}
                placeholder="Endereço"
                sx={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  backgroundColor: "#f1f8f4",
                  color: "#555",
                  fontFamily: "'Paytone One', sans-serif",
                }}
              />
              <InputBase
                name="numero"
                value={empresaData.numero}
                onChange={handleInputChange}
                placeholder="Número"
                sx={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  backgroundColor: "#f1f8f4",
                  color: "#555",
                  fontFamily: "'Paytone One', sans-serif",
                }}
              />
            </Box>
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
                fontFamily: "'Paytone One', sans-serif",
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
